export interface Task {
  id: string;
  title: string;
  startTime: string; // Format: "YYYY-MM-DD HH:mm"
  duration: number; // Duration in minutes
  isImportant: boolean;
  status: 'upcoming' | 'completed' | 'missed' | 'partial';
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  createdAt: string;
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface WeekStats {
  totalTasks: number;
  completedTasks: number;
  missedTasks: number;
  partialTasks: number;
  totalHours: number;
  importantTasksCompleted: number;
  totalImportantTasks: number;
}

export type TaskStatus = Task['status'];