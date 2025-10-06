'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  { name: 'ContentFlo', image: '/cf_logo_new.svg' },
  { name: 'NoCoded', image: '/nocoded-logo.png' },
  { name: 'Who Media', image: '/whomedia-logo.png' },
  { name: 'Elevare', image: '/elevare-logo.png' },
];

const TrustedMarquee = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scrolling Marquee */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-16 items-center"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate logos for seamless loop */}
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center gap-4 min-w-[180px]"
                >
                  <div className="w-24 h-24 relative flex items-center justify-center glass rounded-xl p-4">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-semibold text-text-primary whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default TrustedMarquee;
