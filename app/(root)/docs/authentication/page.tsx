import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import Link from "next/link";

export default function Authentication() {
  return (
    <div className="prose dark:prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Authentication
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        All API requests require authentication using your API key.
      </p>

      {/* Using API Key */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Using Your API Key
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Include your API key in the request headers:
      </p>

      <div className="mt-2">
        <CodeBlock language="javascript">
          {dedent(`
            fetch('https://api.dataforge.dev/users', {
              headers: {
                'X-API-KEY': 'your_api_key_here'
              }
            })
          `)}
        </CodeBlock>
      </div>

      {/* Error Handling */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Error Handling
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        API requests must include a valid API key in the{" "}
        <code className="bg-gray-300 dark:bg-gray-700 px-1.5 py-1 rounded">
          x-api-key
        </code>{" "}
        header. If the key is missing or invalid, the API will return a JSON
        error response:
      </p>

      {/* Missing API key */}
      <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold">
        Missing API key:
      </p>
      <div className="mt-2">
        <CodeBlock language="json" showCopy={false}>
          {dedent(`
            {
              "error": "Missing API key",
              "status": 401
            }
          `)}
        </CodeBlock>
      </div>

      {/* Invalid API key */}
      <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold">
        Invalid API key:
      </p>
      <div className="mt-2">
        <CodeBlock language="json" showCopy={false}>
          {dedent(`
            {
              "error": "Invalid API key",
              "status": 403
            }
          `)}
        </CodeBlock>
      </div>

      {/* Best Practices */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Best Practices
      </h2>
      <ul className="space-y-1.5 text-gray-600 dark:text-gray-300">
        <li className="flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full flex-shrink-0"></span>
          Never expose your API key in client-side code
        </li>
        <li className="flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full flex-shrink-0"></span>
          Store keys in environment variables
        </li>
        <li className="flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full flex-shrink-0"></span>
          Rotate keys regularly
        </li>
      </ul>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 gap-4">
        <Link
          href="/docs"
          className="inline-block bg-gray-900 text-white dark:bg-gray-100 dark:text-black px-5 py-2 rounded-md shadow hover:opacity-90 transition"
        >
          Back to Docs
        </Link>
        <Link
          href="/users"
          className="inline-block bg-gray-900 text-white dark:bg-gray-100 dark:text-black px-5 py-2 rounded-md shadow hover:opacity-90 transition"
        >
          Go to Your API
        </Link>
      </div>
    </div>
  );
}
