import "@testing-library/jest-dom";

// Mock environment variables for tests
process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
process.env.NEXT_PUBLIC_SITE_NAME = "SetterFlo Landing Page";
process.env.WEBHOOK_URL = "https://test-webhook.example.com/webhook";

// Mock fetch for API tests
global.fetch = jest.fn();

// Mock Next.js Request and Response for API route testing
if (typeof globalThis.Request === 'undefined') {
  // Simple Request mock for testing
  globalThis.Request = class MockRequest {
    constructor(url, init = {}) {
      this.url = url;
      this.method = init.method || 'GET';
      this.headers = new Map(Object.entries(init.headers || {}));
      this._body = init.body;
    }
    
    async json() {
      return JSON.parse(this._body || '{}');
    }
    
    headers = {
      get: (name) => this.headers.get(name) || null,
    };
  };
}
