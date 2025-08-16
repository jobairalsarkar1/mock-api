"use client";
import React from "react";
import CodeBlock from "@/components/CodeBlock";
import dedent from "dedent";
import ApiSimulator from "@/components/ApiSimulator";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const apiKey = session?.user?.apiKey || null;

  return (
    <div className="prose dark:prose-invert max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Users API
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Retrieve multiple users from the database. Supports pagination using
        query parameters.
      </p>

      {/* Example usage */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Example Request
      </h2>
      <CodeBlock language="javascript">
        {dedent(`fetch("https://api.dataforge.dev/users?limit=10&page=2", {
  headers: {
    "X-API-KEY": "${apiKey ?? "your_api_key_here"}"
  }
})`)}
      </CodeBlock>

      {/* Notes */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        Notes
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        You can control the number of users returned using{" "}
        <code className="bg-gray-300 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">
          limit
        </code>{" "}
        and navigate through pages using{" "}
        <code className="bg-gray-300 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">
          page
        </code>{" "}
        query parameters.
      </p>

      {/* Simulator */}
      <h2 className="text-2xl font-semibold mt-8 text-gray-700 dark:text-gray-200">
        API Simulator
      </h2>
      <ApiSimulator
        endpoint="https://api.dataforge.dev/api/users"
        apiKey={apiKey}
      />
    </div>
  );
};

export default Page;
