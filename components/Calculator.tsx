'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalculatorIcon, TrendingUp, DollarSign, Calendar, Users, ArrowRight } from 'lucide-react';

const SavingsCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 10000,
    commissionPercent: 10,
    baseSalary: 2000,
    numberOfSetters: 1,
    plan: 'pro', // 'starter' or 'pro'
    billing: 'monthly', // 'monthly' or 'yearly'
  });

  const [savings, setSavings] = useState({
    humanCost: 0,
    setterFloCost: 0,
    monthlySavings: 0,
    yearlySavings: 0,
  });

  const plans = useMemo(() => ({
    starter: { monthly: 397, name: 'Starter' },
    pro: { monthly: 597, name: 'Pro' },
    enterprise: { monthly: 0, name: 'Enterprise' },
  }), []);

  useEffect(() => {
    const calculateSavings = () => {
      const { monthlyRevenue, commissionPercent, baseSalary, numberOfSetters, plan, billing } = inputs;
      
      // Calculate human setter costs
      const commissionCost = (monthlyRevenue * commissionPercent) / 100;
      const humanCost = (baseSalary + commissionCost) * numberOfSetters;
      
      // Calculate SetterFlo costs
      let setterFloCost = plans[plan as keyof typeof plans].monthly;
      if (billing === 'yearly') {
        setterFloCost = setterFloCost * 12 * 0.8; // 20% discount for yearly
      } else {
        setterFloCost = setterFloCost * 12;
      }
      
      const monthlySavings = humanCost - (setterFloCost / 12);
      const yearlySavings = humanCost * 12 - setterFloCost;
      
      setSavings({
        humanCost,
        setterFloCost: setterFloCost / 12,
        monthlySavings,
        yearlySavings,
      });
    };

    calculateSavings();
  }, [inputs, plans]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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

  return (
    <section id="calculator" className="py-20 bg-background">
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
            How Much Are You Wasting on Human Setters?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Calculate your current costs vs SetterFlo. Most coaches save thousands every month.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-text-primary font-heading mb-6 flex items-center gap-3">
                <CalculatorIcon className="w-8 h-8 text-primary" />
                Your Current Setup
              </h3>

              <div className="space-y-6">
                {/* Monthly Revenue */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Monthly Revenue (£)
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlyRevenue}
                    onChange={(e) => setInputs({ ...inputs, monthlyRevenue: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="10000"
                  />
                </div>

                {/* Commission Percentage */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Commission % per Sale
                  </label>
                  <input
                    type="number"
                    value={inputs.commissionPercent}
                    onChange={(e) => setInputs({ ...inputs, commissionPercent: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="10"
                    min="0"
                    max="50"
                  />
                </div>

                {/* Base Salary */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Base Salary per Setter (£/month)
                  </label>
                  <input
                    type="number"
                    value={inputs.baseSalary}
                    onChange={(e) => setInputs({ ...inputs, baseSalary: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="2000"
                  />
                </div>

                {/* Number of Setters */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Number of Setters
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfSetters}
                    onChange={(e) => setInputs({ ...inputs, numberOfSetters: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="1"
                    min="1"
                  />
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    SetterFlo Plan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(plans).map(([key, plan]) => (
                      <button
                        key={key}
                        onClick={() => setInputs({ ...inputs, plan: key })}
                        className={`p-4 rounded-lg border transition-all ${
                          inputs.plan === key
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-background text-text-secondary hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-sm">
                          {plan.monthly > 0 ? formatCurrency(plan.monthly) : 'Custom'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Billing Toggle */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Billing
                  </label>
                  <div className="flex bg-background rounded-lg p-1">
                    <button
                      onClick={() => setInputs({ ...inputs, billing: 'monthly' })}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        inputs.billing === 'monthly'
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setInputs({ ...inputs, billing: 'yearly' })}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        inputs.billing === 'yearly'
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Yearly (20% off)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Savings Summary */}
            <div className="glass-strong rounded-2xl p-8 border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-text-primary font-heading mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                Your Savings
              </h3>

              <div className="space-y-6">
                {/* Human Cost */}
                <div className="flex justify-between items-center p-4 bg-error-500/10 border border-error-500/20 rounded-lg">
                  <div>
                    <div className="text-sm text-text-muted">Current Human Setters</div>
                    <div className="text-2xl font-bold text-error-500">
                      {formatCurrency(savings.humanCost)}
                    </div>
                    <div className="text-sm text-text-muted">per month</div>
                  </div>
                  <Users className="w-8 h-8 text-error-500" />
                </div>

                {/* SetterFlo Cost */}
                <div className="flex justify-between items-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div>
                    <div className="text-sm text-text-muted">SetterFlo {plans[inputs.plan as keyof typeof plans].name}</div>
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(savings.setterFloCost)}
                    </div>
                    <div className="text-sm text-text-muted">per month</div>
                  </div>
                  <CalculatorIcon className="w-8 h-8 text-primary" />
                </div>

                {/* Monthly Savings */}
                <div className="flex justify-between items-center p-6 bg-success-500/10 border-2 border-success-500/30 rounded-lg">
                  <div>
                    <div className="text-sm text-text-muted">Monthly Savings</div>
                    <div className="text-3xl font-bold text-success-500">
                      {formatCurrency(savings.monthlySavings)}
                    </div>
                    <div className="text-sm text-text-muted">every month</div>
                  </div>
                  <DollarSign className="w-10 h-10 text-success-500" />
                </div>

                {/* Yearly Savings */}
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-success-500/10 border border-primary/20 rounded-lg">
                  <div className="text-sm text-text-muted mb-2">Yearly Savings</div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatCurrency(savings.yearlySavings)}
                  </div>
                  <div className="text-text-secondary">
                    back in your pocket every year
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="glass rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  Stop Losing Money
                </h4>
                <p className="text-text-secondary">
                  You&apos;re currently paying{' '}
                  <span className="font-bold text-error-500">
                    {formatCurrency(savings.humanCost)}
                  </span>{' '}
                  for human setters. SetterFlo costs{' '}
                  <span className="font-bold text-primary">
                    {formatCurrency(savings.setterFloCost)}
                  </span>
                  . That&apos;s{' '}
                  <span className="font-bold text-success-500">
                    {formatCurrency(savings.monthlySavings)} saved
                  </span>{' '}
                  every month.
                </p>
              </div>

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
                Book Your Demo
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
