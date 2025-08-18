import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 bg-black/30 selection:bg-orange-500/30">
        {children}
      </main>
    </div>
  );
}
