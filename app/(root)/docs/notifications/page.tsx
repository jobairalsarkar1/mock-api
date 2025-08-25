import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import ApiSimulator from "@/components/ApiSimulator";
import { auth } from "@/auth";
import DocsNavigator from "@/components/DocsNavigator";

const Page = async () => {
  const session = await auth();
  const apiKey = session?.user?.apiKey || null;

  // API endpoints for notifications
  const endpoints = [
    {
      title: "Get All Notifications",
      path: "/api/notifications",
      description:
        "Retrieve a paginated list of dummy notifications for users.",
      example: `fetch("https://api.placeapi.site/api/notifications?limit=10&page=1", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
    {
      title: "Get Single Notification",
      path: "/api/notifications/cmekon3et0005792s2g3ypavv",
      description: "Retrieve details of a single notification by its ID.",
      example: `fetch("https://api.placeapi.site/api/notifications/{id}", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
  ];

  return (
    <div className="prose dark:prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Notifications API
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        Retrieve dummy notification data from the database. Supports endpoints
        for listing all notifications or fetching individual notification
        details. Notifications may include actions, types, and expiration times.
      </p>

      <div className="bg-green-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Notes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-0 leading-relaxed">
          Notifications can include <code>type</code> (info, success, warning,
          error), <code>priority</code> (low, normal, high), and optional{" "}
          <code>expiresAt</code> fields.
        </p>
      </div>

      {endpoints.map((ep, idx) => (
        <div key={idx} className="mt-8 mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
              {ep.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-base sm:text-lg leading-relaxed">
              {ep.description}
            </p>
          </div>

          <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700 dark:text-gray-200">
            Example Request
          </h3>
          <CodeBlock language="javascript">{dedent(ep.example)}</CodeBlock>

          <h3 className="text-xl font-medium mt-6 mb-3 text-gray-700 dark:text-gray-200">
            Try It Out
          </h3>
          <ApiSimulator
            endpoint={`https://api.placeapi.site${ep.path}`}
            apiKey={apiKey}
          />
        </div>
      ))}

      <DocsNavigator
        prev={{ href: "/docs/reviews", label: "Reviews API" }}
        // next={{ href: "/docs/comments", label: "Comments API" }}
      />
    </div>
  );
};

export default Page;
