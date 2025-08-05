"use client";

import { useEffect, useState } from "react";
import { Star, Quote, Heart, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    company: "TechStart Inc.",
    content:
      "DataForge has completely transformed how we prototype applications. The realistic data makes our demos feel authentic and helps stakeholders understand the vision immediately.",
    rating: 5,
    from: "#3b82f6",
    to: "#06b6d4",
    glow: "rgba(59,130,246,0.2)",
    border: "#3b82f650",
  },
  {
    name: "Marcus Rodriguez",
    role: "Full Stack Engineer",
    company: "InnovateNow",
    content:
      "The API response times are incredible, and the data quality is unmatched. We've been able to focus entirely on our application logic instead of worrying about test data.",
    rating: 5,
    from: "#a855f7",
    to: "#ec4899",
    glow: "rgba(168,85,247,0.2)",
    border: "#a855f750",
  },
  {
    name: "Emma Thompson",
    role: "Product Manager",
    company: "Digital Solutions Co.",
    content:
      "What impressed me most is how easy it was to integrate. Our entire team was up and running within minutes, and the documentation is crystal clear.",
    rating: 5,
    from: "#10b981",
    to: "#22c55e",
    glow: "rgba(16,185,129,0.2)",
    border: "#10b98150",
  },
  {
    name: "David Kim",
    role: "Backend Developer",
    company: "CloudTech Systems",
    content:
      "The variety of endpoints available is fantastic. Whether we need user data, e-commerce products, or social media posts, DataForge has exactly what we need.",
    rating: 5,
    from: "#f97316",
    to: "#ef4444",
    glow: "rgba(249,115,22,0.2)",
    border: "#f9731650",
  },
  {
    name: "Lisa Wang",
    role: "Tech Lead",
    company: "StartupHub",
    content:
      "DataForge has become an essential part of our development workflow. The consistent data structure and reliability have significantly improved our testing process.",
    rating: 5,
    from: "#6366f1",
    to: "#a855f7",
    glow: "rgba(99,102,241,0.2)",
    border: "#6366f150",
  },
  {
    name: "James Miller",
    role: "Mobile Developer",
    company: "AppCraft Studios",
    content:
      "The mobile-optimized responses and fast loading times make DataForge perfect for our React Native applications. It's exactly what we needed.",
    rating: 5,
    from: "#f43f5e",
    to: "#ec4899",
    glow: "rgba(244,63,94,0.2)",
    border: "#f43f5e50",
  },
];

const ReviewsSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background floating blur bubbles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#f43f5e20] rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-10 w-40 h-40 bg-[#3b82f620] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#a855f720] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center text-[#f87171] border border-[#fca5a5] bg-[#fca5a5]/10 text-sm px-3 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Customer Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Loved by{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #6366f1, #ec4899)",
              }}
            >
              thousands of developers
            </span>
          </h2>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Join the growing community of developers who trust DataForge to
            accelerate development.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-full px-4">
                <div
                  className="rounded-xl p-8 transition-transform duration-500 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(to bottom right, ${t.from}33, ${t.to}33)`,
                    border: `1px solid ${t.border}`,
                    boxShadow: `0 0 30px ${t.glow}`,
                    backdropFilter: "blur(10px)",
                    position: "relative",
                  }}
                >
                  {/* shimmer */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                          style={{
                            backgroundColor: `${t.from}33`,
                            border: `1px solid ${t.border}`,
                          }}
                        >
                          <Quote
                            className="w-6 h-6"
                            style={{ color: t.from }}
                          />
                        </div>
                        <Sparkles
                          className="w-5 h-5"
                          style={{ color: t.from + "99" }}
                        />
                      </div>
                      <div className="flex">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="w-4 h-4 fill-[#facc15] text-[#facc15]"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-[#6b7280] text-sm lg:text-base leading-relaxed mb-6">
                      {t.content}
                    </p>

                    <div
                      className="border-t pt-4"
                      style={{ borderColor: "#d1d5db50" }}
                    >
                      <div className="font-bold text-[#111827]">{t.name}</div>
                      <div className="text-sm text-[#6b7280]">
                        {t.role} at{" "}
                        <span className="font-medium">{t.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Manual nav (optional) */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  current === idx ? "bg-[#ec4899]" : "bg-[#d1d5db]"
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
