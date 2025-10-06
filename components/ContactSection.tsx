'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Instagram } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    username: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          username: formData.username,
        }),
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', username: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading mb-6">
            Contact Sales
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Interested in Enterprise? Get in touch and we'll create a custom solution for your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong p-8 rounded-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Subject & Instagram Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enterprise Inquiry"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-2">
                  <Instagram className="inline w-4 h-4 mr-2" />
                  Instagram Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="@yourhandle"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={formStatus === 'submitting'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {formStatus === 'submitting' ? (
                'Sending...'
              ) : formStatus === 'success' ? (
                '✓ Sent Successfully!'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>

            {formStatus === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or email setterflo@nocoded.co.uk
              </p>
            )}

            {formStatus === 'success' && (
              <p className="text-green-400 text-sm text-center">
                Thanks! We'll get back to you within 24 hours.
              </p>
            )}
          </form>

          {/* Optional: Waitlist Join */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-text-muted text-sm">
              Or{' '}
              <button
                onClick={() => {
                  const element = document.querySelector('#hero');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-primary hover:underline font-medium"
              >
                join the waitlist
              </button>
              {' '}for beta access
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
