import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import { ArrowRight, ExternalLink } from "lucide-react";
import DocsNavigator from "@/components/DocsNavigator";

export default function Docs() {
  return (
    <div className="prose prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Documentation
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Welcome to the PlaceAPI API documentation. This guide will help you
        integrate with our services.
      </p>

      <div className="border-t border-gray-200 dark:border-gray-800 my-6"></div>

      {/* Getting Started */}
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Getting Started
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Make your first API request to test your connection:
      </p>

      <div className="mt-2">
        <CodeBlock language="javascript">
          {dedent(`
            fetch('https://api.placeapi.site/v1/ping', {
              headers: {
                'x-api-key': 'YOUR_API_KEY'
              }
            })
            .then(response => response.json())
            .then(data => console.log(data));
          `)}
        </CodeBlock>
      </div>

      {/* Next Steps */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Next Steps
      </h2>
      <ul className="text-gray-600 dark:text-gray-300 space-y-2">
        <li>
          Explore the{" "}
          <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 underline cursor-pointer">
            API reference
            <ArrowRight className="h-4 w-4" />
          </span>{" "}
          in the sidebar.
        </li>
        <li>
          Get your API key in your{" "}
          <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 underline cursor-pointer">
            Account
            <ExternalLink className="h-4 w-4" />
          </span>
          . (You must be signed in to access your API key.)
        </li>
      </ul>

      {/* Support */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Support
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Need help? Reach out to us:
      </p>
      <ul className="text-gray-600 dark:text-gray-300 space-y-1">
        <li>
          Email:{" "}
          <a
            href="mailto:support@placeapi.site"
            className="text-gray-800 dark:text-gray-200 underline"
          >
            support@placeapi.site
          </a>
        </li>
        {/* <li>
          Community Forum:{" "}
          <a href="#" className="text-gray-800 dark:text-gray-200 underline">
            forum.placeapi.site
          </a>
        </li> */}
      </ul>

      {/* Next Page Button */}
      <DocsNavigator
        next={{ href: "/docs/authentication", label: "Authentication" }}
      />
    </div>
  );
}
