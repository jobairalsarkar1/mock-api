"use client";

import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Timer,
  User,
} from "lucide-react";

const COOLDOWN_SECONDS = 30;

const MagicLinkForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const { name, email } = formData;

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || cooldown > 0) return;

    if (!email || !name || name.trim().length < 2) {
      setMessage({ text: "Please enter valid name and email", type: "error" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await signIn("resend", {
        email,
        name,
        redirect: false,
      });

      if (result?.error) {
        setMessage({
          text: result.error || "Failed to send magic link",
          type: "error",
        });
      } else {
        setMessage({
          text: `Login link sent to ${email}. Check your inbox!`,
          type: "success",
        });
        setCooldown(COOLDOWN_SECONDS);
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          required
          className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent border border-white/20 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          required
          className="w-full pl-10 pr-4 py-2 rounded-md bg-transparent border border-white/20 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white placeholder:text-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading || cooldown > 0}
        className="w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : cooldown > 0 ? (
          <Timer className="h-4 w-4" />
        ) : null}
        {loading
          ? "Sending..."
          : cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Send Magic Link"}
      </button>

      {message && (
        <div
          className={`p-3 rounded-md flex items-start gap-2 max-w-full ${
            message.type === "success"
              ? "bg-green-900/30 text-green-400"
              : "bg-red-900/30 text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 mt-1 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 mt-1 flex-shrink-0" />
          )}
          <span className="min-w-0 break-words whitespace-pre-wrap">
            {message.text}
          </span>
        </div>
      )}
    </form>
  );
};

export default MagicLinkForm;
