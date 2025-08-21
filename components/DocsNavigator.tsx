import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DocsNavProps {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}

export default function DocsNavigator({ prev, next }: DocsNavProps) {
  return (
    <div className="flex justify-between mt-12 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center justify-center px-3 py-2 rounded-md border border-black dark:border-white/70 font-semibold text-black dark:text-white/70 bg-transparent hover:opacity-90 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {prev.label}
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex items-center justify-center px-3 py-2 rounded-md border border-black dark:border-white/70 font-semibold text-black dark:text-white/70 bg-transparent hover:opacity-90 transition"
        >
          {next.label}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
