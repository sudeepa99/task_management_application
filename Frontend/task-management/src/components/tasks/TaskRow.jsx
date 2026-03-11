import { StatusBadge, PriorityBadge } from "@/components/ui/Badge";
import { formatDate, isOverdue } from "@/lib/Utils";

export default function TaskRow({
  task,
  onEdit,
  onDelete,
  onMarkDone,
  showUser = false,
}) {
  const overdue = task.status !== "DONE" && isOverdue(task.dueDate);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span
            className={`text-2xl font-medium ${task.status === "DONE" ? "line-through text-gray-400" : "text-gray-900"}`}
          >
            {task.title}
          </span>
          {task.description && (
            <span className="text-2xl text-gray-500 mt-0.5 truncate max-w-xs">
              {task.description}
            </span>
          )}
          {showUser && (
            <span className="text-2xl text-blue-500 mt-0.5">
              User #{task.userId}
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-3 hidden sm:table-cell text-2xl">
        <StatusBadge status={task.status} />
      </td>

      <td className="px-4 py-3 hidden md:table-cell text-2xl">
        <PriorityBadge priority={task.priority} />
      </td>

      <td className="px-4 py-3 hidden lg:table-cell ">
        <span
          className={`text-2xl ${overdue ? "text-red-500 font-medium" : "text-gray-600"}`}
        >
          {overdue && "⚠ "}
          {formatDate(task.dueDate)}
        </span>
      </td>

      <td className="px-4 py-3 text-2xl">
        <div className="flex items-center gap-3 justify-end">
          {task.status !== "DONE" && onMarkDone && (
            <button
              onClick={() => onMarkDone(task)}
              title="Mark as done"
              className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              title="Edit task"
              className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task)}
              title="Delete task"
              className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
