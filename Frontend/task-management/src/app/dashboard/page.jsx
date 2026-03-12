"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { taskService } from "@/services/taskService";
import Navbar from "@/components/layout/Navbar";
import TaskTable from "@/components/tasks/TaskTable";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskForm from "@/components/tasks/TaskForm";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Button from "@/components/ui/Button";
import { getErrorMessage } from "@/lib/Utils";

const DEFAULT_FILTERS = { status: "", priority: "", sort: "dueDate,ASC" };

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
    if (!authLoading && user?.role === "ADMIN") router.push("/admin");
  }, [user, authLoading, router]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: 8, sort: filters.sort };
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const res = await taskService.getMyTasks(params);
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
    if (user) fetchTasks();
  }, [fetchTasks, user]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(0);
  };

  const handleCreate = async (data) => {
    if (formLoading) return;
    setFormLoading(true);
    try {
      await taskService.createTask(data);
      toast.success("Task created!");
      setCreateOpen(false);
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    if (!editTask) return;
    setFormLoading(true);
    try {
      await taskService.updateTask(editTask.id, data);
      toast.success("Task updated!");
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await taskService.deleteTask(deleteTask.id);
      toast.success("Task deleted");
      setDeleteTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleMarkDone = async (task) => {
    try {
      await taskService.updateTask(task.id, { ...task, status: "DONE" });
      toast.success("Task marked as done!");
      fetchTasks();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (authLoading) return null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Navbar />

      <main className="flex-1 flex flex-col overflow-hidden px-6 sm:px-8 lg:px-12 py-8 gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
              My Tasks
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {pagination
                ? `${pagination.totalElements} task${pagination.totalElements !== 1 ? "s" : ""} total`
                : ""}
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Task
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
          <TaskFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        <TaskTable
          tasks={tasks}
          loading={loading}
          onEdit={setEditTask}
          onDelete={setDeleteTask}
          onMarkDone={handleMarkDone}
          pagination={pagination}
          onPageChange={setPage}
        />
      </main>

      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          loading={formLoading}
        />
      </Modal>

      <Modal
        isOpen={!!editTask}
        onClose={() => setEditTask(null)}
        title="Edit Task"
      >
        <TaskForm
          onSubmit={handleUpdate}
          onCancel={() => setEditTask(null)}
          initialData={editTask}
          loading={formLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTask}
        onClose={() => setDeleteTask(null)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTask?.title}"? This action cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  );
}
