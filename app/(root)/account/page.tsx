"use client";
import React, { useState } from "react";
import { Key, BarChart as BarChartIcon, Settings } from "lucide-react";
import Overview from "@/components/Overview";
import ApiKeys from "@/components/ApiKeys";
import SettingsTab from "@/components/Settings";

const AccountDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 mx-auto px-2 sm:px-6 lg:px-8 xl:px-12">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">API Dashboard</h1>
          <p className="text-gray-400">
            Monitor your API usage and manage account settings
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="relative">
            {/* Hide scrollbar but keep functionality */}
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <div className="flex space-x-2 w-max">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm sm:text-base transition-all duration-200 border ${
                    activeTab === "overview"
                      ? "bg-orange-500/10 border-orange-500 text-orange-500"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <BarChartIcon className="w-4 h-4" />
                    <span>Overview</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("keys")}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm sm:text-base transition-all duration-200 border ${
                    activeTab === "keys"
                      ? "bg-orange-500/10 border-orange-500 text-orange-500"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Key className="w-4 h-4" />
                    <span>API Keys</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm sm:text-base transition-all duration-200 border ${
                    activeTab === "settings"
                      ? "bg-orange-500/10 border-orange-500 text-orange-500"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Gradient fade effect for scroll indication */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <Overview />}
        {activeTab === "keys" && <ApiKeys />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
};

export default AccountDashboard;
