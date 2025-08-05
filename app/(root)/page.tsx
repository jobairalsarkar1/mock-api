import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ReviewsSection from "@/components/ReviewsSection";
import React from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ReviewsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
