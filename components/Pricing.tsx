'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for coaches just starting out',
      monthlyPrice: 397,
      originalPrice: 997, // Strikethrough price
      yearlyPrice: 317, // 20% off
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
      features: [
        '1 Instagram account',
        'Inbound lead engagement only',
        'Basic AI responses',
        'Email support',
        'Basic analytics',
      ],
      limitations: [],
      cta: 'Get Started',
      ctaLink: '#booking',
      ctaType: 'scroll',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'Most popular for established coaches',
      monthlyPrice: 597,
      originalPrice: 1497, // Strikethrough price
      yearlyPrice: 478, // 20% off
      icon: Star,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/50',
      features: [
        '2 Instagram accounts',
        'Inbound lead engagement',
        'Advanced AI responses',
        'Priority support',
        'Advanced analytics',
        'Custom scripts',
        'A/B testing',
        'Weekly optimisation calls',
      ],
      limitations: [],
      cta: 'Book a Demo',
      ctaLink: '#booking',
      ctaType: 'scroll',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For agencies and high-volume coaches',
      monthlyPrice: 0,
      originalPrice: 0,
      yearlyPrice: 0,
      icon: Crown,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/30',
      features: [
        'Unlimited Instagram accounts',
        'Multi-agent setup',
        'White-glove onboarding',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting',
        '24/7 phone support',
        'Custom AI training',
      ],
      limitations: [],
      cta: 'Contact Sales',
      ctaLink: '#contact',
      ctaType: 'scroll',
      popular: false,
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
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Beta Pricing Alert */}
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-6">
            <p className="text-primary font-semibold text-lg">
              ⚡ Prices will increase by 2.5× after Beta
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
            Beta Pricing
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Lock in beta pricing now and keep it forever. Early adopters save thousands.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg ${billing === 'monthly' ? 'text-text-primary' : 'text-text-muted'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-background border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  billing === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${billing === 'yearly' ? 'text-text-primary' : 'text-text-muted'}`}>
              Yearly
            </span>
            {billing === 'yearly' && (
              <span className="bg-success-500/20 text-success-500 px-3 py-1 rounded-full text-sm font-medium">
                20% off
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative glass-strong rounded-2xl p-8 border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary font-heading mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-muted mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    {plan.monthlyPrice === 0 ? (
                      <div className="text-3xl font-bold text-text-primary">
                        Custom
                      </div>
                    ) : (
                      <>
                        {/* Strikethrough Original Price */}
                        {plan.originalPrice > 0 && (
                          <div className="text-lg text-text-muted line-through mb-1">
                            £{plan.originalPrice}/month
                          </div>
                        )}
                        {/* Current Beta Price */}
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-text-primary">
                            £{price}
                          </span>
                          <span className="text-text-muted">
                            /{billing === 'yearly' ? 'month' : 'month'}
                          </span>
                        </div>
                      </>
                    )}
                    {billing === 'yearly' && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-text-muted mt-1">
                        Billed annually (20% off)
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-center gap-3 text-text-muted">
                          <div className="w-5 h-5 rounded-full border border-text-muted flex items-center justify-center">
                            <span className="text-xs">-</span>
                          </div>
                          <span className="text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {plan.ctaType === 'stripe' ? (
                  <motion.a
                    href={plan.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary-600 text-white'
                        : 'glass hover:glass-strong text-text-primary border border-border hover:border-primary/50'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.querySelector(plan.ctaLink);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary-600 text-white'
                        : 'glass hover:glass-strong text-text-primary border border-border hover:border-primary/50'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Done-for-you Setup Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm max-w-3xl mx-auto">
            *Includes Done-for-you setup: <span className="text-text-primary font-semibold">£1,497 one-time onboarding fee</span> (covers custom training + deployment)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
