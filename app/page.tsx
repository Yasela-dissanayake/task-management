"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DashboardStats } from "@/components/dashboard-stats";
import { TaskForm } from "@/components/task-form";
import { TaskFilters } from "@/components/task-filters";
import { TaskList } from "@/components/task-list";

type TaskStatus = "To Do" | "In Progress" | "Done";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

type FilterType = "all" | "overdue" | "today" | "upcoming";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<FilterType>("all");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do" as TaskStatus,
    dueDate: "",
  });

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "To Do",
      dueDate: "",
    });
  };

  const handleQuickStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task
        )
      );
      setEditingTask(null);
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }

    resetForm();
    setIsAddingTask(false);
  };

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    });
    setEditingTask(task);
    setIsAddingTask(true);
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleCancel = () => {
    setIsAddingTask(false);
    setEditingTask(null);
    resetForm();
  };

  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (statusFilter !== "all" && task.status !== statusFilter) {
      return false;
    }

    // Date filter
    if (dateFilter !== "all") {
      const today = new Date();
      const taskDate = new Date(task.dueDate);

      switch (dateFilter) {
        case "overdue":
          return taskDate < today && task.dueDate !== "";
        case "today":
          return taskDate.toDateString() === today.toDateString();
        case "upcoming":
          return taskDate > today;
        default:
          return true;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Task Management App
          </h1>
          <p className="text-gray-500 text-lg">
            Stay organized and get things done
          </p>
        </div>

        <DashboardStats tasks={tasks} />

        {!isAddingTask && (
          <Button
            onClick={() => setIsAddingTask(true)}
            className="mb-8 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Task
          </Button>
        )}

        {isAddingTask && (
          <TaskForm
            formData={formData}
            setFormData={setFormData}
            editingTask={editingTask}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        <TaskFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          filteredCount={filteredTasks.length}
          totalCount={tasks.length}
        />

        <TaskList
          tasks={tasks}
          filteredTasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleQuickStatusChange}
        />
      </div>
    </div>
  );
}
