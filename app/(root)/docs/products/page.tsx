import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import ApiSimulator from "@/components/ApiSimulator";
import { auth } from "@/auth";
import DocsNavigator from "@/components/DocsNavigator";

const Page = async () => {
  const session = await auth();
  const apiKey = session?.user?.apiKey || null;

  // API endpoints with descriptions
  const endpoints = [
    {
      title: "Get All Products",
      path: "/api/products",
      description: "Retrieve a paginated list of products from the database.",
      example: `fetch("https://api.placeapi.site/api/products?limit=10&page=2", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
    {
      title: "Get Single Product",
      path: "/api/products/cmehqk0te001d792o3xfefbcr",
      description: "Retrieve details of a single product by its ID.",
      example: `fetch("https://api.placeapi.site/api/products/{id}", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
  ];

  return (
    <div className="prose dark:prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Products API
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        Retrieve product data from the database. Supports multiple endpoints for
        listing products or fetching individual product details.
      </p>

      {/* Notes */}
      <div className="bg-green-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Notes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-0 leading-relaxed">
          You can control the number of products returned using{" "}
          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded font-mono text-sm">
            limit
          </code>{" "}
          and navigate through pages using{" "}
          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded font-mono text-sm">
            page
          </code>{" "}
          query parameters.
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

          {/* Example usage */}
          <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700 dark:text-gray-200">
            Example Request
          </h3>
          <div className="mb-6">
            <CodeBlock language="javascript">{dedent(ep.example)}</CodeBlock>
          </div>

          {/* API Simulator */}
          <h3 className="text-xl font-medium mt-6 mb-3 text-gray-700 dark:text-gray-200">
            Try It Out
          </h3>
          <ApiSimulator
            endpoint={`https://api.placeapi.site${ep.path}`}
            apiKey={apiKey}
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      <DocsNavigator
        prev={{ href: "/docs/users", label: "Users API" }}
        next={{ href: "/docs/orders", label: "Orders API" }}
      />
    </div>
  );
};

export default Page;
