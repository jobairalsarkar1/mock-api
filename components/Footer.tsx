"use client";

import Link from "next/link";
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Code,
  Heart,
  Network,
} from "lucide-react";
import CustomBadge from "./CustomBadge";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [buttonText, setButtonText] = useState("Subscribe");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      await axios.post("/api/subscribe", { email });

      setSubscribed(true);
      setButtonText("Subscribed!");
      setEmail("");

      // Reset button after 2 seconds
      setTimeout(() => {
        setSubscribed(false);
        setButtonText("Subscribe");
      }, 2000);
    } catch (error) {
      console.error("Subscription failed:", error);

      setSubscribed(true);
      setButtonText("Subscribed!");
      setEmail("");
      setTimeout(() => {
        setSubscribed(false);
        setButtonText("Subscribe");
      }, 2000);
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-[#0e0e10] text-gray-900 dark:text-white/90 pt-24">
      {/* CTA Section */}
      <div className="text-center px-4">
        <CustomBadge icon={Code} text="Ready to Build?" />
        <h2 className="text-3xl md:text-4xl text-gray-800 dark:text-white/90 font-bold mb-4">
          Start Building with{" "}
          <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 dark:from-orange-200 dark:via-orange-500 dark:to-orange-600 bg-clip-text text-transparent">
            DataForge Today
          </span>
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Join thousands of developers who trust DataForge for rapid prototyping
          and development.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link
            href="/account"
            className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg rounded-lg hover:scale-105 transition"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-3 px-6 py-2 border border-orange-500/80 dark:border-orange-600/80 text-gray-700 dark:text-gray-300 text-lg rounded-lg hover:bg-orange-100 dark:hover:bg-orange-600/10 transition"
          >
            View Documentation
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 pb-12 lg:pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">DataForge</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-sm">
              Realistic dummy APIs for modern developers. Build faster, iterate
              quicker, and focus on what matters most.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition text-sm"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Get the latest updates and dev tips straight to your inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className={`px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm hover:scale-105 transition ${
                  subscribed ? "scale-105" : ""
                }`}
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 h-px bg-orange-600/40"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 text-center">
          <p>© {currentYear} DataForge. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-orange-500 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-orange-500 transition">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-orange-500 transition">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for
            developers, hope you enjoy it!
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
