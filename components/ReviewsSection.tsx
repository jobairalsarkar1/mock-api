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
    <section className="pt-20 pb-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10] to-[#1a1a1d] opacity-50 pointer-events-none" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-pink-500/60 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-500/70 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/80 rounded-full blur-3xl animate-pulse [animation-delay:3s]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <CustomBadge icon={UserStar} text="Customer Stories" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Thousands of{" "}
            <span className="bg-gradient-to-r from-orange-200 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Developers
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Join the growing community of developers who trust DataForge.
          </p>
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
                  className={`h-full p-6 rounded-2xl ${t.gradient} ${t.glow} ${t.border} backdrop-blur-xl transition-all`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20">
                        <Quote className="w-5 h-5 text-white/80" />
                      </div>
                      <Sparkles className="w-4 h-4 text-white/40" />
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
                  <blockquote className="text-white/80 mb-4 text-sm leading-relaxed">
                    &quot;{t.content}&quot;
                  </blockquote>
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-white/60">
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={currentSlide === maxSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
