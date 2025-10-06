import type { ContactFormInput } from "@/lib/schemas/contact";
/**
 * Contact Form Types
 * TypeScript interfaces for contact form data and API responses
 */

// Re-export ContactFormInput from schema as ContactFormInput for consistency
export type { ContactFormInput } from "@/lib/schemas/contact";

// API response for successful form submission
export interface ContactFormSuccessResponse {
  success: true;
  message: string;
  timestamp: string;
}

// API response for form submission errors
export interface ContactFormErrorResponse {
  success: false;
  error: string;
  field?: string;
  timestamp: string;
}

// Union type for all possible API responses
export type ContactFormResponse = ContactFormSuccessResponse | ContactFormErrorResponse;

// Enhanced contact form data with metadata for webhook
export interface ContactFormSubmission extends ContactFormInput {
  timestamp: string;
  source: string;
  metadata: {
    userAgent?: string;
    ipAddress?: string;
  };
}

// Webhook payload structure sent to external endpoint
export interface WebhookPayload {
  type: "contact_form_submission";
  formName?: string;
  formType?: string;
  data: ContactFormSubmission;
}

// Form validation state for UI components
export interface FormFieldError {
  field: keyof ContactFormInput;
  message: string;
}

// Form submission state for UI management
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  fieldErrors: FormFieldError[];
}