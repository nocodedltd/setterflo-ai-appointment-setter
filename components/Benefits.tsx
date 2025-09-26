'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  MessageCircle, 
  Brain, 
  Calendar, 
  BarChart3, 
  Globe, 
  Target, 
  Shield,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Instant Lead Engagement',
      description: 'Responds to DMs within seconds, never missing an opportunity',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      icon: MessageCircle,
      title: 'Human-Like Tone',
      description: 'Trained on your voice and style, sounds authentically like you',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Brain,
      title: 'Trained Scripts',
      description: 'Uses proven conversion scripts tailored to your coaching niche',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      icon: Target,
      title: 'Objection Handling',
      description: 'Handles common objections and keeps conversations moving forward',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      icon: Calendar,
      title: 'Natural Booking',
      description: 'Books calls seamlessly using your Cal.com integration',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: BarChart3,
      title: 'Daily Follow-ups',
      description: 'Follows up with leads until they book or opt out',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10',
    },
    {
      icon: Globe,
      title: 'Multilingual',
      description: 'Communicates in multiple languages to reach global audiences',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
    },
    {
      icon: TrendingUp,
      title: 'ROI = 1 Client',
      description: 'Pays for itself with just one additional client per month',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
    },
  ];

  const profileIntelligence = [
    {
      title: 'Bio Analysis',
      description: 'Reads and understands prospect bios to identify ideal clients',
    },
    {
      title: 'Content Review',
      description: 'Analyses recent posts to understand interests and pain points',
    },
    {
      title: 'Follower Analysis',
      description: 'Reviews follower count and engagement to gauge influence',
    },
    {
      title: 'Tag Analysis',
      description: 'Examines hashtags and mentions to understand niche focus',
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
            What It Does — <span className="text-primary">Your Setter, Upgraded</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            SetterFlo combines the best of human setters with AI reliability. 
            Never miss a lead, never pay commission, never worry about coverage.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Advanced Profile Intelligence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary font-heading">
                  Advanced Profile Intelligence
                </h3>
              </div>
              <p className="text-text-secondary text-lg mb-8">
                Unlike spray-and-pray approaches, SetterFlo analyses each prospect&apos;s profile 
                to qualify leads before engaging. This means higher conversion rates and 
                more qualified calls.
              </p>

              <div className="space-y-4">
                {profileIntelligence.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{feature.title}</h4>
                      <p className="text-text-muted text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual Panel */}
            <div className="relative">
              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-text-primary font-semibold">Smart vs Spray-and-Pray</div>
                    <div className="text-text-muted text-sm">Profile Analysis Complete</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success-500/10 border border-success-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-success-500/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-success-500 rounded-full" />
                      </div>
                      <span className="text-text-primary text-sm font-medium">High Intent Lead</span>
                    </div>
                    <span className="text-success-500 text-sm font-semibold">✓ Qualified</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-warning-500/10 border border-warning-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-warning-500/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-warning-500 rounded-full" />
                      </div>
                      <span className="text-text-primary text-sm font-medium">Medium Intent</span>
                    </div>
                    <span className="text-warning-500 text-sm font-semibold">? Monitor</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-error-500/10 border border-error-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-error-500/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-error-500 rounded-full" />
                      </div>
                      <span className="text-text-primary text-sm font-medium">Low Intent</span>
                    </div>
                    <span className="text-error-500 text-sm font-semibold">✗ Skip</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="text-text-primary text-sm font-medium mb-1">Analytics & Reports</div>
                  <div className="text-text-muted text-xs">
                    Daily performance reports with conversion rates, response times, and ROI metrics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
