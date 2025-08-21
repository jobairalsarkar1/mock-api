import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import ApiSimulator from "@/components/ApiSimulator";
import { auth } from "@/auth";
import DocsNavigator from "@/components/DocsNavigator";

const Page = async () => {
  const session = await auth();
  const apiKey = session?.user?.apiKey || null;

  // API endpoints for reviews
  const endpoints = [
    {
      title: "Get All Reviews",
      path: "/api/reviews",
      description:
        "Retrieve a paginated list of dummy reviews from the database.",
      example: `fetch("https://api.dataforge.dev/api/reviews?limit=10&page=2", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
    {
      title: "Get Single Review",
      path: "/api/reviews/cmeko61al000579soyl8rqene",
      description: "Retrieve details of a single review by its ID.",
      example: `fetch("https://api.dataforge.dev/api/reviews/{id}", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
  ];

  return (
    <div className="prose dark:prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Reviews API
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        Retrieve dummy review data from the database. Supports endpoints for
        listing all reviews or fetching individual review details. Reviews can
        belong to products, users, services, or places.
      </p>

      {/* Notes */}
      <div className="bg-green-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Notes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-0 leading-relaxed">
          Use <code>limit</code> and <code>page</code> query parameters for
          pagination. Reviews also include optional fields like{" "}
          <code>likes</code>, <code>verified</code>, and <code>image</code>.
        </p>
      </div>

      {/* List all endpoints */}
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
            endpoint={`https://api.dataforge.dev${ep.path}`}
            apiKey={apiKey}
          />
        </div>
      ))}

      <DocsNavigator
        prev={{ href: "/docs/posts", label: "Posts API" }}
        next={{ href: "/docs/notifications", label: "Notifications API" }}
      />
    </div>
  );
};

export default Page;
