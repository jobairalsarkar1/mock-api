"use client";

import { useState } from "react";
// import { Menu, X } from "lucide-react";
import DocsSidebar from "@/components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      {/* Navbar - Fixed at top */}
      {/* <header className="h-16 border-b border-gray-800 flex items-center px-4 fixed top-0 left-0 right-0 bg-gray-950 z-40">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
            <h1 className="text-xl font-bold text-gray-200">DataForge Docs</h1>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
              API Reference
            </button>
          </div>
        </div>
      </header> */}

      {/* Main content area */}
      <div className="flex flex-1">
        <DocsSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-auto md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
