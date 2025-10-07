'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Business', 'Mindset', 'Sales', 'Leadership'];
  const [formData, setFormData] = useState({ name: '', email: '', username: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0 bg-background" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/8 rounded-full blur-lg animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* KPI Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-pulse-glow"
          >
            <TrendingUp size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              30–40% more calls booked
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
                      <Image
            src="/setterflo-logo.png"
            alt="SetterFlo Logo"
            width={512}
            height={128}
            priority
            className="h-32 sm:h-40 lg:h-48 w-auto"
          />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary font-heading mb-6 leading-tight"
          >
            <span className="block">#1 AI Appointment Setter for</span>
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-primary"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            Coaches
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-text-secondary font-medium mb-4 max-w-4xl mx-auto"
          >
            Never Lose a Lead Again. Your SetterFlo Books Calls While You Coach.
          </motion.p>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Want to stop chasing DMs and relying on flaky human setters? SetterFlo works your Instagram inbox 24/7, 
            books you more qualified calls and costs less than one high ticket client sale.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-8"
          >
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus('submitting');
                try {
                  const response = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                  });
                  if (response.ok) {
                    setFormStatus('success');
                    setFormData({ name: '', email: '', username: '' });
                  } else {
                    setFormStatus('error');
                  }
                } catch (error) {
                  setFormStatus('error');
                }
              }}
              className="glass p-6 rounded-2xl space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="text"
                  placeholder="@instagram"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  className="px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <motion.button
                type="submit"
                disabled={formStatus === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === 'submitting' ? 'Joining Waitlist...' : 
                 formStatus === 'success' ? '✓ Joined Successfully!' : 
                 'Join the Waitlist Now'}
              </motion.button>
              {formStatus === 'error' && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 185, 173, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#booking')}
              className="glass hover:glass-strong text-text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar size={20} />
                Book Your Demo Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#calculator')}
              className="glass hover:glass-strong text-text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 group"
            >
              <Calculator size={20} />
              See How Much You&apos;ll Save
            </motion.button>
          </motion.div>

          {/* Instagram DM Mockup */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-lg mx-auto"
          >
            {/* Instagram DM Container */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Instagram Header */}
              <div className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 rounded-full p-0.5">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                          <Image 
                            src="/setterflo-logo.jpeg" 
                            alt="SetterFlo" 
                            width={32} 
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-gray-900 font-semibold text-sm">SetterFlo AI</div>
                      <div className="text-green-500 text-xs font-medium">Active now</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="bg-white px-4 py-6 space-y-4 min-h-[400px]">
                {/* Stat Highlight */}
                <div className="flex justify-center mb-4">
                  <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2">
                    <p className="text-green-700 text-xs font-semibold">
                      📈 Avg. 30–40% more calls booked than human setters
                    </p>
                  </div>
                </div>

                {/* AI First Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]">
                    <p className="text-white text-sm leading-relaxed">
                      Hi Alex! Hope you&apos;re having a great day :)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]">
                    <p className="text-white text-sm leading-relaxed">
                      Saw that you liked my recent post about growing your ecommerce store and wanted to reach out!
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]">
                    <p className="text-white text-sm leading-relaxed">
                      What resonated with you the most to make you want to drop a like?
                    </p>
                  </div>
                </div>
                
                {/* User Response */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[75%]">
                    <p className="text-gray-900 text-sm leading-relaxed">
                      Yeah man thanks for reaching out! I&apos;m just starting out but struggling to with the conversion rates for my store 😅
                    </p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]">
                    <p className="text-white text-sm leading-relaxed">
                      ahh got you man 😅 that&apos;s super common when starting out. Curious though… what do you feel like is the biggest thing holding those conversions back right now?
                    </p>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instagram Message Input */}
              <div className="bg-white border-t border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                    <div className="text-gray-500 text-sm">Message...</div>
                  </div>
                  <button className="text-blue-500 font-semibold text-sm">Send</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;