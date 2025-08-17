"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

const SettingsTab = () => {
  const { data: session } = useSession();
  const apiKey = session?.user?.apiKey || null;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (confirmationText.toLowerCase() !== "delete my account") {
      setMessage({
        type: "error",
        text: 'You must type "delete my account" to confirm.',
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.delete("/api/user/delete", {
        headers: { "X-API-KEY": apiKey },
      });

      if (res.data.success) {
        setMessage({ type: "success", text: "Account deleted successfully." });

        setTimeout(() => {
          signOut({ callbackUrl: "/" });
        }, 1200);
      } else {
        setMessage({
          type: "error",
          text: res.data.error || "Failed to delete account.",
        });
      }
    } catch (err: unknown) {
      let errorMsg = "Something went wrong. Please try again.";
      if (axios.isAxiosError(err)) {
        errorMsg = err.response?.data?.error || err.message || errorMsg;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setConfirmationText("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Account Settings
      </h2>

      <div className="space-y-8">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <h3 className="font-bold text-red-600 dark:text-red-400 mb-4">
            Danger Zone
          </h3>
          <div className="space-y-4 flex flex-col items-start gap-2">
            {/* Delete Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={loading}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg border transition duration-200 font-semibold ${
                  loading
                    ? "bg-red-300 text-white border-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white border-red-600"
                }`}
              >
                <Trash2 className="w-4 h-4" />
                {loading ? "Deleting..." : "Delete Account"}
              </button>

              {/* Inline message next to the button */}
              {message && (
                <div
                  className={`inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-800/20 dark:text-green-300 dark:border-green-700"
                      : "bg-red-50 text-red-600 border-red-200 dark:bg-red-800/20 dark:text-red-300 dark:border-red-700"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <p>{message.text}</p>
                </div>
              )}
            </div>

            {/* Warning Box */}
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-800/20 text-red-600 dark:text-red-300 text-sm px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-700 max-w-xl">
              <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
              <p>
                <span className="font-semibold">Warning:</span> Account deletion
                is permanent and will immediately revoke all API access.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[400px] shadow-lg relative border border-gray-200 dark:border-gray-700">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Delete Account
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              This action{" "}
              <span className="font-semibold text-red-600">
                cannot be undone
              </span>
              . Please type{" "}
              <span className="font-semibold">
                &quot;delete my account&quot;
              </span>{" "}
              to confirm.
            </p>

            {/* Input */}
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="delete my account"
              className="w-full px-3 py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-red-400"
            />

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              disabled={
                loading ||
                confirmationText.toLowerCase() !== "delete my account"
              }
              className={`w-full flex justify-center items-center gap-2 px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${
                loading ||
                confirmationText.toLowerCase() !== "delete my account"
                  ? "bg-red-300 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete Account
            </button>

            {/* Optional inline error/success */}
            {message && (
              <div
                className={`mt-3 text-sm flex items-center gap-2 ${
                  message.type === "success"
                    ? "text-green-700 dark:text-green-300"
                    : "text-red-600 dark:text-red-300"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                <span>{message.text}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
