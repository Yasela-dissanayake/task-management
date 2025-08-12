import { Circle } from "lucide-react";
import { TaskCard } from "./task-card";

type TaskStatus = "To Do" | "In Progress" | "Done";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export function TaskList({
  tasks,
  filteredTasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps) {
  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Circle className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">
          {tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {tasks.length === 0
            ? "Create your first task to get started"
            : "Try adjusting your filters"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
