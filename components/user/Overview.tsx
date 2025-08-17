"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BarChartIcon, TrendingUp, Zap } from "lucide-react";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart,
} from "recharts";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ApiUsage {
  id: string;
  endpoint: string;
  method: string;
  createdAt: string;
}

const Overview = () => {
  const { data: session } = useSession();
  const apiKey = session?.user?.apiKey || null;

  const [apiUsages, setApiUsages] = useState<ApiUsage[]>([]);
  const [dailyUsage, setDailyUsage] = useState<
    { day: string; requests: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiKey) return;

    const fetchUsage = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/api-usage", {
          headers: { "X-API-KEY": apiKey },
        });

        if (data.success) {
          setApiUsages(data.data);

          // daily usage data for chart
          const usageByDay: Record<string, number> = {};
          data.data.forEach((item: ApiUsage) => {
            const day = new Date(item.createdAt).getDate().toString();
            usageByDay[day] = (usageByDay[day] || 0) + 1;
          });
          setDailyUsage(
            Object.entries(usageByDay)
              .map(([day, requests]) => ({
                day,
                requests,
              }))
              .sort((a, b) => parseInt(a.day) - parseInt(b.day))
          );
        }
      } catch (err) {
        console.error("Failed to fetch API usage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [apiKey]);

  const stats = [
    {
      label: "Total Requests",
      value: apiUsages.length.toLocaleString(),
      icon: BarChartIcon,
      change: "+18%",
      color: "text-blue-500",
    },
    {
      label: "This Month",
      value: apiUsages
        .filter(
          (u) => new Date(u.createdAt).getMonth() === new Date().getMonth()
        )
        .length.toLocaleString(),
      icon: TrendingUp,
      change: "+12%",
      color: "text-green-500",
    },
    {
      label: "Success Rate",
      value: "99.7%",
      icon: Zap,
      change: "+0.2%",
      color: "text-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              height={120}
              className="rounded-xl"
              baseColor="#f3f4f6"
              highlightColor="#e5e7eb"
              containerClassName="dark:opacity-30"
              enableAnimation
            />
          ))}
        </div>
        <Skeleton
          height={400}
          className="rounded-xl"
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
          containerClassName="dark:opacity-30"
          enableAnimation
        />
        <Skeleton
          height={400}
          className="rounded-xl"
          baseColor="#f3f4f6"
          highlightColor="#e5e7eb"
          containerClassName="dark:opacity-30"
          enableAnimation
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-colors duration-200 shadow-sm dark:shadow-none"
          >
            <div className="flex justify-between items-start">
              <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-3 mb-1">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Usage Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-colors duration-200 shadow-sm dark:shadow-none">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
          Monthly Request Trends
        </h2>
        <div className="h-64 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={dailyUsage}
              margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "#4B5563", fontSize: 12 }}
                axisLine={{ stroke: "#D1D5DB" }}
                tickMargin={5}
                padding={{ left: 2, right: 2 }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#4B5563", fontSize: 12 }}
                axisLine={{ stroke: "#D1D5DB" }}
                tickMargin={5}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                  padding: "8px 12px",
                }}
                formatter={(value) => [`${value}`, "Requests"]}
                labelFormatter={(day) => `Day ${day}`}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#F97316"
                fillOpacity={1}
                fill="url(#colorRequests)"
                name="Requests"
              />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#F97316"
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 1,
                  fill: "#FFFFFF",
                  stroke: "#F97316",
                }}
                activeDot={{
                  r: 5,
                  strokeWidth: 0,
                  fill: "#F97316",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none">
        <h2 className="text-xl font-bold mb-4 sm:mb-8">Activity Log</h2>
        <div className="overflow-x-auto">
          <div className="min-w-full overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 pl-0 pr-3 sm:pr-6 text-sm sm:text-base font-medium text-gray-500 dark:text-gray-300">
                    #
                  </th>
                  <th className="pb-3 px-3 sm:px-6 text-sm sm:text-base font-medium text-gray-500 dark:text-gray-300">
                    Endpoint
                  </th>
                  <th className="pb-3 px-3 sm:px-6 text-sm sm:text-base font-medium text-gray-500 dark:text-gray-300">
                    Method
                  </th>
                  <th className="pb-3 px-3 sm:px-6 text-sm sm:text-base font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {apiUsages.map((usage, idx) => (
                  <tr
                    key={usage.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-3 pl-0 pr-3 sm:pr-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-sm text-gray-900 dark:text-gray-100">
                      <div className="max-w-[120px] sm:max-w-xs md:max-w-md lg:max-w-lg truncate">
                        {usage.endpoint}
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-6 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
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
                    <td className="py-3 px-3 sm:px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="whitespace-nowrap">
                        {new Date(usage.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 sm:hidden">
                        {new Date(usage.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {apiUsages.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No activity found
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
