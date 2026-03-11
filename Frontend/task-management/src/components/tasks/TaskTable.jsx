import TaskRow from "./TaskRow";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function TaskTable({
  tasks = [],
  loading,
  onEdit,
  onDelete,
  onMarkDone,
  showUser = false,
  pagination,
  onPageChange,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="flex items-center justify-center flex-1">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-auto min-h-0">
        <table className="w-full text-left">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Task
              </th>
              {showUser && (
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                  User
                </th>
              )}
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                Priority
              </th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">
                Due Date
              </th>
              {showUser && (
                <>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">
                    Created At
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">
                    Updated At
                  </th>
                </>
              )}
              {!showUser && (
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onMarkDone={onMarkDone}
                showUser={showUser}
              />
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <span className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {pagination.number * pagination.size + 1}–
              {Math.min(
                (pagination.number + 1) * pagination.size,
                pagination.totalElements,
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {pagination.totalElements}
            </span>{" "}
            tasks
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.first}
              onClick={() => onPageChange(pagination.number - 1)}
              className="rounded-lg!"
            >
              ← Prev
            </Button>
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-semibold text-xs border border-blue-100">
              {pagination.number + 1} / {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.last}
              onClick={() => onPageChange(pagination.number + 1)}
              className="rounded-lg!"
            >
              Next →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
