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
      <div className="flex items-center justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tasks.length) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-2xl font-semibold text-gray-500 uppercase tracking-wide">
                Task
              </th>
              <th className="px-4 py-3 text-2xl font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-2xl font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">
                Priority
              </th>
              <th className="px-4 py-3 text-2xl font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">
                Due Date
              </th>
              <th className="px-4 py-3 text-xl font-semibold text-gray-500 uppercase tracking-wide text-right">
                Actions
              </th>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-lg text-gray-600">
          <span>
            Showing {pagination.number * pagination.size + 1}–
            {Math.min(
              (pagination.number + 1) * pagination.size,
              pagination.totalElements,
            )}
            of {pagination.totalElements} tasks
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="lg"
              disabled={pagination.first}
              onClick={() => onPageChange(pagination.number - 1)}
            >
              ← Prev
            </Button>
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium text-xs">
              {pagination.number + 1} / {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              size="lg"
              disabled={pagination.last}
              onClick={() => onPageChange(pagination.number + 1)}
            >
              Next →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
