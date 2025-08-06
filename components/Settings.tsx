"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

const SettingsTab = () => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-6">Account Settings</h2>

      <div className="space-y-8">
        <div className="border-t border-gray-800 pt-6">
          <h3 className="font-bold text-red-400 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <button className="bg-red-900/50 hover:bg-red-900/70 border border-red-800 text-white/70 px-4 py-2 rounded-md transition-colors duration-200">
              Delete Account
            </button>
            <div className="block">
              <div className="inline-flex items-center gap-2 bg-red-800/20 text-red-300 text-sm px-3 py-1.5 rounded-lg border border-red-700">
                <AlertTriangle className="w-4 h-4 text-red-400" />
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
