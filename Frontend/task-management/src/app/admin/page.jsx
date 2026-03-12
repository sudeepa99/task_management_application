"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import { taskService } from "@/services/taskService";
import Navbar from "@/components/layout/Navbar";
import TaskTable from "@/components/tasks/TaskTable";
import TaskFilters from "@/components/tasks/TaskFilters";
import { getErrorMessage } from "@/lib/Utils";

const DEFAULT_FILTERS = { status: "", priority: "", sort: "dueDate,ASC" };

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
    if (!authLoading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, authLoading, router]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: 10, sort: filters.sort };
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const res = await taskService.getAllTasksAdmin(params);
      setTasks(res.data.content);
      setPagination({
        number: res.data.number,
        size: res.data.size,
        totalElements: res.data.totalElements,
        totalPages: res.data.totalPages,
        first: res.data.first,
        last: res.data.last,
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    if (user?.role === "ADMIN") fetchTasks();
  }, [fetchTasks, user]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  if (authLoading) return null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Navbar />

      <div className="shrink-0 w-full px-6 sm:px-8 lg:px-12 pt-8 pb-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                All Tasks
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Admin View
              </span>
            </div>
            <p className="text-base text-gray-500">
              {pagination
                ? `${pagination.totalElements} total task${pagination.totalElements !== 1 ? "s" : ""} across all users`
                : "Monitor and manage tasks across all users"}
            </p>
          </div>

          {pagination && (
            <div className="flex items-center gap-4 shrink-0">
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm min-w-25">
                <p className="text-3xl font-extrabold text-blue-600">
                  {pagination.totalElements}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 font-medium">
                  Total Tasks
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm min-w-25">
                <p className="text-3xl font-extrabold text-indigo-600">
                  {pagination.totalPages}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 font-medium">
                  Pages
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
          <TaskFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setPage(0);
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-6 sm:px-8 lg:px-12 pb-6 flex flex-col min-h-0">
        <TaskTable
          tasks={tasks}
          loading={loading}
          showUser={true}
          pagination={pagination}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
