"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              TaskFlow
            </span>
            {user?.role === "ADMIN" && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 ml-1">
                Admin
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="secondary" size="sm" onClick={logout}>
              Sign out
            </Button>
          </div>

          <button
            className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-5 h-5"
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
          <div className="sm:hidden border-t border-gray-100 py-3 space-y-2">
            <p className="text-sm text-gray-600 px-1">{user?.email}</p>
            {user?.role === "ADMIN" && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                Admin
              </span>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={logout}
              className="w-full mt-2"
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
