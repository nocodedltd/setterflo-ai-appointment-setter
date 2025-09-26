import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateEnvironment } from "@/lib/schemas/contact";

interface RateLimitState {
  timestamp: number;
  count: number;
}

const rateLimitStore = new Map<string, RateLimitState>();
let cachedEnv: ReturnType<typeof validateEnvironment>["data"] | null = null;

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "forwarded";
  }
  return request.headers.get("x-real-ip") || request.ip || "anonymous";
}

export function ensureEnvironment() {
  if (cachedEnv) {
    return cachedEnv;
  }

  const env = validateEnvironment();
  if (!env.success) {
    console.error("Environment validation failed", env.error);
    throw new Error("Environment configuration invalid");
  }

  cachedEnv = env.data;
  return cachedEnv;
}

export function enforceRateLimit(request: NextRequest) {
  const env = ensureEnvironment();
  const identifier = getClientIdentifier(request);
  const now = Date.now();
  const windowMs = env.CONTACT_RATE_LIMIT_WINDOW_MS;
  const maxRequests = env.CONTACT_RATE_LIMIT_REQUESTS;

  const state = rateLimitStore.get(identifier);

  if (!state || now - state.timestamp > windowMs) {
    rateLimitStore.set(identifier, { timestamp: now, count: 1 });
    return null;
  }

  if (state.count >= maxRequests) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please try again later.",
        timestamp: new Date().toISOString(),
      },
      { status: 429 }
    );
  }

  state.count += 1;
  return null;
}

export function resetRateLimits() {
  rateLimitStore.clear();
}
