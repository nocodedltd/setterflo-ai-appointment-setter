import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const SimpleContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  username: z.string().optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const timestamp = new Date().toISOString();

  try {
    let requestData: unknown;
    try {
      requestData = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
          timestamp,
        },
        { status: 400 }
      );
    }

    const validationResult = SimpleContactSchema.safeParse(requestData);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError?.message || 'Validation failed',
          timestamp,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;
    const webhookUrl = 'https://nocoded-n8n-u41031.vm.elestio.app/webhook/fbf64cb4-aa0b-4830-b5d8-c113ed92f1d0';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formName: 'contact_sales',
          formType: 'contact',
          ...formData,
          timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }
    } catch (error) {
      console.error('Webhook request failed:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send message. Please try again.',
          timestamp,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in contact API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        timestamp,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
