'use client';

import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Target, TrendingUp } from 'lucide-react';

const TargetAudience = () => {
  const painPoints = [
    {
      icon: X,
      title: 'Missed DMs',
      description: 'Leads slip through the cracks while you focus on coaching',
    },
    {
      icon: AlertCircle,
      title: 'MIA Setters',
      description: 'Human setters go AWOL, leaving you scrambling for coverage',
    },
    {
      icon: TrendingUp,
      title: 'High Commission',
      description: 'Paying 10-15% commission on every sale adds up quickly',
    },
    {
      icon: AlertCircle,
      title: 'Wasted Time',
      description: 'Hours spent managing setters instead of growing your business',
    },
  ];

  const aspirations = [
    {
      icon: CheckCircle,
      title: 'Predictable Call Flow',
      description: 'Consistent, qualified leads booking calls every week',
    },
    {
      icon: Target,
      title: 'Always-On Setter',
      description: '24/7 lead engagement that never sleeps or takes holidays',
    },
    {
      icon: TrendingUp,
      title: 'More Income',
      description: 'Scale beyond £10k/month with reliable lead generation',
    },
    {
      icon: CheckCircle,
      title: 'Coaching Freedom',
      description: 'Focus on what you do best - coaching and closing',
    },
  ];

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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
            Who It&apos;s For
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            If you&apos;re tired of unreliable human setters and want predictable lead flow, 
            SetterFlo is your solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Pain Points */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-text-primary font-heading mb-4 flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-error-500/20 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-error-500" />
                </div>
                Current Frustrations
              </h3>
              <p className="text-text-muted text-lg">
                Sound familiar? You&apos;re not alone.
              </p>
            </div>

            <div className="space-y-4">
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="glass rounded-xl p-6 border border-border hover:border-error-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-error-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-error-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-text-primary mb-2">
                          {point.title}
                        </h4>
                        <p className="text-text-secondary">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Aspirations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-text-primary font-heading mb-4 flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-success-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success-500" />
                </div>
                Your Vision
              </h3>
              <p className="text-text-muted text-lg">
                What success looks like with SetterFlo.
              </p>
            </div>

            <div className="space-y-4">
              {aspirations.map((aspiration, index) => {
                const Icon = aspiration.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="glass rounded-xl p-6 border border-border hover:border-success-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-success-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-success-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-text-primary mb-2">
                          {aspiration.title}
                        </h4>
                        <p className="text-text-secondary">
                          {aspiration.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="glass-strong rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary font-heading mb-4">
              Ready to Transform Your Lead Generation?
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              Stop losing leads to unreliable human setters. 
              Get an AI setter that works 24/7 and costs less than one client sale.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#calculator');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Calculate Your Savings
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudience;
