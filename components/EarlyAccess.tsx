'use client';

import { motion } from 'framer-motion';
import { Calendar, Instagram, Clock, Users, ArrowRight, Zap } from 'lucide-react';

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

  const urgencyFeatures = [
    {
      icon: Users,
      title: 'Only 5 Spots Left',
      description: 'Beta pricing limited to first 5 coaches',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      icon: Clock,
      title: 'Limited Time',
      description: 'Pricing increases 40% after beta',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
    {
      icon: Zap,
      title: 'Lock In Rates',
      description: 'Keep beta pricing for life',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

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
            className="relative max-w-4xl mx-auto mb-16"
          >
            <div className="glass-strong rounded-3xl p-8 lg:p-12 border-2 border-primary/30 relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6 animate-pulse-glow"
                >
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Beta Access - Limited Spots
                  </span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
                  Beta Pricing Open for{' '}
                  <span className="text-primary">5 Coaches Only</span>
                </h2>
                
                <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                  Once filled, pricing increases. Don't wait. Lock in these rates for life 
                  and join the future of AI-powered lead generation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 185, 173, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.querySelector('#book-call');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Your Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://instagram.com/setterflo', '_blank')}
                    className="glass hover:glass-strong text-text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    DM us on Instagram
                  </motion.button>
                </div>

                <div className="text-sm text-text-muted">
                  <p>✓ 7-minute setup • ✓ 24/7 support • ✓ Cancel anytime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Urgency Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {urgencyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-text-primary font-heading mb-4">
              Why Coaches Choose SetterFlo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">No more missed DMs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">24/7 availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">No commission fees</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">Higher conversion rates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">Instant setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">Proven ROI</span>
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
