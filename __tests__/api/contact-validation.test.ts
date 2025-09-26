import { describe, it, expect, beforeEach } from "@jest/globals";
import { POST } from "@/app/api/contact/route";
import { resetRateLimits } from "@/lib/middleware/security";

// Mock fetch for webhook calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("/api/contact - Validation Errors", () => {
  beforeEach(() => {
    resetRateLimits();
    mockFetch.mockClear();
  });

  it("should return 400 for missing name field", async () => {
    const invalidFormData = {
      email: "john@example.com",
      message: "This submission is missing the name field.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      field: "name",
      timestamp: expect.any(String),
    });
    expect(typeof data.error).toBe("string");

    // Should NOT call webhook for invalid data
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should return 400 for invalid email format", async () => {
    const invalidFormData = {
      name: "John Doe",
      email: "invalid-email-format",
      message: "This submission has an invalid email format.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      field: "email",
      timestamp: expect.any(String),
    });
    expect(typeof data.error).toBe("string");

    // Should NOT call webhook for invalid data
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should return 400 for message too short", async () => {
    const invalidFormData = {
      name: "John Doe",
      email: "john@example.com",
      message: "Hi", // Too short (less than 10 characters)
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      field: "message",
      timestamp: expect.any(String),
    });
    expect(typeof data.error).toBe("string");

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should return 400 for message too long", async () => {
    const longMessage = "A".repeat(1001); // Exceeds 1000 character limit
    const invalidFormData = {
      name: "John Doe",
      email: "john@example.com", 
      message: longMessage,
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      field: "message",
      timestamp: expect.any(String),
    });
    expect(typeof data.error).toBe("string");

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should return 400 for name with invalid characters", async () => {
    const invalidFormData = {
      name: "John123 Doe!@#", // Contains numbers and special characters
      email: "john@example.com",
      message: "This name contains invalid characters.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      field: "name",
      timestamp: expect.any(String),
    });
    expect(typeof data.error).toBe("string");

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should return 400 for name too short", async () => {
    const invalidFormData = {
      name: "A", // Only 1 character (minimum is 2)
      email: "john@example.com",
      message: "This name is too short.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      field: "name",
      timestamp: expect.any(String),
    });
    expect(typeof data.error).toBe("string");

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should return 400 for malformed JSON", async () => {
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "invalid json {",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      error: expect.any(String),
      timestamp: expect.any(String),
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should return 400 for missing Content-Type header", async () => {
    const validFormData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This request is missing Content-Type header.",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      // Missing Content-Type header
      body: JSON.stringify(validFormData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({
      success: false,
      error: expect.any(String),
      timestamp: expect.any(String),
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should enforce rate limiting for repeated submissions", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: "ok" }),
    });

    const validFormData = {
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Looking forward to trying the product.",
    };

    const makeRequest = () =>
      POST(
        new Request("http://localhost:3000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": "203.0.113.5",
          },
          body: JSON.stringify(validFormData),
        })
      );

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await makeRequest();
      expect(response.status).toBe(200);
    }

    const limitedResponse = await makeRequest();
    const limitedData = await limitedResponse.json();

    expect(limitedResponse.status).toBe(429);
    expect(limitedData).toMatchObject({
      success: false,
      error: "Too many requests. Please try again later.",
      timestamp: expect.any(String),
    });
  });
});
/**
 * @jest-environment node
 */
