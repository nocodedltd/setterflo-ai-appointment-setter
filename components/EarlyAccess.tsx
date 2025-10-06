'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const EarlyAccess = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="early-access" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main CTA Card */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            <div className="glass-strong rounded-3xl p-12 lg:p-16 border-2 border-primary/30 relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
                  Ready to Get Started?
                </h2>
                
                <p className="text-xl text-primary mb-4 font-semibold">
                  Join the waitlist for beta. 5 spots left!
                </p>

                <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                  We'll spend dedicated 1-on-1 time setting up your AI to make sure it's flawlessly generating qualified appointments for you.
                </p>

                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 185, 173, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.querySelector('#hero');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-primary hover:bg-primary-600 text-white px-12 py-6 rounded-lg font-semibold text-xl transition-all duration-300 flex items-center gap-3 group"
                  >
                    <Calendar className="w-6 h-6" />
                    Join the Waitlist
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </div>

                <div className="mt-8 text-sm text-text-secondary">
                  <p>✓ 48-72hrs setup • ✓ Beta pricing locked in • ✓ Done-for-you onboarding</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccess;
