import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema, formatZodError } from "@/lib/schemas/contact";
import { ensureEnvironment, enforceRateLimit } from "@/lib/middleware/security";
import { sendWebhook, WebhookError } from "@/lib/services/webhook";
import {
  ContactFormSuccessResponse,
  ContactFormErrorResponse,
  WebhookPayload,
} from "@/lib/types/contact";

/**
 * POST /api/contact
 * Handle contact form submissions and trigger webhook
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const timestamp = new Date().toISOString();

  try {
    const env = ensureEnvironment();

    // Validate Content-Type header
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json<ContactFormErrorResponse>(
        {
          success: false,
          error: "Content-Type must be application/json",
          timestamp,
        },
        { status: 400 }
      );
    }

    // Parse request body
    let requestData: unknown;
    try {
      requestData = await request.json();
    } catch {
      return NextResponse.json<ContactFormErrorResponse>(
        {
          success: false,
          error: "Invalid JSON in request body",
          timestamp,
        },
        { status: 400 }
      );
    }

    const rateLimitResponse = enforceRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate form data
    const validationResult = ContactFormSchema.safeParse(requestData);
    if (!validationResult.success) {
      const { field, message } = formatZodError(validationResult.error);
      return NextResponse.json<ContactFormErrorResponse>(
        {
          success: false,
          error: message,
          field: field as "name" | "email" | "message" | undefined,
          timestamp,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Extract metadata from request
    const userAgent = request.headers.get("User-Agent") || undefined;
    const forwardedFor = request.headers.get("X-Forwarded-For");
    const remoteAddress = request.headers.get("X-Real-IP");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || remoteAddress || undefined;

    // Prepare webhook payload
    const webhookPayload: WebhookPayload = {
      type: "contact_form_submission",
      data: {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp,
        source: "landing-page",
        metadata: {
          userAgent,
          ipAddress,
        },
      },
    };

    try {
      await sendWebhook(webhookPayload, {
        url: env.WEBHOOK_URL,
        secret: env.WEBHOOK_SECRET,
      });
    } catch (error) {
      const message = error instanceof WebhookError ? error.message : "Internal server error";
      console.error("Webhook request failed:", error);
      return NextResponse.json<ContactFormErrorResponse>(
        {
          success: false,
          error: message,
          timestamp,
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json<ContactFormSuccessResponse>(
      {
        success: true,
        message: "Message sent successfully",
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in contact API:", error);
    return NextResponse.json<ContactFormErrorResponse>(
      {
        success: false,
        error: "Internal server error",
        timestamp,
      },
      { status: 500 }
    );
  }
}

// Only allow POST method
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
