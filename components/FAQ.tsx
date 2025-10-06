'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How is SetterFlo different from a human setter?",
      answer: "SetterFlo is available 24/7, never misses a DM, doesn't take holidays, and costs a fraction of human setter commissions. Plus, it's trained on your exact messaging style and automatically books calls directly in DMs—no links, no friction."
    },
    {
      question: "Will it sound like a robot?",
      answer: "No. SetterFlo is trained on your voice and includes natural typos, corrections, delays, and conversational fillers. Leads think they're talking to you or your team."
    },
    {
      question: "How long does setup take?",
      answer: "48–72 hours. We handle the custom training and deployment so you don't have to lift a finger."
    },
    {
      question: "What if I don't use Instagram?",
      answer: "SetterFlo is optimised for Instagram DMs where most coaching leads happen. If you use other platforms, contact us to discuss custom integrations."
    },
    {
      question: "Do I need to change my existing booking process?",
      answer: "No. SetterFlo syncs with your existing calendar (Cal.com, Calendly, etc.) and books directly inside DMs."
    },
    {
      question: "What happens after beta pricing ends?",
      answer: "Prices will increase by 2.5×. Early adopters lock in beta pricing permanently."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. No long-term contracts. Cancel anytime from your dashboard."
    },
    {
      question: "What if leads ask questions SetterFlo can't answer?",
      answer: "SetterFlo handles 95% of common questions. For edge cases, it seamlessly hands off to you with context included."
    },
    {
      question: "How many calls will I get booked per month?",
      answer: "Most clients see 15–30 qualified calls booked per month, depending on inbound DM volume. SetterFlo converts 30–40% more leads than human setters."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Everything you need to know about SetterFlo. 
            Can&apos;t find your answer? Book a call and we&apos;ll help you out.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass rounded-xl border border-border hover:border-primary/30 transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-background/50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary" />
                  ) : (
                    <Plus className="w-5 h-5 text-text-muted" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-border pt-4">
                        <p className="text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-text-primary font-heading mb-4">
              Still Have Questions?
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              Book a 15-minute call with our team. We&apos;ll answer all your questions 
              and show you exactly how SetterFlo can transform your lead generation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#book-call');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Book a Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
