'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How is SetterFlo different from human setters?",
      answer: "SetterFlo works 24/7, never takes holidays, and costs a fraction of human setters. It responds instantly to DMs, uses your exact voice and tone, and never gets tired or makes mistakes. Plus, you pay a fixed monthly fee instead of commission on every sale."
    },
    {
      question: "Will prospects know they're talking to AI?",
      answer: "No, SetterFlo is designed to sound completely human. It uses your coaching style, personality, and proven conversion scripts. Prospects will think they're talking directly to you. The AI is trained on successful coaching conversations and adapts to your unique voice."
    },
    {
      question: "Is SetterFlo right for my coaching niche?",
      answer: "SetterFlo works for all coaching niches - business, mindset, life, career, executive, and more. During setup, you'll specify your niche, target audience, and coaching style. The AI learns your specific approach and tailors conversations accordingly."
    },
    {
      question: "What if prospects have objections or questions?",
      answer: "SetterFlo is trained to handle common objections like 'I'm not ready', 'It's too expensive', or 'I need to think about it'. It uses proven objection-handling techniques and can escalate complex questions to you via email. The AI gets smarter with each conversation."
    },
    {
      question: "Is my Instagram account safe?",
      answer: "Absolutely. SetterFlo uses Instagram's official API with read-only access to DMs. We never post content or access your personal data. Your account remains completely secure, and you can revoke access anytime. We're fully compliant with Instagram's terms of service."
    },
    {
      question: "Can I use SetterFlo as a co-pilot with my human setter?",
      answer: "Yes! Many coaches use SetterFlo to handle initial lead qualification and warm-up conversations, then hand off qualified prospects to their human setter for closing. This hybrid approach maximises efficiency while maintaining the human touch where needed."
    },
    {
      question: "How much will I actually save?",
      answer: "Most coaches save £1,500-£3,000+ per month compared to human setters. With no commission fees and 24/7 availability, the ROI is typically 300-500%. Use our calculator to see your exact savings based on your current setup."
    },
    {
      question: "Can I cancel if it doesn't work for me?",
      answer: "Yes, you can cancel anytime with 30 days notice. We're so confident in SetterFlo's performance that we offer a 30-day money-back guarantee. If you're not booking more calls within 30 days, we'll refund your entire investment."
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
            Can't find your answer? Book a call and we'll help you out.
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
              Book a 15-minute call with our team. We'll answer all your questions 
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
