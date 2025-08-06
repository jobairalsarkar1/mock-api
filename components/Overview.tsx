import { BarChartIcon, TrendingUp, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Overview = () => {
  const usageData = [
    { endpoint: "/users", calls: 2543, color: "bg-blue-500" },
    { endpoint: "/products", calls: 1876, color: "bg-green-500" },
    { endpoint: "/posts", calls: 892, color: "bg-orange-500" },
    { endpoint: "/analytics", calls: 341, color: "bg-purple-500" },
  ];

  const dailyUsage = [
    { day: "1", requests: 450, peak: 650 },
    { day: "3", requests: 680, peak: 720 },
    { day: "5", requests: 520, peak: 580 },
    { day: "7", requests: 750, peak: 820 },
    { day: "9", requests: 890, peak: 950 },
    { day: "11", requests: 920, peak: 950 },
    { day: "13", requests: 840, peak: 900 },
    { day: "15", requests: 790, peak: 850 },
    { day: "17", requests: 930, peak: 1000 },
    { day: "19", requests: 880, peak: 950 },
    { day: "21", requests: 820, peak: 900 },
    { day: "23", requests: 760, peak: 850 },
    { day: "25", requests: 690, peak: 800 },
    { day: "27", requests: 620, peak: 750 },
    { day: "29", requests: 540, peak: 700 },
    { day: "31", requests: 480, peak: 650 },
  ];

  const stats = [
    {
      label: "Total Requests",
      value: "32,456",
      icon: BarChartIcon,
      change: "+18%",
      color: "text-blue-500",
    },
    {
      label: "This Month",
      value: "15,247",
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
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
              <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-3 mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Usage by Endpoint - New Design */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-6">Endpoint Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {usageData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <code className="font-mono text-gray-300">{item.endpoint}</code>
                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
              </div>
              <div className="text-2xl font-bold">
                {item.calls.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">API calls</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Usage - Line Chart */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-colors duration-200">
        <h2 className="text-xl font-bold mb-6">Monthly Request Trends</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyUsage}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#4B5563" }}
                label={{
                  value: "Day of Month",
                  position: "insideBottom",
                  offset: -10,
                  fill: "#9CA3AF",
                }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#4B5563" }}
                label={{
                  value: "Requests",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#9CA3AF",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#4B5563",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#F3F4F6" }}
                labelStyle={{ fontWeight: "bold", color: "#F59E0B" }}
                formatter={(value) => [
                  value,
                  value === "requests" ? "Actual Requests" : "Peak Capacity",
                ]}
                labelFormatter={(label) => `Day ${label}`}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) =>
                  value === "requests" ? "Actual Requests" : "Peak Capacity"
                }
              />
              <Line
                type="monotone"
                dataKey="requests"
                name="Actual Requests"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "#1F2937" }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  fill: "#F97316",
                  stroke: "#1F2937",
                }}
              />
              <Line
                type="monotone"
                dataKey="peak"
                name="Peak Capacity"
                stroke="#8B5CF6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, strokeWidth: 2, fill: "#1F2937" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Track your API request patterns throughout the month compared to your
          peak capacity limits. Hover over data points for detailed metrics.
        </p>
      </div>
    </div>
  );
};

export default Overview;
