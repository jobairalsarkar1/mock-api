"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

const SettingsTab = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Account Settings
      </h2>

      <div className="space-y-8">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <h3 className="font-bold text-red-600 dark:text-red-400 mb-4">
            Danger Zone
          </h3>
          <div className="space-y-4">
            <button className="bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/50 dark:hover:bg-red-900/70 border border-red-300 dark:border-red-800 px-4 py-2 rounded-md transition-colors duration-200">
              Delete Account
            </button>
            <div className="block">
              <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-800/20 text-red-600 dark:text-red-300 text-sm px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-700">
                <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
                <p>
                  <span className="font-semibold">Warning:</span> Account
                  deletion is permanent and will immediately revoke all API
                  access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
