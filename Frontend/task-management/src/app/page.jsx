"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/authService";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      router.replace(user?.role === "ADMIN" ? "/admin" : "/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Redirecting...</p>
      </div>
    </div>
  );
}
