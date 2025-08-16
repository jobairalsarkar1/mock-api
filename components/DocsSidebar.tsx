"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, Database, Key, Settings, User } from "lucide-react";
import clsx from "clsx";

const docsSections = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        title: "Authentication",
        href: "/docs/authentication",
        icon: <Key className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "Users API",
        href: "/docs/users-api",
        icon: <User className="w-4 h-4" />,
      },
      {
        title: "Products API",
        href: "/docs/products",
        icon: <Database className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Advanced",
    items: [
      {
        title: "SDKs",
        href: "/docs/sdks",
        icon: <Code className="w-4 h-4" />,
      },
      {
        title: "Configuration",
        href: "/docs/configuration",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
];

export default function DocsSidebar({
  isOpen = false,
  onClose = () => {},
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-50 dark:bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "w-64 border-r border-gray-300 dark:border-gray-800 p-4 fixed top-16 bottom-0",
          "bg-gray-50 dark:bg-gray-950 z-30 transition-all duration-300 overflow-y-auto",
          {
            "left-0": isOpen,
            "-left-64": !isOpen,
          },
          "md:left-0"
        )}
      >
        <div className="space-y-6 pt-2">
          {docsSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                      {
                        "bg-orange-100 text-orange-600 dark:bg-gray-800 dark:text-orange-400 font-medium":
                          pathname === item.href,
                        "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800/50":
                          pathname !== item.href,
                      }
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
