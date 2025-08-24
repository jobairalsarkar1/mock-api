"use client";
import { useState, useEffect } from "react";
import {
  Key,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import CodeBlock from "../CodeBlock";
import dedent from "dedent";
import { useSession } from "next-auth/react";
import axios from "axios";

const ApiKeys = () => {
  const { data: session, update } = useSession();
  const [currentKey, setCurrentKey] = useState(session?.user?.apiKey || "");
  const [copiedKey, setCopiedKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (session?.user?.apiKey) setCurrentKey(session.user.apiKey);
  }, [session?.user?.apiKey]);

  const maskedKey = currentKey
    ? `df_live_${"*".repeat(currentKey.length - 8)}`
    : "df_live_********";

  const copyApiKey = () => {
    if (!currentKey) return;
    navigator.clipboard.writeText(currentKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const regenerateKey = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { data } = await axios.post("/api/generate-key");

      setCurrentKey(data.apiKey);

      await update({ apiKey: data.apiKey });

      setShowKey(false);
      setSuccessMsg("API key regenerated successfully!");
      setTimeout(() => setSuccessMsg(null), 30000);
    } catch (error) {
      console.error("Failed to regenerate API key:", error);
      setErrorMsg("Failed to regenerate API key. Please try again.");
      setTimeout(() => setErrorMsg(null), 30000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        API Key Management
      </h2>

      {/* API Key Display */}
      <div className="bg-gray-100 dark:bg-gray-950 rounded-lg px-4 py-3 sm:px-5 sm:py-3.5 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Key className="text-orange-500 flex-shrink-0" />
            <code className="font-mono text-gray-800 dark:text-gray-300 text-sm sm:text-base truncate">
              {showKey ? currentKey : maskedKey}
            </code>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowKey(!showKey)}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-colors text-gray-900 dark:text-white"
            >
              {showKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              <span>{showKey ? "Hide" : "View"}</span>
            </button>

            <button
              onClick={copyApiKey}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-colors cursor-pointer text-gray-900 dark:text-white"
            >
              {copiedKey ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Regenerate Button + Messages */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={regenerateKey}
          disabled={loading}
          className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm transition-colors duration-200 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Regenerating..." : "Regenerate Key"}
        </button>

        {errorMsg && (
          <div className="inline-flex items-start gap-2 text-sm text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 px-3 py-1.5 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="inline-flex items-start gap-2 text-sm text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800/50 px-3 py-1.5 rounded-lg">
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{successMsg}</p>
          </div>
        )}
      </div>

      {/* Warning message */}
      <div className="inline-flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800/50 px-3 py-1.5 rounded-lg mb-6">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          Regenerating your API key will invalidate your previous key. Make sure
          to update any applications using it.
        </p>
      </div>

      {/* Usage Instructions */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
          Usage Instructions
        </h3>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
          <CodeBlock language="javascript">
            {dedent(`fetch('https://api.placeapi.site/endpoint', {
  headers: { 'X-API-KEY': '${currentKey}' }
})`)}
          </CodeBlock>
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800/50 px-3 py-1.5 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>
            Keep your API key secure. Do not expose it in client-side code or
            version control. Consider using environment variables in production.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
