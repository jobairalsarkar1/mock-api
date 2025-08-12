import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";

export default function Authentication() {
  return (
    <div className="prose dark:prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Authentication
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        All API requests require authentication using your API key.
      </p>

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

      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Best Practices
      </h2>
      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
        <li>Never expose your API key in client-side code</li>
        <li>Store keys in environment variables</li>
        <li>Rotate keys regularly</li>
      </ul>
    </div>
  );
}
