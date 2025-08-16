"use client";
import React, { useState } from "react";
import axios from "axios";
import { AlertCircle, Play, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ApiSimulatorProps {
  endpoint: string;
  apiKey: string | null;
}

export default function ApiSimulator({ endpoint, apiKey }: ApiSimulatorProps) {
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleTryIt = async () => {
    if (!apiKey) return;
    setLoading(true);
    setResponse(null);

    try {
      const baseUrl = "https://api.dataforge.dev";
      const relativeEndpoint = endpoint.replace(baseUrl, "");

      const { data } = await axios.get(relativeEndpoint, {
        headers: { "X-API-KEY": apiKey },
      });
      setResponse(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setResponse(err.response?.data ?? { error: "Request failed" });
      } else {
        setResponse({ error: "Request failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        {/* API Endpoint Box */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-950 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full sm:w-auto">
          <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-mono">
            GET
          </span>
          <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
            {endpoint}
          </code>
        </div>

        {/* Try it button */}
        <button
          onClick={handleTryIt}
          disabled={!apiKey || loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-sm transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Trying...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Try It
            </>
          )}
        </button>
      </div>

      {/* Warning if no API key */}
      {!apiKey && (
        <div className="inline-flex items-start gap-2 text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/40 px-3 py-2 rounded-md text-sm max-w-max">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="flex gap-2">
            <p className="m-0">
              You need to be signed in to access your API key and test this API
              request.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
            >
              Sign In
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* API Response */}
      {response && (
        <div className="bg-white dark:bg-gray-950 mt-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 text-sm max-h-64 overflow-y-auto">
          <pre className="text-gray-800 dark:text-gray-200">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
