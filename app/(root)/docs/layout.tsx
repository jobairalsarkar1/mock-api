import React from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-4xl text-center mt-10">Docs Landing Page.</p>

      {children}
    </section>
  );
}
