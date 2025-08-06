import {
  FolderCode,
  GitPullRequestArrow,
  MoveRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import CustomBadge from "./CustomBadge";
import dedent from "dedent";
import CodeBlock from "./CodeBlock";

const HeroSection = () => {
  return (
    <section className="relative py-14 flex items-center justify-center bg-[#0e0e10] text-white overflow-hidden">
      {/* Radial background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] z-0"></div>

      {/* Blurred Pulsing Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse [animation-delay:0.1s]"></div>
      <div className="absolute bottom-1.5/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-3xl opacity-20 animate-pulse [animation-delay:0.3s]"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-yellow-500 via-orange-400 to-red-400 rounded-full blur-2xl opacity-25 animate-pulse [animation-delay:0.1s] -translate-x-1/2 -translate-y-1/2"></div>

      {/* Small blinking dots */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute w-2 h-2 bg-blue-500/100 rounded-full animate-pulse [animation-delay:0s] left-[20%] top-[30%]"></div>
        <div className="absolute w-2 h-2 bg-orange-500/100 rounded-full animate-pulse [animation-delay:0.5s] left-[60%] top-[10%]"></div>
        <div className="absolute w-2 h-2 bg-green-500/100 rounded-full animate-pulse [animation-delay:1s] left-[80%] top-[50%]"></div>
        <div className="absolute w-2 h-2 bg-yellow-500/100 rounded-full animate-pulse [animation-delay:1.5s] left-[40%] top-[70%]"></div>
        <div className="absolute w-2 h-2 bg-red-500/100 rounded-full animate-pulse [animation-delay:2s] left-[10%] top-[60%]"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <CustomBadge icon={Sparkles} text="Dummy Data APIs for Developers" />

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          Build Faster with{" "}
          <span className="bg-gradient-to-r from-orange-200 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Mock APIs
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto mb-10">
          Skip the backend setup. Get realistic dummy data instantly with our
          RESTful APIs. Perfect for frontend development, prototyping, and
          testing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/account"
            className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg rounded-lg hover:scale-105 transition"
          >
            Start Building
            <MoveRight className="w-6 h-6" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-3 px-6 py-2 border border-orange-600/80 text-gray-300 text-lg rounded-lg hover:bg-orange-600/10 transition"
          >
            <FolderCode className="w-6 h-6" />
            View Docs
          </Link>
        </div>

        {/* Code Example Box */}
        <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:scale-105">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-auto text-sm text-gray-400">GET Request</span>
          </div>
          <pre className="text-sm text-gray-100 text-left font-mono selection:bg-orange-500/30">
            <CodeBlock>
              {dedent(`fetch('https://api.dataforge.dev/users')
  .then(res => res.json())
  .then(data => console.log(data));`)}
            </CodeBlock>
          </pre>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28 max-w-4xl mx-auto">
          {[
            { label: "API Endpoints", value: "50+", icon: Zap },
            {
              label: "Requests/Month",
              value: "10M+",
              icon: GitPullRequestArrow,
            },
            { label: "Happy Developers", value: "25K+", icon: FolderCode },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-tl from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-white/90 mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
