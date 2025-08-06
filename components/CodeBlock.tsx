"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  children: string;
  showCopy?: boolean;
}

const CodeBlock = ({
  language = "javascript",
  children,
  showCopy = true,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {showCopy && (
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            backgroundColor: "#2d2d2d",
            color: "#fff",
            border: "none",
            borderRadius: "0.25rem",
            padding: "0.35rem 0.6rem",
            cursor: "pointer",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {copied ? (
            <>
              <Check size={16} color="#4ade80" />
              Copied!
            </>
          ) : (
            <Copy size={16} />
          )}
        </button>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          padding: "1rem",
          backgroundColor: "#1e1e1e",
          fontSize: "1rem",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
