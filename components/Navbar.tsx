"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, BookOpen, User, Code, Menu, X } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
  { name: "Docs", path: "/docs", icon: <BookOpen className="h-5 w-5" /> },
  { name: "Account", path: "/account", icon: <User className="h-5 w-5" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="py-1 fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-b-gray-800 bg-white/70 dark:bg-black/40">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-600">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-orange-600">
                DataForge
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    href={item.path}
                    icon={item.icon}
                    text={item.name}
                    active={pathname === item.path}
                  />
                ))}
              </div>
              <Link
                href="/"
                className="font-semibold px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-white"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-700/20"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-opacity bg-black/50 md:hidden",
          {
            "opacity-100 pointer-events-auto": sidebarOpen,
            "opacity-0 pointer-events-none": !sidebarOpen,
          }
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-64 bg-white dark:bg-black shadow-lg transition-transform duration-300 md:hidden",
          {
            "translate-x-0": sidebarOpen,
            "translate-x-full": !sidebarOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Top: Logo + Close */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-600">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-orange-600">
                DataForge
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-orange-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Middle: Nav Links */}
          <div className="flex-1 flex flex-col space-y-1 p-4">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                href={item.path}
                icon={item.icon}
                text={item.name}
                active={pathname === item.path}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </div>

          {/* Bottom: Get Started */}
          <div className="p-4">
            <Link
              href="/"
              className="block w-full text-center font-semibold px-4 py-2 bg-orange-700 hover:bg-orange-700 rounded-md text-white"
              onClick={() => setSidebarOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({
  href,
  icon,
  text,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 flex items-center space-x-2 rounded-xl font-semibold transition-colors",
        {
          "bg-orange-600/15 text-orange-600": active,
          "text-gray-400 hover:bg-orange-600/30 hover:text-white/80": !active,
        }
      )}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
