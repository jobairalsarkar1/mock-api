import {
  Database,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Globe,
  Code2,
} from "lucide-react";
import CustomBadge from "./CustomBadge";
import { apiCategories } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "Lightning Fast",
    description: "Optimized API endpoints for low-latency responses worldwide",
    icon: Zap,
    border: "border-yellow-400/30",
    hoverShadow: "hover:shadow-[0_0_20px_#facc1599]",
    iconGradient: "from-yellow-400 via-yellow-500 to-yellow-600",
  },
  {
    title: "Production Ready",
    description:
      "Stable and reliable API with careful monitoring for smooth operation",
    icon: Shield,
    border: "border-pink-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#ec489999]",
    iconGradient: "from-pink-500 via-fuchsia-500 to-rose-500",
  },
  {
    title: "Usage Analytics",
    description: "Detailed insights into your API consumption and patterns",
    icon: BarChart3,
    border: "border-orange-400/30",
    hoverShadow: "hover:shadow-[0_0_20px_#fb923c99]",
    iconGradient: "from-orange-500 via-orange-600 to-orange-700",
  },
  {
    title: "Scheduled Updates",
    description: "Data refreshed periodically to ensure relevance and accuracy",
    icon: Clock,
    border: "border-indigo-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#6366f199]",
    iconGradient: "from-indigo-500 via-indigo-600 to-indigo-700",
  },
  {
    title: "Global Access",
    description:
      "Accessible from any domain or app with proper API authentication",
    icon: Globe,
    border: "border-cyan-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#06b6d499]",
    iconGradient: "from-cyan-500 via-blue-500 to-blue-600",
  },
  {
    title: "JSON Response",
    description:
      "API returns data in JSON format for easy integration with your app",
    icon: Code2,
    border: "border-teal-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#14b8a699]",
    iconGradient: "from-teal-500 via-teal-600 to-teal-700",
  },
];

const FeaturesSection = () => {
  return (
    <section className="pt-16 pb-8 px-6 bg-gray-50 dark:bg-[#0e0e10] text-gray-900 dark:text-white/90 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <CustomBadge icon={Database} text="API Categories" />
          <SectionHeading
            title="Everything You Need to"
            highlight="Build & Test"
            description="From user management to e-commerce, our APIs cover all major use
            cases with realistic, structured data."
          />
        </div>

        {/* API Categories Grid */}
        <div className="relative mb-24">
          {/* Centered container with max-width */}
          <div className="flex justify-center">
            {/* Scrollable grid container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[500px] overflow-y-scroll pr-2 hide-scrollbar w-full max-w-4xl">
              {apiCategories.map((cat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-start gap-4 rounded-xl bg-gray-100 dark:bg-white/5 border ${cat.border} backdrop-blur-sm p-6 transition duration-300 ${cat.hoverShadow} w-full h-[380px]`}
                >
                  <div
                    className={`w-16 h-16 flex-shrink-0 bg-gradient-to-br ${cat.iconGradient} rounded-lg flex items-center justify-center`}
                  >
                    <cat.icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex-1">
                      {cat.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {cat.endpoints.map((ep, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                        >
                          /{ep.toLowerCase()}
                        </span>
                      ))}
                    </div>

                    {cat.extraInfo && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {cat.extraInfo}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fog blur */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-[#0e0e10] dark:via-[#0e0e10]/80 pointer-events-none"></div>

          {/* Top fog blur */}
          <div className="absolute top-0 left-0 w-full h-12 lg:h-6 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent dark:from-[#0e0e10] dark:via-[#0e0e10]/80 pointer-events-none"></div>
        </div>

        {/* Features Grid */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Built for Developers, by Developers
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Every feature is designed to make your development experience
            seamless and productive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl bg-gray-100 dark:bg-white/5 border ${feature.border} backdrop-blur-sm p-6 transition duration-300 ${feature.hoverShadow}`}
            >
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.iconGradient} rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
