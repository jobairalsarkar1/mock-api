"use client";

import React from "react";
import {
  Github,
  Mail,
  Lock,
  LogIn,
  Flame,
  ShieldCheck,
  DatabaseZap,
} from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#05070d] text-white relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[800px] bg-gradient-to-br from-orange-700/30 to-orange-900/30 rounded-[10%] -top-40 -left-60 rotate-[-20deg] opacity-60"></div>
        <div className="absolute w-[700px] h-[600px] bg-gradient-to-tr from-orange-500/30 to-orange-700/30 rounded-[8%] -top-20 -right-40 rotate-[30deg] opacity-50"></div>
        <div className="absolute w-[400px] h-[500px] bg-gradient-to-b from-orange-400/30 to-orange-600/30 rounded-[12%] bottom-[-150px] left-1/3 rotate-[15deg] opacity-40"></div>
      </div>

      {/* Left Company Info Section (Visible on md+) */}
      <div className="hidden md:flex flex-col justify-center items-center px-16 w-1/2 z-10 space-y-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-orange-200 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            DataForge
          </span>
        </h2>
        <p className="text-lg text-center text-gray-400 max-w-md mx-auto md:mx-0">
          The ultimate tool for developers to quickly fetch dummy API data.
          Replace real backend hassle with blazing-fast prototyping.
        </p>
        <div className="flex flex-col gap-4 max-w-md mx-auto md:mx-0">
          <Feature icon={DatabaseZap} text="50+ Ready-to-use APIs" />
          <Feature icon={ShieldCheck} text="User-based API key access" />
          <Feature icon={LogIn} text="Easy Auth & Monitoring" />
        </div>
      </div>

      {/* Right Sign-in Form */}
      <div className="flex flex-1 justify-center items-center z-10 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            Sign in
          </h2>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent border border-white/20 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-sm text-orange-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent border border-white/20 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6 space-x-4">
              <button
                type="button"
                className="flex-1 bg-orange-700 hover:bg-orange-600 text-white py-2 rounded-md transition duration-200"
              >
                Create an account
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-md transition duration-200"
              >
                Sign in
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-gray-400">or sign in with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 py-2 rounded-md transition duration-200"
              >
                <Flame className="w-5 h-5 text-orange-600" />
                Google
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-[#171515] hover:bg-black text-white py-2 rounded-md transition duration-200"
              >
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="flex items-center gap-3 text-white/80">
    <div className="bg-orange-600/20 p-2 rounded-full">
      <Icon className="w-5 h-5 text-orange-500" />
    </div>
    <p className="text-sm">{text}</p>
  </div>
);

export default Page;
