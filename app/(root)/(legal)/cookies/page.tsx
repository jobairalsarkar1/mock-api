"use client";
import { useEffect, useState, useRef } from "react";
import {
  Shield,
  Cookie,
  Settings,
  Mail,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Clock,
} from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { cookieDetails } from "@/lib/constants";

const sections = [
  { id: "why", title: "Why We Use Cookies", icon: <Shield size={20} /> },
  { id: "types", title: "Types of Cookies", icon: <Cookie size={20} /> },
  { id: "managing", title: "Managing Cookies", icon: <Settings size={20} /> },
  { id: "contact", title: "Contact Us", icon: <Mail size={20} /> },
];

const Page = () => {
  const [active, setActive] = useState(sections[0].id);
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const addToRefs = (el: HTMLElement | null) => {
      if (el && !sectionRefs.current.includes(el)) {
        sectionRefs.current.push(el);
      }
    };

    // Add refs to all sections
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) addToRefs(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );

    // Take a snapshot of the refs at this moment
    const refsSnapshot = [...sectionRefs.current];

    refsSnapshot.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      refsSnapshot.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <section className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0e0e10] text-gray-900 dark:text-white/90 px-6 lg:px-12 py-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cookie{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 dark:from-orange-200 dark:via-orange-500 dark:to-orange-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We value your privacy. This policy explains how we use cookies and
              similar technologies to enhance your experience.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Index - Sticky Navigation */}
            <aside className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                  <Settings size={20} /> Policy Sections
                </h2>
                <nav className="space-y-4">
                  {sections.map((s) => (
                    <Link
                      key={s.id}
                      href={`#${s.id}`}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                        active === s.id
                          ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-md"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                      onClick={() => setActive(s.id)}
                    >
                      <span
                        className={`p-2 rounded-full transition-all ${active === s.id ? "bg-orange-100 dark:bg-orange-900/30" : "bg-gray-100 dark:bg-gray-700"}`}
                      >
                        {s.icon}
                      </span>
                      <span className="font-medium">{s.title}</span>
                      <ChevronRight
                        size={16}
                        className={`ml-auto transition-transform ${active === s.id ? "rotate-90" : "opacity-0"}`}
                      />
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Content */}
            <div className="lg:w-3/4 space-y-16">
              <div
                id="why"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Shield
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Why We Use Cookies</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Cookies help us provide a secure and seamless experience for
                  our users. We utilize them for:
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Secure authentication using OAuth with Google, GitHub, and
                      Magic Link
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Remembering your preferences and settings across sessions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Analyzing traffic patterns to improve our services and
                      performance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Personalizing content to match your interests and needs
                    </span>
                  </li>
                </ul>
              </div>

              <div
                id="types"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Cookie
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">
                    Types of Cookies We Use
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                      Essential Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Required for authentication, security, and core
                      functionality. Cannot be disabled.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                      Performance Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Help us understand how visitors interact with our website
                      to improve user experience.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                      Functional Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Remember your preferences like theme, and other
                      customization options.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                      Marketing Cookies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Used to track campaign performance and deliver relevant
                      advertisements.
                    </p>
                  </div>
                </div>

                {/* Detailed Cookie Table */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                    <Clock size={20} className="text-orange-500" /> Detailed
                    Cookie Information
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          <th className="p-3 text-left font-semibold">
                            Category
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Cookie Name
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Purpose
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cookieDetails.map((category, categoryIndex) =>
                          category.cookies.map((cookie, cookieIndex) => (
                            <tr
                              key={`${categoryIndex}-${cookieIndex}`}
                              className="border-b border-gray-200 dark:border-gray-700 even:bg-gray-50 dark:even:bg-gray-800/50"
                            >
                              {cookieIndex === 0 && (
                                <td
                                  className="p-3 font-medium align-top"
                                  rowSpan={category.cookies.length}
                                >
                                  {category.category}
                                </td>
                              )}
                              <td className="p-3 font-mono text-sm">
                                {cookie.name}
                              </td>
                              <td className="p-3">{cookie.purpose}</td>
                              <td className="p-3">{cookie.duration}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div
                id="managing"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Settings
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Managing Cookies</h2>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl mb-8">
                  <h3 className="font-semibold text-lg mb-3 text-orange-800 dark:text-orange-300">
                    Browser Settings
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You can control cookies through your browser settings. Most
                    browsers allow you to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>View and delete existing cookies</li>
                    <li>Block cookies from specific sites or all sites</li>
                    <li>Set preferences for different types of cookies</li>
                  </ul>

                  <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium mb-2">Quick Links:</h4>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Chrome
                      </a>
                      <span className="text-gray-400">•</span>
                      <a
                        href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Firefox
                      </a>
                      <span className="text-gray-400">•</span>
                      <a
                        href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Safari
                      </a>
                      <span className="text-gray-400">•</span>
                      <a
                        href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Edge
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3 text-orange-800 dark:text-orange-300 flex items-center gap-2">
                    <AlertCircle size={20} className="text-orange-500" />{" "}
                    Important Note
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Disabling essential cookies may prevent you from logging in
                    or using key features of our website. Performance and
                    functionality may also be affected when restricting other
                    types of cookies.
                  </p>
                </div>
              </div>

              <div
                id="contact"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Mail
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                  Have questions about our use of cookies or privacy practices?
                  We&apos;re here to help.
                </p>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                  >
                    <Mail size={18} />
                    <span>Contact Us</span>
                  </a>

                  <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    Last updated:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
