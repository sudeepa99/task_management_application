"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              TaskFlow
            </span>
            {user?.role === "ADMIN" && (
              <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 ml-1 border border-amber-200">
                Admin
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-5">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {user?.email?.[0]?.toUpperCase() ?? "U"}
              </div>
              <span className="text-sm font-medium text-gray-700 max-w-50 truncate">
                {user?.email}
              </span>
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={logout}
              className="rounded-xl! px-5! py-2.5! text-sm! font-semibold"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </Button>
          </div>

          <button
            className="sm:hidden p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-4 space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                {user?.email?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl font-medium text-gray-700 truncate">
                  {user?.email}
                </span>
                {user?.role === "ADMIN" && (
                  <span className="text-xl font-semibold text-amber-600 mt-0.5">
                    Administrator
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="secondary"
              size="md"
              onClick={logout}
              className="w-full rounded-xl! text-sm! font-semibold"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
