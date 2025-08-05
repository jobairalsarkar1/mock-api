import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen">
      <Navbar />
      <main className="pt-16 bg-red-500">
        <p className="text-4xl text-center mt-10">Overall Landing Page.</p>

        {children}
      </main>
    </section>
  );
}
