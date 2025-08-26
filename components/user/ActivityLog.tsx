"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { LayoutGrid, LayoutList } from "lucide-react";

export interface ApiUsage {
  id: string;
  endpoint: string;
  method: string;
  createdAt: string;
}

interface ActivityLogProps {
  apiUsages: ApiUsage[];
}

export default function ActivityLog({ apiUsages }: ActivityLogProps) {
  const [view, setView] = useState<"table" | "grid">("table");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Activity Log</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView("table")}
            className={`flex items-center justify-center px-1 py-1 rounded-md transition-colors ${
              view === "table"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            } transition-colors`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`flex items-center justify-center px-1 py-1 rounded-md transition-colors ${
              view === "grid"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            } transition-colors`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="w-12 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 rounded-tl-xl">
                  No.
                </th>
                <th className="w-[65%] px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Endpoint
                </th>
                <th className="w-24 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Method
                </th>
                <th className="w-32 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 rounded-tr-xl">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {apiUsages.map((usage, idx) => (
                <tr
                  key={usage.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-3 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 truncate">
                    {usage.endpoint}
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        usage.method === "GET"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : usage.method === "POST"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : usage.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : usage.method === "DELETE"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      }`}
                    >
                      {usage.method}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(new Date(usage.createdAt), {
                      addSuffix: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiUsages.map((usage, idx) => (
            <div
              key={usage.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-500 dark:text-gray-400 font-semibold">
                  No.{idx + 1}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    usage.method === "GET"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : usage.method === "POST"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : usage.method === "PUT"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : usage.method === "DELETE"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  }`}
                >
                  {usage.method}
                </span>
              </div>
              <div className="text-gray-900 dark:text-gray-100 font-medium truncate mb-1">
                {usage.endpoint}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                {formatDistanceToNow(new Date(usage.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
