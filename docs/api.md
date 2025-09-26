# SetterFlo Contact API

## POST /api/contact

Submit a contact message that is validated and forwarded to the configured webhook endpoint.

### Request

- **Content-Type**: `application/json`
- **Body**:

```json
{
  "name": "string (2-50 characters, letters and spaces only)",
  "email": "string (valid email, ≤254 characters)",
  "message": "string (10-1000 characters)"
}
```

### Response

#### Success — `200 OK`

```json
{
  "success": true,
  "message": "Message sent successfully",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

#### Validation Error — `400 Bad Request`

```json
{
  "success": false,
  "error": "Name must be at least 2 characters",
  "field": "name",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

#### Rate Limited — `429 Too Many Requests`

```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

#### Server Error — `500 Internal Server Error`

```json
{
  "success": false,
  "error": "Internal server error",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

### Headers

- `X-Webhook-Secret` — optional; forwarded when `WEBHOOK_SECRET` is defined.
- `Rate-Limit` is enforced per IP using `CONTACT_RATE_LIMIT_*` environment variables.

### Webhook Payload

The webhook receives:

```json
{
  "type": "contact_form_submission",
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Tell me more about SetterFlo",
    "timestamp": "2025-01-01T12:00:00.000Z",
    "source": "landing-page",
    "metadata": {
      "userAgent": "Mozilla/5.0 ...",
      "ipAddress": "203.0.113.5"
    }
  }
}
```

## Testing

- `npm test` executes Jest contract tests under `__tests__/api`.
- `npx playwright test` covers form submission and validation flows end-to-end.

