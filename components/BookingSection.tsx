'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Users } from 'lucide-react';

interface BookingSectionProps {
  className?: string;
}

const BookingSection = ({ className }: BookingSectionProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      Cal("init", "setterflo-demo", {origin:"https://app.cal.com"});
      
      Cal.ns["setterflo-demo"]("inline", {
        elementOrSelector:"#my-cal-inline-setterflo-demo",
        config: {"layout":"month_view"},
        calLink: "nocoded/setterflo-demo",
      });
      
      Cal.ns["setterflo-demo"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(script);

    return () => {
      // Clean up the inline script we created
      if (script.parentNode === document.body) {
        document.body.removeChild(script);
      }
      // Clean up Cal.com external script if it exists
      const externalScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (externalScript && externalScript.parentNode === document.head) {
        document.head.removeChild(externalScript);
      }
    };
  }, []);

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
    <section id="booking" className={`py-32 bg-gradient-to-b from-background to-background-secondary ${className}`}>
      <div id="book-call" className="absolute -mt-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8"
          >
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-base font-semibold text-primary">
              Schedule Your Demo
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary font-heading mb-8"
          >
            See SetterFlo in{' '}
            <span className="text-primary">Action</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-2xl text-text-secondary max-w-3xl mx-auto mb-12"
          >
            Book a 15-minute demo and discover how AI can transform your Instagram lead generation
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
          >
            <motion.div variants={itemVariants} className="glass rounded-xl p-6 border border-border text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">Live Demo</h4>
              <p className="text-sm text-text-secondary">See SetterFlo working on your Instagram</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass rounded-xl p-6 border border-border text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">ROI Calculation</h4>
              <p className="text-sm text-text-secondary">Custom savings analysis for your business</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass rounded-xl p-6 border border-border text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">Personalised Setup</h4>
              <p className="text-sm text-text-secondary">Tailored recommendations for your niche</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass rounded-xl p-6 border border-border text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">Q&A Session</h4>
              <p className="text-sm text-text-secondary">All your questions answered live</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-strong rounded-3xl shadow-2xl border-2 border-primary/30 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary font-heading mb-2">
                    Book Your Demo Call
                  </h3>
                  <p className="text-text-secondary">
                    Choose a time that works for you
                  </p>
                </div>
                <div className="hidden lg:flex items-center gap-8 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>15 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>1-on-1</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-background-secondary/30">
              <div 
                style={{width:'100%', height:'700px', overflow:'auto'}} 
                id="my-cal-inline-setterflo-demo"
                className="rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Usually available within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>100% personalised to your business</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
