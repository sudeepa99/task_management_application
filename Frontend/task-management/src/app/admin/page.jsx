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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                Admin View
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {pagination
                ? `${pagination.totalElements} total tasks across all users`
                : ""}
            </p>
          </div>

          {pagination && (
            <div className="flex items-center gap-3">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center">
                <p className="text-lg font-bold text-gray-900">
                  {pagination.totalElements}
                </p>
                <p className="text-xs text-gray-500">Total Tasks</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center">
                <p className="text-lg font-bold text-gray-900">
                  {pagination.totalPages}
                </p>
                <p className="text-xs text-gray-500">Pages</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
          <TaskFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setPage(0);
            }}
          />
        </div>

        <TaskTable
          tasks={tasks}
          loading={loading}
          showUser={true}
          pagination={pagination}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
