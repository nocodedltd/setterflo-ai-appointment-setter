'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Mindset Coach',
      revenue: '£18k/month',
      avatar: 'SM',
      quote: "Before SetterFlo I was paying £2k+/month + 10% commission. Now I pay under £600 and have more calls booked than ever. The AI actually sounds more like me than my human setter did!",
      rating: 5,
      savings: '£1,400/month',
    },
    {
      name: 'James Thompson',
      role: 'Business Coach',
      revenue: '£25k/month',
      avatar: 'JT',
      quote: "I was sceptical about AI setters, but SetterFlo has been a game-changer. It works 24/7, never takes holidays, and books higher quality leads than my previous human setters.",
      rating: 5,
      savings: '£2,200/month',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Life Coach',
      revenue: '£15k/month',
      avatar: 'ER',
      quote: "The ROI is incredible. SetterFlo paid for itself in the first week. I'm booking 40% more calls and spending zero time managing setters. It's like having a perfect employee.",
      rating: 5,
      savings: '£1,800/month',
    },
    {
      name: 'David Chen',
      role: 'Executive Coach',
      revenue: '£30k/month',
      avatar: 'DC',
      quote: "I&apos;ve tried every lead generation tool out there. SetterFlo is the only one that actually works. The AI understands my coaching style and books qualified leads consistently.",
      rating: 5,
      savings: '£2,500/month',
    },
    {
      name: 'Lisa Park',
      role: 'Career Coach',
      revenue: '£12k/month',
      avatar: 'LP',
      quote: "As a new coach, I couldn&apos;t afford human setters. SetterFlo gave me enterprise-level lead generation at a fraction of the cost. I&apos;m scaling faster than I ever imagined.",
      rating: 5,
      savings: '£1,200/month',
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
            Join hundreds of successful coaches who&apos;ve automated their lead generation with SetterFlo.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="glass-strong rounded-2xl p-8 lg:p-12"
              >
                <div className="text-center">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-semibold text-text-primary">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-text-muted">
                        {testimonials[currentIndex].role}
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {testimonials[currentIndex].revenue}
                      </div>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  <div className="mt-6 inline-flex items-center gap-2 bg-success-500/10 border border-success-500/20 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full" />
                    <span className="text-success-500 font-semibold">
                      Saves {testimonials[currentIndex].savings}
                    </span>
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
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-text-secondary">Calls Booked Monthly</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">40%</div>
            <div className="text-text-secondary">More Calls Than Human Setters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">£2.1M</div>
            <div className="text-text-secondary">Saved by Our Coaches</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
