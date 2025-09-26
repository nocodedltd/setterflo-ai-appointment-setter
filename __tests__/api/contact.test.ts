import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { POST } from "@/app/api/contact/route";
import { resetRateLimits } from "@/lib/middleware/security";

// Mock fetch for webhook calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("/api/contact - Success Cases", () => {
  beforeEach(() => {
    resetRateLimits();
    mockFetch.mockClear();
    // Mock successful webhook response
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully process valid contact form submission", async () => {
    const validFormData = {
      name: "John Doe",
      email: "john@example.com", 
      message: "I'm interested in learning more about your product and would like to schedule a demo.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    // Should return success response
    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      success: true,
      message: "Message sent successfully",
      timestamp: expect.any(String),
    });

    // Should call webhook with correct payload
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      process.env.WEBHOOK_URL,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining("contact_form_submission"),
      })
    );

    // Verify webhook payload structure
    const webhookCall = mockFetch.mock.calls[0];
    const webhookPayload = JSON.parse(webhookCall[1].body);
    
    expect(webhookPayload).toMatchObject({
      type: "contact_form_submission",
      data: {
        name: "John Doe",
        email: "john@example.com",
        message: expect.stringContaining("interested in learning more"),
        timestamp: expect.any(String),
        source: "landing-page",
        metadata: expect.any(Object),
      },
    });
  });

  it("should include proper metadata in webhook payload", async () => {
    const validFormData = {
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Please send me more information about pricing and features.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "X-Forwarded-For": "192.168.1.100",
      },
      body: JSON.stringify(validFormData),
    });

    const response = await POST(request);
    
    expect(response.status).toBe(200);
    
    const webhookCall = mockFetch.mock.calls[0];
    const webhookPayload = JSON.parse(webhookCall[1].body);
    
    expect(webhookPayload.data.metadata).toMatchObject({
      userAgent: expect.stringContaining("Mozilla"),
      ipAddress: expect.any(String),
    });
  });

  it("should return valid timestamp in ISO 8601 format", async () => {
    const validFormData = {
      name: "Test User", 
      email: "test@example.com",
      message: "This is a test message for timestamp validation.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    // Validate ISO 8601 timestamp format
    const timestamp = data.timestamp;
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    
    // Ensure timestamp is recent (within last 5 seconds)
    const timestampDate = new Date(timestamp);
    const now = new Date();
    const diffMs = Math.abs(now.getTime() - timestampDate.getTime());
    expect(diffMs).toBeLessThan(5000);
  });
});
/**
 * @jest-environment node
 */
