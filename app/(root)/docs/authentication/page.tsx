import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import ApiSimulator from "@/components/ApiSimulator";
import { auth } from "@/auth";
import DocsNavigator from "@/components/DocsNavigator";

export default async function Authentication() {
  const session = await auth();
  const apiKey = session?.user?.apiKey || null;

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
            fetch('https://api.placeapi.site/api/ping', {
              headers: {
                'X-API-KEY': 'your_api_key'
              }
            })
          `)}
        </CodeBlock>

        {/* Ping API */}
        <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
          Ping API
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Test if your API key is valid and the API is working by trying the
          Ping endpoint:
        </p>

        <ApiSimulator
          endpoint="https://api.placeapi.site/api/ping"
          apiKey={apiKey}
        />
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
      <DocsNavigator
        prev={{ href: "/docs", label: "Introduction" }}
        next={{ href: "/docs/users", label: "Users API" }}
      />
    </div>
  );
}
