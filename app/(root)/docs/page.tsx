import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";

export default function Docs() {
  return (
    <div className="prose prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Documentation</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Welcome to the DataForge API documentation. This guide will help you
        integrate with our services.
      </p>

      <div className="border-t border-gray-200 dark:border-gray-800 my-8"></div>

      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Getting Started</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Make your first API request to test your connection:
      </p>

      <div className="mt-2">
        <CodeBlock language="javascript">
          {dedent(`
          fetch('https://api.dataforge.dev/v1/ping', {
            headers: {
              'Authorization': 'Bearer YOUR_API_KEY'
            }
          })
          .then(response => response.json())
          .then(data => console.log(data));
        `)}
        </CodeBlock>
      </div>

      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">Next Steps</h2>
      <ul className="text-gray-600 dark:text-gray-300 space-y-2">
        <li>Explore the API reference in the sidebar</li>
        <li>Generate your API keys in the dashboard</li>
        <li>Check out our SDKs for easier integration</li>
      </ul>
    </div>
  );
}
