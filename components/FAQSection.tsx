"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import CustomBadge from "./CustomBadge";
import { faqs } from "@/lib/constants";

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
