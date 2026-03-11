import { PRIORITY_STYLES, STATUS_LABELS, STATUS_STYLES } from "@/lib/Utils";

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-2xl font-medium ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600"}`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-2xl font-medium ${PRIORITY_STYLES[priority] || "bg-gray-100 text-gray-600"}`}
    >
      {priority}
    </span>
  );
}
