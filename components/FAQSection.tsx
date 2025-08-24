"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import CustomBadge from "./CustomBadge";
import { faqs } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-20 bg-gray-50 dark:bg-[#0e0e10] text-gray-900 dark:text-white/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <CustomBadge icon={HelpCircle} text="FAQ" />
          <SectionHeading
            title="Frequently Asked"
            highlight="Questions"
            description="Everything you need to know about PlaceAPI APIs."
          />
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
    <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg backdrop-blur-md transition-all shadow-sm dark:shadow-none">
      <button
        onClick={() => toggle(index)}
        className="w-full flex justify-between items-center px-6 py-5 text-left text-gray-800 dark:text-white font-semibold hover:bg-orange-100 dark:hover:bg-orange-600/15 transition"
      >
        {faq.question}
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-300 text-gray-500 dark:text-white ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out text-sm text-gray-600 dark:text-gray-400 px-6"
        style={{ height: `${height}px` }}
      >
        <div className="py-4">{faq.answer}</div>
      </div>
    </div>
  );
};

export default FAQSection;
