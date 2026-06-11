"use client";

import { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { LayoutGrid, LayoutList, Loader2 } from "lucide-react";

export interface ApiUsage {
  id: string;
  endpoint: string;
  method: string;
  createdAt: string;
}

interface ActivityLogProps {
  apiUsages: ApiUsage[];
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}

export default function ActivityLog({
  apiUsages,
  hasMore,
  loadingMore,
  onLoadMore,
}: ActivityLogProps) {
  const [view, setView] = useState<"table" | "grid">("table");
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Automated window baseline infinite-scrolling trigger config
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "150px" }, // Pre-triggers 150px before screen edge baseline
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loadingMore, onLoadMore]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none">
      {/* View Switcher Controls Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Activity Log</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView("table")}
            className={`flex items-center justify-center px-2 py-1 rounded-md transition-colors ${
              view === "table"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`flex items-center justify-center px-2 py-1 rounded-md transition-colors ${
              view === "grid"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Empty State Fallback Layout */}
      {apiUsages.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No API usage logs found.
        </div>
      )}

      {/* Table Interface View Layout Option */}
      {view === "table" && apiUsages.length > 0 && (
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
                  <td className="px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 max-w-xs sm:max-w-none truncate">
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

      {/* Grid Interface View Layout Option */}
      {view === "grid" && apiUsages.length > 0 && (
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

      {/* Intersection Observer anchor point element sentinel hook */}
      <div ref={observerTarget} className="h-2 w-full invisible" />

      {/* Bottom status activity spinner wrapper element */}
      {loadingMore && (
        <div className="flex justify-center items-center gap-2 py-4 mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
          <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
          <span>Fetching more activity records...</span>
        </div>
      )}
    </div>
  );
}
