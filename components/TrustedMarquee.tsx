'use client';

import { motion } from 'framer-motion';

const TrustedMarquee = () => {
  const logos = [
    { name: 'Coach 1', revenue: '£15k/month' },
    { name: 'Coach 2', revenue: '£22k/month' },
    { name: 'Coach 3', revenue: '£18k/month' },
    { name: 'Coach 4', revenue: '£25k/month' },
    { name: 'Coach 5', revenue: '£12k/month' },
    { name: 'Coach 6', revenue: '£30k/month' },
    { name: 'Coach 7', revenue: '£20k/month' },
    { name: 'Coach 8', revenue: '£16k/month' },
  ];

  const marqueeVariants = {
    animate: {
      x: [0, -100 * logos.length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-heading mb-4">
            Trusted by coaches scaling beyond £10k/month
          </h2>
          <p className="text-text-secondary text-lg">
            Join successful coaches who've automated their lead generation
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            variants={marqueeVariants}
            animate="animate"
            className="flex space-x-16"
            style={{ width: `${logos.length * 200}px` }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 flex items-center gap-3 glass rounded-xl px-6 py-4 min-w-[200px]"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {logo.name.charAt(logo.name.length - 1)}
                  </span>
                </div>
                <div>
                  <div className="text-text-primary font-semibold">{logo.name}</div>
                  <div className="text-text-muted text-sm">{logo.revenue}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedMarquee;
