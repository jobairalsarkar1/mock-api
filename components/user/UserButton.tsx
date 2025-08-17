"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function UserButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) return null;

  const logoAlternative =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "DF";

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
        aria-label="User Menu"
      >
        {session.user.image ? (
          <Image
            src={session.user.image || "https://placehold.co/32x32/png"}
            alt={session.user.name || "User Avatar"}
            height={32}
            width={32}
            className="rounded-full border border-orange-400 dark:border-orange-600"
            unoptimized={true}
            priority={true}
          />
        ) : (
          <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-orange-500 dark:border-orange-600">
            <span className="text-sm">{logoAlternative}</span>
          </div>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-950/80 border border-gray-200 dark:border-orange-500/80 rounded-md shadow-xl z-50 p-4 space-y-4 transition-all">
          {/* User Info */}
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                height={48}
                width={48}
                className="rounded-full"
                unoptimized={true}
                priority={true}
              />
            ) : (
              <div className="h-10 w-10 px-2 flex items-center justify-center rounded-full bg-orange-600 text-white font-bold text-lg">
                {logoAlternative}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {session.user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="submit"
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 bg-[#171515] hover:bg-black dark:hover:bg-neutral-900/70 dark:bg-neutral-800 text-white py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
