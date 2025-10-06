import { LandingPageContent } from "@/lib/types/content";

/**
 * Landing Page Content Configuration
 * Static content for the SetterFlo landing page
 */

export const landingPageContent: LandingPageContent = {
  hero: {
    headline: "Build Modern Landing Pages with Confidence",
    subheadline: "SetterFlo combines beautiful design with powerful webhook integration to turn visitors into leads. No coding required, just results.",
    ctaText: "Get Started Free",
    ctaTarget: "#contact",
  },
  
  features: {
    sectionTitle: "Everything You Need to Convert Visitors",
    sectionSubtitle: "Powerful features designed to maximize your conversion rates and streamline your lead generation process.",
    features: [
      {
        id: "responsive-design",
        title: "Responsive Design",
        description: "Looks perfect on every device, from desktop to mobile. Your landing page adapts beautifully to any screen size.",
        icon: "target",
        order: 1,
      },
      {
        id: "webhook-integration",
        title: "Webhook Integration", 
        description: "Instantly send form submissions to your CRM, email service, or any tool. Real-time notifications keep you connected to leads.",
        icon: "lightning",
        order: 2,
      },
      {
        id: "form-validation",
        title: "Smart Form Validation",
        description: "Built-in validation ensures you get quality leads. Real-time feedback helps users submit correctly the first time.",
        icon: "shield",
        order: 3,
      },
      {
        id: "fast-loading",
        title: "Lightning Fast",
        description: "Optimised for Core Web Vitals with sub-2 second load times. Fast pages mean better SEO and higher conversions.",
        icon: "rocket",
        order: 4,
      },
      {
        id: "analytics-ready",
        title: "Analytics Ready",
        description: "Track conversions and user behaviour with built-in analytics support. Make data-driven decisions to optimise your funnel.",
        icon: "chart",
        order: 5,
      },
      {
        id: "seo-optimised",
        title: "SEO Optimised",
        description: "Structured data, meta tags, and semantic HTML ensure your landing page ranks well in search results.",
        icon: "star",
        order: 6,
      },
    ],
    partnerLogos: [
      { id: "next", name: "Next Labs", src: "/next.svg" },
      { id: "vercel", name: "Vercel", src: "/vercel.svg" },
      { id: "globe", name: "Globe Corp", src: "/globe.svg" },
      { id: "window", name: "Window Systems", src: "/window.svg" },
    ],
  },
  
  contact: {
    sectionTitle: "Ready to Get Started?",
    sectionSubtitle: "Join thousands of businesses using SetterFlo to convert more visitors into customers.",
    formTitle: "Contact Us",
    successMessage: "Thanks for your interest! We'll get back to you within 24 hours.",
    submitButtonText: "Send Message",
  },
  
  metadata: {
    title: "SetterFlo - Modern Landing Pages with Webhook Integration",
    description: "Build beautiful, high-converting landing pages with powerful webhook integration. Responsive design, smart forms, and lightning-fast performance.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "SetterFlo Landing Page",
    ogImage: "/og-image.png",
    twitterHandle: "@setterflo",
  },
};

// Export individual sections for convenience
export const { hero, features, contact, metadata } = landingPageContent;
