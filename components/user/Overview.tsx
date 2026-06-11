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
import ActivityLog from "./ActivityLog";
import OverviewSkeleton from "../loaders/OverviewSkeleton";

interface ApiUsage {
  id: string;
  endpoint: string;
  method: string;
  createdAt: string;
}

interface SummaryStats {
  totalRequests: number;
  monthlyRequests: number;
  dailyUsage: { day: string; requests: number }[];
}

const Overview = () => {
  const { data: session } = useSession();
  const apiKey = session?.user?.apiKey || null;

  const [apiUsages, setApiUsages] = useState<ApiUsage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [summary, setSummary] = useState<SummaryStats | null>(null);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load initial usage payload
  useEffect(() => {
    if (!apiKey) return;

    const fetchInitialUsage = async () => {
      try {
        setInitialLoading(true);
        const { data } = await axios.get("/api/api-usage", {
          headers: { "X-API-KEY": apiKey },
          params: { limit: 20 },
        });

        if (data.success) {
          setApiUsages(data.data);
          setSummary(data.summary);
          setHasMore(data.pagination.hasMore);
          setNextCursor(data.pagination.nextCursor);
        }
      } catch (err) {
        console.error("Failed to fetch API usage:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialUsage();
  }, [apiKey]);

  // Append subsequent logs automatically triggered via infinite scroll observer
  const handleLoadMore = async () => {
    if (!apiKey || loadingMore || !nextCursor) return;

    try {
      setLoadingMore(true);
      const { data } = await axios.get("/api/api-usage", {
        headers: { "X-API-KEY": apiKey },
        params: { limit: 20, cursor: nextCursor },
      });

      if (data.success) {
        setApiUsages((prev) => [...prev, ...data.data]);
        setHasMore(data.pagination.hasMore);
        setNextCursor(data.pagination.nextCursor);
      }
    } catch (err) {
      console.error("Failed to fetch more logs:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (initialLoading) {
    return <OverviewSkeleton />;
  }

  // Pre-sort metrics by numerical day sequence for Recharts context matching
  const chartData = summary?.dailyUsage
    ? [...summary.dailyUsage].sort((a, b) => parseInt(a.day) - parseInt(b.day))
    : [];

  const stats = [
    {
      label: "Total Requests",
      value: (summary?.totalRequests ?? 0).toLocaleString(),
      icon: BarChartIcon,
      change: "+18%",
      color: "text-blue-500",
    },
    {
      label: "This Month",
      value: (summary?.monthlyRequests ?? 0).toLocaleString(),
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

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Stats Summary Panel */}
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

      {/* Monthly Usage Visual Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-colors duration-200 shadow-sm dark:shadow-none">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
          Monthly Request Trends
        </h2>
        <div className="h-64 sm:h-80 w-full min-h-[250px] sm:min-h-[320px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 10, left: -20, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="colorRequests"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickMargin={5}
                  allowDecimals={false}
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
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              No traffic requests recorded this month.
            </div>
          )}
        </div>
      </div>

      {/* Paginated Activity Log list workflow */}
      <ActivityLog
        apiUsages={apiUsages}
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Overview;
