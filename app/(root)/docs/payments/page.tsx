import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import ApiSimulator from "@/components/ApiSimulator";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  const apiKey = session?.user?.apiKey || null;

  // API endpoints for payments
  const endpoints = [
    {
      title: "Get All Payments",
      path: "/api/payments",
      description:
        "Retrieve a paginated list of dummy payments from the database.",
      example: `fetch("https://api.dataforge.dev/api/payments?limit=10&page=2", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
    {
      title: "Get Single Payment",
      path: "/api/payments/cmehntp8q003n79k48gov0jc5",
      description: "Retrieve details of a single payment by its ID.",
      example: `fetch("https://api.dataforge.dev/api/payments/{id}", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key"}"
  }
})`,
    },
  ];

  return (
    <div className="prose dark:prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Payments API
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        Retrieve dummy payment data from the database. Supports endpoints for
        listing all payments or fetching individual payment details.
      </p>

      {/* Notes */}
      <div className="bg-green-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Notes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-0 leading-relaxed">
          You can control the number of payments returned using{" "}
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
            endpoint={`https://api.dataforge.dev${ep.path}`}
            apiKey={apiKey}
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 gap-4">
        <Link
          href="/docs/cart"
          className="flex items-center justify-center px-3 py-2 rounded-md border-2 border-black dark:border-white/70 font-semibold text-black dark:text-white/70 bg-transparent hover:opacity-90 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Cart API
        </Link>

        <Link
          href="/docs/posts"
          className="flex items-center justify-center px-3 py-2 rounded-md border-2 border-black dark:border-white/70 font-semibold text-black dark:text-white/70 bg-transparent hover:opacity-90 transition"
        >
          Posts API
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Page;
