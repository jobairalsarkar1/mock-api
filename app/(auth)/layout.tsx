import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-5xl text-center">Auth Layout</p>
      {children}
    </section>
  );
}
