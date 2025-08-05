"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import CustomBadge from "./CustomBadge";

const faqs = [
  {
    question: "How do I get started with DataForge?",
    answer:
      "Simply sign up for a free account and you'll receive your API key instantly. You can start making requests immediately with our comprehensive documentation and examples.",
  },
  {
    question: "Is the data realistic and production-ready?",
    answer:
      "Yes! Our dummy data is carefully crafted to be realistic and comprehensive. It includes proper relationships, realistic values, and follows industry standards for data structures.",
  },
  {
    question: "Can I use DataForge in production?",
    answer:
      "DataForge is designed for development, testing, and prototyping. For production applications, you'll want to replace our endpoints with your actual backend APIs.",
  },
  {
    question: "What happens when I hit the rate limits?",
    answer:
      "When you reach your plan's rate limit, requests will return a 429 status code. You can upgrade your plan for higher limits or wait for the limit to reset.",
  },
  //   {
  //     question: "Do you offer custom data structures?",
  //     answer:
  //       "Yes! Enterprise customers can request custom endpoints and data structures tailored to their specific needs. Contact our sales team to discuss your requirements.",
  //   },
  {
    question: "Is my API key secure?",
    answer:
      "Absolutely. Your API key is encrypted and should be kept confidential. Never expose it in client-side code. Use environment variables and follow security best practices.",
  },
  //   {
  //     question: "Can I cancel my subscription anytime?",
  //     answer:
  //       "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period, and you can always downgrade to our free tier.",
  //   },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-20 bg-[#0e0e10] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <CustomBadge icon={HelpCircle} text="FAQ" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-orange-200 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about DataForge APIs.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AccordionItem key={index} {...{ faq, isOpen, toggle, index }} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({
  faq,
  isOpen,
  toggle,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  toggle: (index: number) => void;
  index: number;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg backdrop-blur-md transition-all">
      <button
        onClick={() => toggle(index)}
        className="w-full flex justify-between items-center px-6 py-5 text-left text-white font-semibold hover:bg-orange-600/15 transition"
      >
        {faq.question}
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out text-sm text-gray-400 px-6"
        style={{ height: `${height}px` }}
      >
        <div className="py-4">{faq.answer}</div>
      </div>
    </div>
  );
};

export default FAQSection;
