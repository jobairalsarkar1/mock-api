"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, BookOpen, User, Menu, X, Network } from "lucide-react";
import clsx from "clsx";
import ThemeToggle from "./theme/ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import UserButton from "./user/UserButton";
import SearchBar from "./SearchBar";

const navItems = [
  { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
  { name: "Docs", path: "/docs", icon: <BookOpen className="h-4 w-4" /> },
  // { name: "Account", path: "/account", icon: <User className="h-4 w-4" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <nav className="py-0 fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-b-gray-300 dark:border-b-gray-800 bg-white/90 dark:bg-black/40">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo + SearchBar */}
            <div className="flex items-center gap-12">
              <Link
                href="/"
                className={clsx(
                  "flex items-center gap-2 group transition-all duration-300 ease-in-out",
                  sidebarOpen && "opacity-40 blur-[2px]"
                )}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-600">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-orange-600">
                  DataForge
                </span>
              </Link>

              <div className="hidden md:block">
                <SearchBar />
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    href={item.path}
                    icon={item.icon}
                    text={item.name}
                    active={pathname === item.path}
                    showIcon={pathname === item.path && false}
                  />
                ))}
                {session?.user && (
                  <NavLink
                    key="account"
                    href="/account"
                    icon={<User className="h-4 w-4" />}
                    text="Account"
                    active={pathname === "/account"}
                    showIcon={pathname === "/account" && true}
                    onClick={() => setSidebarOpen(false)}
                  />
                )}
              </div>
              {/* Theme Toggle */}
              <ThemeToggle />
              {/* User Button / Get Started */}
              {session?.user ? (
                <UserButton />
              ) : (
                <Link
                  href="/sign-in"
                  className="font-semibold px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-white"
                >
                  Get Started
                </Link>
              )}
            </div>

            {/* Mobile Theme Toggle + Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                className="p-2 rounded-md text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-700/20"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-opacity bg-black/60 md:hidden",
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
                <Network className="w-5 h-5 text-white" />
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
            {session?.user && (
              <NavLink
                key="account"
                href="/account"
                icon={<User className="h-4 w-4" />}
                text="Account"
                active={pathname === "/account"}
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
          {/* Mobile User Info */}
          {session?.user && (
            <div className="mt-4 p-3 mb-2 rounded-md">
              <p className="font-medium text-gray-900 dark:text-white">
                {session.user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {session.user.email}
              </p>
              <button
                type="submit"
                onClick={() => signOut()}
                className="mt-3 w-full bg-orange-600 hover:bg-orange-700 text-white py-1.5 rounded-md"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Bottom: Get Started (only if logged out) */}
          {!session?.user && (
            <div className="p-4">
              <Link
                href="/sign-in"
                className="block w-full text-center font-semibold px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-md text-white"
                onClick={() => setSidebarOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
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
  showIcon = true,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  showIcon?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "px-3.5 py-1.5 flex items-center space-x-2 rounded-xl font-medium transition-colors",
        {
          "bg-orange-600/15 text-orange-600": active,
          "text-gray-600 dark:text-gray-400 hover:bg-orange-600/30 hover:text-gray-700/80 dark:hover:text-white/80":
            !active,
        }
      )}
    >
      {showIcon && icon}
      <span>{text}</span>
    </Link>
  );
}
