import type { WebhookPayload } from "@/lib/types/contact";

interface SendWebhookOptions {
  url: string;
  secret?: string;
  timeoutMs?: number;
}

export class WebhookError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "WebhookError";
  }
}

/**
 * Dispatches a webhook payload to the configured endpoint. Wraps fetch so the
 * API route can keep concerns isolated and remain easy to test.
 */
export async function sendWebhook(
  payload: WebhookPayload,
  { url, secret, timeoutMs = 10_000 }: SendWebhookOptions
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "X-Webhook-Secret": secret } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new WebhookError(`Webhook responded with ${response.status}`, response.status);
    }
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new WebhookError("Webhook request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
