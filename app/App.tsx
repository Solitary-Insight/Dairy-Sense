'use client'

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import SensorSystemSection from "@/components/sensor-system-section"
import HowItWorksSection from "@/components/how-it-works-section"
import TestimonialsSection from "@/components/testimonials-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"
import LiveChat from "@/components/live-chat"
import { useLanguage } from "@/hooks/useLanguage"
import {  LANG_STRINGS } from "@/lib/Constants/App/language"



export default function App() {
  const { language, changeLanguage, dir, meta } = useLanguage();

  return (

    <div className={`min-h-screen bg-white font-${meta.class}`} dir={dir}>
     
    
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SensorSystemSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
      <LiveChat />
    </div>

  )
}
