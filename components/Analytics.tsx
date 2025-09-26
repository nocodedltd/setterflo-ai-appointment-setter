'use client';

import { useEffect, useCallback } from 'react';

// Extend Window interface for analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    analytics?: {
      page: (pageName: string) => void;
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
    trackEvent?: (eventName: string, properties?: Record<string, unknown>) => void;
  }
}

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4
    const gtag = window.gtag;
    if (gtag) {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'SetterFlo - AI Appointment Setter for Coaches',
        page_location: window.location.href,
      });
    }

    // Segment analytics
    const analytics = window.analytics;
    if (analytics) {
      analytics.page('SetterFlo Landing Page');
    }
  }, []);

  // Track button clicks
  const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    const gtag = window.gtag;
    if (gtag) {
      gtag('event', eventName, properties);
    }

    const analytics = window.analytics;
    if (analytics) {
      analytics.track(eventName, properties);
    }
  }, []);

  // Expose tracking function globally for button clicks
  useEffect(() => {
    window.trackEvent = trackEvent;
  }, [trackEvent]);

  return null;
};

export default Analytics;
