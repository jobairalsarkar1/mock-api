"use client";

import Link from "next/link";
import { Home, BookOpen, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 text-foreground"
          >
            <span className="text-xl font-bold">DataForge</span>
          </Link>

          <div className="flex items-center space-x-6">
            <NavLink href="/" icon={<Home className="h-5 w-5" />} text="Home" />
            <NavLink
              href="/docs"
              icon={<BookOpen className="h-5 w-5" />}
              text="Docs"
            />
            <NavLink
              href="/account"
              icon={<User className="h-5 w-5" />}
              text="Account"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      {icon}
      <span className="hidden sm:inline-block">{text}</span>
    </Link>
  );
}
