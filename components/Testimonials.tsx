'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Charlie Lefever',
      role: 'NoCoded (AI Automation Agency)',
      revenue: '',
      avatar: 'CL',
      image: '/charlie-lefever.jpeg',
      quote: "Honestly we've tried a lot of AI stuff, but this one stuck. It's simple, does the job and our inbox feels way more under control.",
      rating: 5,
      savings: '',
    },
    {
      name: 'Joe Brady',
      role: 'Who Media (Social Media Marketing Agency)',
      revenue: '',
      avatar: 'JB',
      image: '/joe-brady.jpeg',
      quote: "Human setters are hit or miss. SetterFlo really shows up every day. The difference is obvious in how many more conversations actually turn into calls and how it sounds like me.",
      rating: 5,
      savings: '',
    },
    {
      name: 'Liam Coyle',
      role: 'ContentFlo (CMS Software Company)',
      revenue: '',
      avatar: 'LC',
      image: '/liam-coyle.jpeg',
      quote: "We actually used to lose track of leads in the DMs all the time. With SetterFlo running, we don't really worry about that anymore it basically just books calls quietly in the background.",
      rating: 5,
      savings: '',
    },
    {
      name: 'Team',
      role: 'Elevare (MBA Career Advisory Software)',
      revenue: '',
      avatar: 'EL',
      image: '/elevare-team.png',
      quote: "Our team used to spend hours replying to messages that led nowhere. Now SetterFlo filters out the noise and just drops the serious people onto our calendar so our no-shows have gone down. Saves us a ton of time.",
      rating: 5,
      savings: '',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
            What Coaches Are Saying
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We&apos;re currently onboarding our first wave of beta clients who are tired of missed DMs and human setter headaches.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mt-12"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="glass-strong rounded-2xl p-8 lg:p-12 border border-border"
              >
                <div className="text-center">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl text-text-primary font-medium mb-8 leading-relaxed">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                      {testimonials[currentIndex].image ? (
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-[#00B8B8] flex items-center justify-center text-white font-bold text-xl">
                          {testimonials[currentIndex].avatar}
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-semibold text-text-primary">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-text-secondary text-sm">
                        {testimonials[currentIndex].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center text-text-primary hover:text-primary transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center text-text-primary hover:text-primary transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-text-muted hover:bg-text-secondary'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-text-secondary">Engagement, Capture 100% of inbound DMs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">70%</div>
            <div className="text-text-secondary">Of tire-kickers filtered out before they waste your time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1</div>
            <div className="text-text-secondary">High-ticket client sale per month = ROI</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
