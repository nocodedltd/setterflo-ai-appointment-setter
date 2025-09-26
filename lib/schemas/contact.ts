import { z } from "zod";

/**
 * Contact Form Validation Schemas
 * Zod schemas for runtime validation of contact form data
 */

// Contact form input validation schema
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .transform((name) => name.trim()),
    
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email address is too long")
    .transform((email) => email.toLowerCase().trim()),

  instagramUsername: z
    .string()
    .min(1, "Instagram username is required")
    .max(30, "Instagram username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9._]+$/, "Invalid Instagram username format")
    .transform((username) => username.replace(/^@/, "").toLowerCase().trim()),

  companyName: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .transform((name) => name?.trim())
    .optional(),

  monthlyRevenue: z
    .enum(["under-5k", "5k-15k", "15k-30k", "30k-50k", "50k-plus"])
    .refine((val) => val !== undefined, {
      message: "Please select your monthly revenue range",
    }),

  currentSetters: z
    .enum(["0", "1", "2-3", "4-plus", "freelancers"])
    .refine((val) => val !== undefined, {
      message: "Please select your current setter situation",
    }),

  biggestChallenge: z
    .enum(["inconsistent-leads", "low-dm-response", "unreliable-setters", "too-much-time-on-dms", "cant-scale-capacity", "other"])
    .refine((val) => val !== undefined, {
      message: "Please select your biggest challenge",
    }),

  timeline: z
    .enum(["immediately", "within-month", "2-3-months", "just-exploring"])
    .refine((val) => val !== undefined, {
      message: "Please select your timeline",
    }),

  phoneNumber: z
    .string()
    .regex(/^[\+]?[\d\s\-\(\)]{10,20}$/, "Please enter a valid phone number")
    .transform((phone) => phone?.trim())
    .optional(),
});

// Type inference from schema
export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// Enhanced validation schema for internal processing
export const ContactFormSubmissionSchema = ContactFormSchema.extend({
  timestamp: z.string().datetime(),
  source: z.string().default("landing-page"),
  metadata: z.object({
    userAgent: z.string().optional(),
    ipAddress: z.string().optional(),
  }).default({}),
});

// Webhook payload validation schema
export const WebhookPayloadSchema = z.object({
  type: z.literal("contact_form_submission"),
  data: ContactFormSubmissionSchema,
});

// API response schemas
export const ContactFormSuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  timestamp: z.string().datetime(),
});

export const ContactFormErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  field: z.enum([
    "name", 
    "email", 
    "instagramUsername", 
    "companyName", 
    "monthlyRevenue", 
    "currentSetters", 
    "biggestChallenge", 
    "timeline", 
    "phoneNumber"
  ]).optional(),
  timestamp: z.string().datetime(),
});

// Environment variables validation
export const EnvSchema = z.object({
  WEBHOOK_URL: z.string().url("WEBHOOK_URL must be a valid URL"),
  WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("SetterFlo Landing Page"),
  CONTACT_RATE_LIMIT_REQUESTS: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default(5),
  CONTACT_RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default(900000), // 15 minutes
});

// Validation helper functions
export const validateContactForm = (data: unknown) => {
  return ContactFormSchema.safeParse(data);
};

export const validateEnvironment = () => {
  return EnvSchema.safeParse(process.env);
};

// Error message formatting helpers
export const formatZodError = (error: z.ZodError): { field?: string; message: string } => {
  if (!error.issues || error.issues.length === 0) {
    return { message: "Validation failed" };
  }
  
  const firstError = error.issues[0];
  if (!firstError) {
    return { message: "Validation failed" };
  }

  const field = firstError.path?.[0] as string | undefined;
  const message = firstError.message || "Validation failed";

  const validFields = [
    "name", 
    "email", 
    "instagramUsername", 
    "companyName", 
    "monthlyRevenue", 
    "currentSetters", 
    "biggestChallenge", 
    "timeline", 
    "phoneNumber"
  ];

  return {
    field: field && validFields.includes(field) ? field : undefined,
    message,
  };
};