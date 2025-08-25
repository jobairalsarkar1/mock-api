"use client";
import { useEffect, useState, useRef } from "react";
import {
  Shield,
  Lock,
  Eye,
  Share2,
  Key,
  Mail,
  CheckCircle,
  ChevronRight,
  User,
  Server,
  Bell,
  Trash2,
  Download,
} from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";

const sections = [
  {
    id: "information",
    title: "Information We Collect",
    icon: <Shield size={20} />,
  },
  { id: "usage", title: "How We Use Information", icon: <Eye size={20} /> },
  { id: "sharing", title: "Information Sharing", icon: <Share2 size={20} /> },
  { id: "security", title: "Data Security", icon: <Lock size={20} /> },
  { id: "rights", title: "Your Rights", icon: <Key size={20} /> },
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
              Privacy{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 dark:from-orange-200 dark:via-orange-500 dark:to-orange-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Index - Sticky Navigation */}
            <aside className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                  <Lock size={20} /> Policy Sections
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
                id="information"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Shield
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Information We Collect</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  We collect information you provide directly to us, such as
                  when you create an account, use our services, or contact us
                  for support.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <User
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Account information:</strong> Name, email address,
                      password
                    </span>
                  </li>
                  <li className="flex items-start">
                    <User
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Profile information:</strong> Information you
                      choose to provide in your profile
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Mail
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Communications:</strong> Support messages,
                      feedback, and other communications with us
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Server
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Usage data:</strong> Analytics and usage patterns
                      to improve our services
                    </span>
                  </li>
                </ul>
              </div>

              <div
                id="usage"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Eye
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">
                    How We Use Your Information
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  We use the information we collect to provide, maintain, and
                  improve our services:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      To provide and operate our services
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      To communicate with you about our services
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      To improve and personalize your experience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      To detect and prevent fraud or abuse
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      To comply with legal obligations
                    </span>
                  </li>
                </ul>
              </div>

              <div
                id="sharing"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Share2
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Information Sharing</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties, except in the following
                  circumstances:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      With your explicit consent
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      To comply with legal requirements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      To protect our rights and safety
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      With trusted service providers who assist our operations
                    </span>
                  </li>
                </ul>
              </div>

              <div
                id="security"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Lock
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Data Security</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. These include encryption, access
                  controls, and regular security assessments. However, no method
                  of transmission over the internet is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </div>

              <div
                id="rights"
                className="scroll-mt-24 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Key
                      size={24}
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Your Rights</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  You have the right to:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Eye size={18} className="text-orange-500" />
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Access Information
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Request access to the personal information we hold about
                      you.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-2">
                      <User size={18} className="text-orange-500" />
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Update Information
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Update or correct your information if it&apos;s
                      inaccurate.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Trash2 size={18} className="text-orange-500" />
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Delete Account
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Delete your account and associated data from our systems.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Bell size={18} className="text-orange-500" />
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Opt Out
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Opt out of marketing communications at any time.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-2">
                      <Download size={18} className="text-orange-500" />
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Data Portability
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Request a copy of your data in a machine-readable format.
                    </p>
                  </div>
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
                  Have questions about our privacy practices or your personal
                  data? We&apos;re here to help.
                </p>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Email us at:
                  </p>
                  <a
                    href="mailto:privacy@placeapi.site"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                  >
                    <Mail size={18} />
                    <span>privacy@placeapi.site</span>
                  </a>

                  {/* <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: January 15, 2024
                  </p> */}
                  <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
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
