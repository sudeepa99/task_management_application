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
    <div className="flex flex-col h-full min-h-0 gap-4">
      <div className="flex-1 min-h-0 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex-1 min-h-0 overflow-x-auto flex flex-col">
          <table className="w-full text-left table-fixed">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide w-[35%]">
                  Task
                </th>
                {showUser && (
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell w-[18%]">
                    User
                  </th>
                )}
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell w-[14%]">
                  Status
                </th>
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell w-[13%]">
                  Priority
                </th>
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell w-[13%]">
                  Due Date
                </th>
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right w-[12%]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 overflow-y-auto">
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
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-4">
          <span className="font-medium">
            Showing {pagination.number * pagination.size + 1}–
            {Math.min(
              (pagination.number + 1) * pagination.size,
              pagination.totalElements,
            )}{" "}
            of {pagination.totalElements} tasks
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.first}
              onClick={() => onPageChange(pagination.number - 1)}
              className="rounded-xl!"
            >
              ← Prev
            </Button>
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-xl font-semibold text-xs border border-blue-100">
              {pagination.number + 1} / {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.last}
              onClick={() => onPageChange(pagination.number + 1)}
              className="rounded-xl!"
            >
              Next →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
