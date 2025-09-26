import { describe, it, expect, beforeEach } from "@jest/globals";
import { POST } from "@/app/api/contact/route";
import { resetRateLimits } from "@/lib/middleware/security";

// Mock fetch for webhook calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("/api/contact - Webhook Failure Scenarios", () => {
  beforeEach(() => {
    resetRateLimits();
    mockFetch.mockClear();
  });

  it("should return 500 when webhook endpoint is unreachable", async () => {
    // Mock webhook failure
    mockFetch.mockRejectedValue(new Error("Network error"));

    const validFormData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This should fail due to webhook network error.",
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

    expect(response.status).toBe(500);
    expect(data).toMatchObject({
      success: false,
      error: "Internal server error",
      timestamp: expect.any(String),
    });

    // Should still attempt webhook call
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when webhook returns 500 error", async () => {
    // Mock webhook server error
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const validFormData = {
      name: "Jane Smith",
      email: "jane@example.com", 
      message: "This should fail due to webhook server error.",
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

    expect(response.status).toBe(500);
    expect(data).toMatchObject({
      success: false,
      error: "Webhook responded with 500",
      timestamp: expect.any(String),
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when webhook times out", async () => {
    // Mock webhook timeout
    mockFetch.mockImplementation(() => {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 100);
      });
    });

    const validFormData = {
      name: "Timeout Test",
      email: "timeout@example.com",
      message: "This should fail due to webhook timeout.",
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

    expect(response.status).toBe(500);
    expect(data).toMatchObject({
      success: false,
      error: "Internal server error",
      timestamp: expect.any(String),
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should handle webhook returning 404 Not Found", async () => {
    // Mock webhook not found
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const validFormData = {
      name: "Not Found Test",
      email: "notfound@example.com",
      message: "This should fail due to webhook endpoint not found.",
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

    expect(response.status).toBe(500);
    expect(data).toMatchObject({
      success: false,
      error: "Webhook responded with 404",
      timestamp: expect.any(String),
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should not expose webhook details in error response", async () => {
    // Mock webhook failure with detailed error
    mockFetch.mockRejectedValue(new Error("Webhook endpoint https://secret.example.com/webhook failed with authentication error"));

    const validFormData = {
      name: "Security Test",
      email: "security@example.com",
      message: "This should not expose webhook details.",
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

    // Should return generic error message
    expect(data.error).toBe("Internal server error");
    expect(data.error).not.toContain("webhook");
    expect(data.error).not.toContain("secret");
    expect(data.error).not.toContain("authentication");
  });
});
/**
 * @jest-environment node
 */
