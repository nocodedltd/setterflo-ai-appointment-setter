/**
 * Content Types
 * TypeScript interfaces for static content (hero, features, etc.)
 */

// Hero section content structure
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaTarget: string;
  backgroundImage?: string;
}

// Individual feature item
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

// Features section structure
export interface FeaturesContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  features: FeatureItem[];
  partnerLogos?: {
    id: string;
    name: string;
    src: string;
  }[];
}

// Contact section content
export interface ContactContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  formTitle: string;
  successMessage: string;
  submitButtonText: string;
}

// Site metadata for SEO
export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  siteName: string;
  ogImage?: string;
  twitterHandle?: string;
}

// Complete landing page content structure
export interface LandingPageContent {
  hero: HeroContent;
  features: FeaturesContent;
  contact: ContactContent;
  metadata: SiteMetadata;
}

// Icon types for feature items
export type IconType = 
  | "rocket" 
  | "shield" 
  | "lightning" 
  | "target" 
  | "users" 
  | "chart" 
  | "clock" 
  | "star";

// Theme configuration for styling
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}
