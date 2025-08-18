"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchRoutes } from "@/lib/constants";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchRoutes>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = searchRoutes.filter((route) =>
      route.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-72" ref={inputRef}>
      {/* Input field */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Quick search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className="w-full bg-transparent focus:outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Suggestions dropdown */}
      {open && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {results.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
            >
              {route.title}
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {open && query.trim() !== "" && results.length === 0 && (
        <div className="absolute mt-2 text-center w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 px-3 py-2 text-sm text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
}
