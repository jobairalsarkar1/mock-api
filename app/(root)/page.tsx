import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ReviewsSection from "@/components/ReviewsSection";
import React from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
