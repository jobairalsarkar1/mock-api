import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language?: string;
  children: string;
}

const CodeBlock = ({ language = "javascript", children }: CodeBlockProps) => {
  return (
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
  );
};

export default CodeBlock;
