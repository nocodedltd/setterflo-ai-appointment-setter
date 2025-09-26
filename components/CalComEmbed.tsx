'use client';

import { useEffect } from 'react';

const CalComEmbed = () => {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="cal-embed" data-cal-link="setterflo/demo">
      <div className="text-center p-8">
        <h3 className="text-2xl font-bold text-text-primary font-heading mb-4">
          Book Your Demo Call
        </h3>
        <p className="text-text-secondary mb-6">
          Schedule a 15-minute demo to see SetterFlo in action and calculate your savings.
        </p>
        <div className="bg-background-secondary rounded-lg p-4 text-text-muted">
          <p>Loading calendar...</p>
        </div>
      </div>
    </div>
  );
};

export default CalComEmbed;
