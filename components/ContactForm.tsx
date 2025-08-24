"use client";

import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await axios.post("/api/contact", formData);
      setStatus("Message Received! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-md p-6 flex flex-col gap-4 w-full"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <textarea
        name="message"
        placeholder="Your message"
        rows={5}
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-500 font-medium rounded-lg transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </div>
        ) : (
          "Submit"
        )}
      </button>

      {status && (
        <p className="text-sm mt-2 text-center text-gray-600 dark:text-gray-400">
          {status}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
