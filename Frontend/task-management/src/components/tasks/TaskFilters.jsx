"use client";
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

const SORT_OPTIONS = [
  { value: "dueDate,ASC", label: "Due Date (Earliest)" },
  { value: "dueDate,DESC", label: "Due Date (Latest)" },
  { value: "priority,ASC", label: "Priority (A-Z)" },
  { value: "createdAt,DESC", label: "Newest First" },
];

export default function TaskFilters({ filters, onChange, onReset }) {
  const hasActiveFilters = filters.status || filters.priority;

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
      <Select
        placeholder="All Statuses"
        options={STATUS_OPTIONS}
        value={filters.status || ""}
        onChange={(e) => onChange("status", e.target.value)}
      />
      <Select
        placeholder="All Priorities"
        options={PRIORITY_OPTIONS}
        value={filters.priority || ""}
        onChange={(e) => onChange("priority", e.target.value)}
      />
      <Select
        placeholder="Sort by..."
        options={SORT_OPTIONS}
        value={filters.sort || ""}
        onChange={(e) => onChange("sort", e.target.value)}
      />
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="whitespace-nowrap"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
