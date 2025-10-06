'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'ContentFlo', text: 'ContentFlo' },
  { name: 'NoCoded', text: 'NoCoded' },
  { name: 'Who Media', text: 'Who Media' },
  { name: 'Elevare', text: 'Elevare' },
];

const TrustedMarquee = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-text-secondary text-lg font-medium">
            Trusted by coaches scaling beyond $10K/month
          </p>
        </motion.div>

        {/* Scrolling Marquee */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-16"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate logos for seamless loop */}
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center glass px-8 py-4 rounded-lg min-w-[200px]"
                >
                  <span className="text-2xl font-bold text-text-primary whitespace-nowrap">
                    {logo.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default TrustedMarquee;
