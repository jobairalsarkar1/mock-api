import { useState } from "react";
import { Key, Copy, Check, RefreshCw, AlertCircle } from "lucide-react";
import CodeBlock from "./CodeBlock";
import dedent from "dedent";

const ApiKeys = () => {
  const [copiedKey, setCopiedKey] = useState(false);
  const apiKey = "df_live_sk_1234567890abcdef1234567890abcdef";

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        API Key Management
      </h2>

      {/* API Key Display */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 sm:px-5 sm:py-3.5 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Key className="text-orange-500 flex-shrink-0" />
            <code className="font-mono text-gray-800 dark:text-gray-300 text-sm sm:text-base truncate">
              {apiKey}
            </code>
          </div>
          <button
            onClick={copyApiKey}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm flex items-center justify-center gap-2 transition-colors cursor-copy duration-200 flex-shrink-0 text-gray-900 dark:text-white"
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

      {/* Regenerate Button */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm transition-colors duration-200 text-gray-900 dark:text-white">
          <RefreshCw className="w-4 h-4" />
          Regenerate Key
        </button>
      </div>

      {/* Usage Instructions */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
          Usage Instructions
        </h3>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
          <CodeBlock language="javascript">
            {dedent(`fetch('https://api.dataforge.dev/endpoint', {
  headers: {
    'X-API-KEY': '${apiKey}'
  }
})`)}
          </CodeBlock>
        </div>
        <div className="block">
          <div className="inline-flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800/50 px-3 py-1.5 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>
              Keep your API key secure. Do not expose it in client-side code or
              version control. Consider using environment variables in
              production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
