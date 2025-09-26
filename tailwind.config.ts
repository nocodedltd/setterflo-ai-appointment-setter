import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // SetterFlo Brand Colors (dark-first)
        background: {
          DEFAULT: '#0E1B36', // Deep Navy
          secondary: 'rgba(255,255,255,0.06)', // Card background
        },
        primary: {
          DEFAULT: '#00B9AD', // Primary Teal
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00B9AD',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        text: {
          primary: '#FFFFFF', // White primary text
          secondary: '#C7D1E0', // Muted text
          muted: '#A1A9B8', // More muted
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.1)', // Subtle borders
          muted: 'rgba(255,255,255,0.05)',
        },
        // Support colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb', 
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Hero section text sizes
        "hero-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "hero-lg": ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "hero-md": ["2.25rem", { lineHeight: "1.3" }],
      },
      spacing: {
        // Custom spacing for sections
        "section-y": "6rem",
        "section-y-sm": "4rem",
      },
      maxWidth: {
        "content": "1200px",
        "prose": "65ch",
      },
      animation: {
        // Smooth animations for interactions
        "fade-up": "fadeUp 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        // SetterFlo specific animations
        "word-swap": "wordSwap 3s ease-in-out infinite",
        "typing": "typing 2s steps(40, end) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
        "marquee": "marquee 20s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1", 
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        wordSwap: {
          "0%, 20%": { opacity: "1", transform: "translateY(0)" },
          "25%, 45%": { opacity: "0", transform: "translateY(-20px)" },
          "50%, 70%": { opacity: "1", transform: "translateY(0)" },
          "75%, 95%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00B9AD, 0 0 10px #00B9AD, 0 0 15px #00B9AD" },
          "100%": { boxShadow: "0 0 10px #00B9AD, 0 0 20px #00B9AD, 0 0 30px #00B9AD" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        pulseGlow: {
          "0%, 100%": { 
            boxShadow: "0 0 5px #00B9AD, 0 0 10px #00B9AD",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 20px #00B9AD, 0 0 30px #00B9AD",
            transform: "scale(1.05)"
          },
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "large": "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;