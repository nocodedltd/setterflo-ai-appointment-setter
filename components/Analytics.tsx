'use client';

import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'SetterFlo - AI Appointment Setter for Coaches',
        page_location: window.location.href,
      });
    }

    // Segment analytics
    const analytics = (window as any).analytics;
    if (analytics) {
      analytics.page('SetterFlo Landing Page');
    }
  }, []);

  // Track button clicks
  const trackEvent = (eventName: string, properties?: any) => {
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('event', eventName, properties);
    }

    const analytics = (window as any).analytics;
    if (analytics) {
      analytics.track(eventName, properties);
    }
  };

  // Expose tracking function globally for button clicks
  useEffect(() => {
    (window as any).trackEvent = trackEvent;
  }, []);

  return null;
};

export default Analytics;
