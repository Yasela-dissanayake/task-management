"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Calendar,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Circle,
  MoreHorizontal,
} from "lucide-react";

type TaskStatus = "To Do" | "In Progress" | "Done";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case "To Do":
        return {
          color: "bg-slate-100 text-slate-700 border-slate-200",
          icon: Circle,
          dotColor: "bg-slate-400",
        };
      case "In Progress":
        return {
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Clock,
          dotColor: "bg-blue-500",
        };
      case "Done":
        return {
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
          dotColor: "bg-emerald-500",
        };
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate !== "";
  };

  const isToday = (dueDate: string) => {
    const today = new Date().toDateString();
    return new Date(dueDate).toDateString() === today;
  };

  const statusConfig = getStatusConfig(task.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="border-0 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}
              />
              <h3 className="font-semibold text-gray-900 text-lg truncate">
                {task.title}
              </h3>
            </div>

            {task.description && (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 items-center">
              <Badge
                className={`${statusConfig.color} border font-medium px-3 py-1 rounded-full`}
              >
                <StatusIcon className="w-3 h-3 mr-1.5" />
                {task.status}
              </Badge>

              {task.dueDate && (
                <div
                  className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full ${
                    isOverdue(task.dueDate)
                      ? "bg-red-50 text-red-700"
                      : isToday(task.dueDate)
                      ? "bg-amber-50 text-amber-700"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(task.dueDate).toLocaleDateString()}
                    {isOverdue(task.dueDate) && " • Overdue"}
                    {isToday(task.dueDate) && " • Today"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-1 ml-4">
            <Select
              value={task.status}
              onValueChange={(value: TaskStatus) =>
                onStatusChange(task.id, value)
              }
            >
              <SelectTrigger className="w-auto h-8 px-2 border-0 bg-transparent hover:bg-gray-50 rounded-lg">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">
                  <div className="flex items-center gap-2">
                    <Circle className="w-3 h-3" />
                    To Do
                  </div>
                </SelectItem>
                <SelectItem value="In Progress">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    In Progress
                  </div>
                </SelectItem>
                <SelectItem value="Done">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" />
                    Done
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
