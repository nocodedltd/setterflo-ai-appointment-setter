'use client';

import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight, CheckCircle, Settings, Instagram, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Onboard in 48-72 Hours',
      subtitle: 'Custom training → personalised AI setter',
      description: 'We handle the custom training and deployment so you don\'t have to lift a finger. Our AI learns your voice and creates a personalised setter in 48-72 hours.',
      icon: Settings,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      features: [
        '48-72 hour setup time',
        'Voice and tone customisation',
        'Target audience definition',
        'Booking calendar integration',
      ],
    },
    {
      number: '02',
      title: 'Deploy on Instagram',
      subtitle: 'Setup time: Varies (ask Charlie)',
      description: 'Connect your Instagram account securely. SetterFlo integrates seamlessly and starts engaging with leads using your authentic voice and proven conversion scripts.',
      icon: Instagram,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
      features: [
        'Secure Instagram API connection',
        'Real-time DM monitoring',
        'Instant response capability',
        'Natural conversation flow',
      ],
    },
    {
      number: '03',
      title: 'Get Calls Booked on Autopilot',
      subtitle: '17 booked this week +4 from last',
      description: 'Sit back and watch qualified leads book calls directly into your calendar. Focus on closing while SetterFlo handles the entire lead qualification process.',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      features: [
        'Automated call booking',
        'Lead qualification scoring',
        'Weekly performance reports',
        'Continuous AI optimisation',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
            How It Works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get your AI setter up and running in one day. 
            No complex setup, no technical knowledge required.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary mb-1">
                        Step {step.number}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-text-primary font-heading">
                        {step.title}
                      </h3>
                      <p className="text-lg text-text-secondary">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-text-muted text-lg leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span>Next: {steps[index + 1].title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-md">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-strong rounded-2xl p-8 border border-border"
                  >
                    <div className="text-center space-y-4">
                      <div className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto`}>
                        <Icon className={`w-10 h-10 ${step.color}`} />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold text-text-primary">
                          {step.title}
                        </h4>
                        <p className="text-text-muted">
                          {step.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
                        <Clock className="w-4 h-4" />
                        <span>~{index === 0 ? '7 minutes' : index === 1 ? '2 minutes' : 'Ongoing'}</span>
                      </div>

                      {index === 0 && (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                          <div className="text-sm text-text-primary font-medium mb-2">
                            Quick Setup Form
                          </div>
                          <div className="space-y-2 text-xs text-text-muted">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span>Coaching niche & style</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span>Target audience</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span>Booking preferences</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                          <div className="text-sm text-text-primary font-medium mb-2">
                            Instagram Connected
                          </div>
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                            <span>Monitoring DMs in real-time</span>
                          </div>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="text-sm text-text-primary font-medium mb-2">
                            Calls Booked This Week
                          </div>
                          <div className="text-2xl font-bold text-green-500">
                            12
                          </div>
                          <div className="text-xs text-text-muted">
                            +3 from last week
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

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
              Ready to Get Started?
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              Join hundreds of coaches who&apos;ve automated their lead generation. 
              Get your AI setter running in under 10 minutes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#book-call');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Calendar className="w-5 h-5" />
              Start Your 7-Minute Setup
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
