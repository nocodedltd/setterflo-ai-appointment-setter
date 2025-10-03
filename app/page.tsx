import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TargetAudience from "@/components/TargetAudience";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import SavingsCalculator from "@/components/Calculator";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import EarlyAccess from "@/components/EarlyAccess";
import BookingSection from "@/components/BookingSection";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Lazy load heavy components
const CalComEmbed = dynamic(() => import("@/components/CalComEmbed"), {
  loading: () => (
    <div className="h-96 bg-background-secondary rounded-lg animate-pulse" />
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TargetAudience />
      <Benefits />
      <HowItWorks />
      <SavingsCalculator />
      <Pricing />
      <Testimonials />
      <EarlyAccess />
      <BookingSection />
      <FinalCTA />
      <FAQ />
      <Footer />
      
      {/* Cal.com Modal Embed (kept for backward compatibility) */}
      <div id="book-call" className="hidden">
        <CalComEmbed />
      </div>
    </main>
  );
}