import { AlertTriangle, Home, BookOpen } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-float-medium" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md mx-auto">
          {/* Animated icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-full flex items-center justify-center mx-auto border border-orange-400/30">
              <AlertTriangle className="w-12 h-12 text-orange-400 animate-bounce" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-100 mb-4">
            <span className="bg-gradient-to-r from-orange-200 to-orange-400 bg-clip-text text-transparent">
              404
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 relative">
            <span className="relative inline-block">
              Page Not Found
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="relative px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Return Home
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/docs"
              className="relative px-6 py-3 border border-gray-700 hover:border-orange-400/30 text-gray-300 rounded-lg font-medium transition-all group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                Documentation
              </span>
              <span className="absolute inset-0 bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
