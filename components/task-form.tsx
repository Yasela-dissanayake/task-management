"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type TaskStatus = "To Do" | "In Progress" | "Done";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

interface TaskFormProps {
  formData: {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
  };
  setFormData: (data: any) => void;
  editingTask: Task | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TaskForm({
  formData,
  setFormData,
  editingTask,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  return (
    <Card className="mb-8 border-0 shadow-sm ring-1 ring-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">
          {editingTask ? "Edit Task" : "Create Task"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="What needs to be done?"
              className="border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add more details..."
              rows={3}
              className="border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: TaskStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="dueDate"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 rounded-lg"
            >
              {editingTask ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-200 text-gray-600 hover:bg-gray-50 px-6 rounded-lg bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
