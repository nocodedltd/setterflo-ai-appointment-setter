'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Calendar } from 'lucide-react';

const FinalCTA = () => {
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

  const benefits = [
    'Stop chasing DMs 24/7',
    'Eliminate setter management stress',
    'Book more qualified calls',
    'Save thousands every month',
    'Scale beyond £10k/month',
    'Focus on what you do best',
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            <div className="glass-strong rounded-3xl p-8 lg:p-12 border-2 border-primary/30 relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6 animate-pulse-glow"
                >
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Ready to Transform Your Business?
                  </span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
                  Stop Babysitting Setters.{' '}
                  <span className="text-primary">Start Closing Clients.</span>
                </h2>
                
                <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                  Join hundreds of successful coaches who've automated their lead generation. 
                  Get your AI setter running in under 10 minutes and start booking more calls today.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 185, 173, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.querySelector('#book-call');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary hover:bg-primary-600 text-white px-12 py-6 rounded-lg font-bold text-xl transition-all duration-300 flex items-center gap-3 mx-auto group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Get Access to SetterFlo Now
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <div className="mt-6 text-sm text-text-muted">
                  <p>✓ 7-minute setup • ✓ 30-day money-back guarantee • ✓ Cancel anytime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-text-primary font-heading mb-8">
              What You'll Get
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 glass rounded-lg p-4 border border-border hover:border-primary/30 transition-all duration-200"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-text-secondary">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final Stats */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-text-secondary">Calls Booked Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">£2.1M</div>
              <div className="text-text-secondary">Saved by Coaches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">40%</div>
              <div className="text-text-secondary">More Calls Booked</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
