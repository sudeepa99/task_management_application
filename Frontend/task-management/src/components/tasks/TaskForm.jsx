"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const STATUS_OPTIONS = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];

const PRIORITY_OPTIONS = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

const INITIAL_FORM = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  dueDate: "",
};

export default function TaskForm({
  onSubmit,
  onCancel,
  initialData = null,
  loading = false,
}) {
  const [form, setForm] = useState(() =>
    initialData
      ? {
          title: initialData.title || "",
          description: initialData.description || "",
          status: initialData.status || "TODO",
          priority: initialData.priority || "MEDIUM",
          dueDate: initialData.dueDate || "",
        }
      : INITIAL_FORM,
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.status) newErrors.status = "Status is required";
    if (!form.priority) newErrors.priority = "Priority is required";
    if (form.dueDate && new Date(form.dueDate) <= new Date()) {
      newErrors.dueDate = "Due date must be in the future";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, dueDate: form.dueDate || null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter task title"
        error={errors.title}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add a description (optional)"
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-900
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            resize-none transition-all duration-150"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS_OPTIONS}
          placeholder="Select status"
          error={errors.status}
          required
        />
        <Select
          label="Priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          options={PRIORITY_OPTIONS}
          placeholder="Select priority"
          error={errors.priority}
          required
        />
      </div>

      <Input
        label="Due Date"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        error={errors.dueDate}
        min={new Date().toISOString().split("T")[0]}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
