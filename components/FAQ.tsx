'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  bullets?: string[];
  afterBullets?: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How is SetterFlo different from a human setter?",
      answer: "Unlike human setters, SetterFlo never takes breaks, never forgets to follow up and never asks for commission. It responds instantly (or with a custom delay), 24/7, in your exact tone of voice. Plus, it's trained on scripts from a pro setter in the business & mindset coaching space mixed with your own so it actually talks like a top performer, not a bot. Coaches typically see 30–40% more calls booked compared to human setters."
    },
    {
      question: "Will prospects know it's an AI and not a real person?",
      answer: "Nope. SetterFlo uses human-like messaging with casual punctuation, fillers, even little typos + corrections (just like a real DM). It builds rapport naturally, references their content and asks open-ended questions. Most coaches tell us their leads can't tell the difference at all, it just feels like chatting with a super responsive team member."
    },
    {
      question: "How do I know it will fit my offer and niche?",
      answer: "During onboarding, we collect your offer details, scripts, FAQs and objections. SetterFlo is then trained on your exact language + a proven playbook from high-performing setters. That means every message feels authentic and tailored to your audience whether you sell coaching for business, e-commerce, sales, trading, mindset or hybrid offers."
    },
    {
      question: "What does the setup fee actually cover?",
      answer: "This isn't just \"plug and play\" AI. Every SetterFlo agent is customised to your offer, your niche and your voice. The setup covers:",
      bullets: [
        "Collecting your scripts, objections and FAQs",
        "Writing custom prompts that sound like you",
        "Building and connecting the tech stack (IG integration, calendar sync, objection library, follow-ups, analytics)",
        "Testing everything on a demo account before going live so you don't lose leads"
      ],
      afterBullets: "It's a done-for-you onboarding, not a template."
    },
    {
      question: "Can it handle objections like \"too expensive\" or \"I need to think about it\"?",
      answer: "Yes. SetterFlo has an entire objection-handling library built in covering price, timing, hesitation and competitor objections. It qualifies leads, handles pushback and smoothly guides the right ones to a booking. And because it never forgets to follow up, many \"slow\" leads convert after a few gentle nudges. As I'm sure you know, the sales are in the follow-ups!"
    },
    {
      question: "Is it safe to give SetterFlo access to my Instagram?",
      answer: "Absolutely. We integrate through secure, approved API tools. SetterFlo never stores your client's personal data outside of your account. And if you prefer, we can demo the agent first on our test account before going live on yours. We're fully compliant with Instagram's terms of service."
    },
    {
      question: "What if I already have a setter or closer on my team?",
      answer: "Perfect. SetterFlo can run in Co-Pilot Mode so that means qualifying and warming up leads, then passing the best ones to your human setter or closer. This means your team spends their time only on high-quality prospects, instead of chasing every \"just curious\" DM."
    },
    {
      question: "How much money can I actually save with SetterFlo?",
      answer: "Most coaches pay a human setter £1.5K–£3K base salary + 5–10% commission which easily adds up to £3K–£5K/month. SetterFlo starts at just £397/month flat. With no commission fees and 24/7 availability, the ROI is typically 300-500%. Use our calculator to see your exact savings based on your current setup."
    },
    {
      question: "What if it doesn't work for me?",
      answer: "We're confident it will, because it's built from proven scripts and optimised weekly. But if for any reason you're not seeing results, you can cancel anytime. The truth is, for most coaches, SetterFlo pays for itself with just 1 booked high-ticket client."
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
                        {faq.bullets && faq.bullets.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {faq.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="text-text-secondary leading-relaxed flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {faq.afterBullets && (
                          <p className="text-text-secondary leading-relaxed mt-4">
                            {faq.afterBullets}
                          </p>
                        )}
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
