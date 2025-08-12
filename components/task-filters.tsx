"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TaskStatus = "To Do" | "In Progress" | "Done";
type FilterType = "all" | "overdue" | "today" | "upcoming";

interface TaskFiltersProps {
  statusFilter: TaskStatus | "all";
  setStatusFilter: (filter: TaskStatus | "all") => void;
  dateFilter: FilterType;
  setDateFilter: (filter: FilterType) => void;
  filteredCount: number;
  totalCount: number;
}

export function TaskFilters({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  filteredCount,
  totalCount,
}: TaskFiltersProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>

        <Select
          value={statusFilter}
          onValueChange={(value: TaskStatus | "all") => setStatusFilter(value)}
        >
          <SelectTrigger className="w-36 border-gray-200 rounded-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={dateFilter}
          onValueChange={(value: FilterType) => setDateFilter(value)}
        >
          <SelectTrigger className="w-36 border-gray-200 rounded-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="today">Due Today</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-gray-400 ml-auto">
          {filteredCount} of {totalCount} tasks
        </span>
      </div>
    </div>
  );
}
