"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Quote,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserStar,
} from "lucide-react";
import CustomBadge from "./CustomBadge";
import { testimonials } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

function getVisibleSlides(width: number) {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

export default function ReviewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const updateVisibleSlides = () => {
      setVisibleSlides(getVisibleSlides(window.innerWidth));
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  const maxSlide = Math.ceil(testimonials.length / visibleSlides) - 1;

  const next = () => setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <section className="pt-20 pb-8 relative bg-white dark:bg-[#0e0e10] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0e0e10] dark:to-[#1a1a1d] opacity-50 pointer-events-none" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-pink-200 dark:bg-pink-500/60 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-200 dark:bg-blue-500/70 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-200 dark:bg-purple-500/80 rounded-full blur-3xl animate-pulse [animation-delay:3s]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <CustomBadge icon={UserStar} text="Customer Stories" />
          <SectionHeading
            title="Loved by Thousands of"
            highlight="Developers"
            description="Join the growing community of developers who trust PlaceAPI"
          />
        </div>

        {/* Carousel */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentSlide * 100) / visibleSlides}%)`,
              width: `${(100 * testimonials.length) / visibleSlides}%`,
            }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="p-4"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div
                  className={`h-full p-6 rounded-2xl ${t.gradient} ${t.glow} ${t.border} backdrop-blur-xl transition-all shadow-sm`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${t.iconBg} border border-blue-200 dark:border-white/20`}
                      >
                        <Quote className="w-5 h-5 text-blue-500 dark:text-white/80" />
                      </div>
                      <Sparkles className="w-4 h-4 text-blue-300 dark:text-white/40" />
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote
                    className={`${t.textColor} mb-4 text-sm leading-relaxed`}
                  >
                    &quot;{t.content}&quot;
                  </blockquote>
                  <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                    <div className={`font-semibold ${t.textColor}`}>
                      {t.name}
                    </div>
                    <div
                      className={`text-sm ${t.textColor.replace("700", "600")}`}
                    >
                      {t.role} at{" "}
                      <span className="font-medium">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 border border-orange-400 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={currentSlide === maxSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 border border-orange-400 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
