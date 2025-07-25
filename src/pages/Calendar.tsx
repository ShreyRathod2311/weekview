import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TaskForm } from '@/components/TaskForm';
import { WeeklyCalendar } from '@/components/WeeklyCalendar';
import { TodoList } from '@/components/TodoList';
import { WeeklyStats } from '@/components/WeeklyStats';
import { Task, TodoItem, WeekStats, TaskStatus } from '@/types/calendar';
import { useNotifications } from '@/hooks/useNotifications';
import { useTasks } from '@/hooks/useTasks';
import { useTodos } from '@/hooks/useTodos';
import { useAuth } from '@/hooks/useAuth';
import { Calendar as CalendarIcon, CheckSquare, BarChart3, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Calendar() {
  const [activeTab, setActiveTab] = useState('calendar');
  const { user, signOut, loading: authLoading } = useAuth();
  const { tasks, addTask, updateTaskStatus, deleteTask, loading: tasksLoading } = useTasks();
  const { todos, addTodo, toggleTodo, deleteTodo, loading: todosLoading } = useTodos();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useNotifications(tasks);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleTaskSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(taskData);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    });
    navigate('/auth');
  };

  const weekStats: WeekStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    missedTasks: tasks.filter(t => t.status === 'missed').length,
    partialTasks: tasks.filter(t => t.status === 'partial').length,
    totalHours: tasks
      .filter(t => t.status === 'completed')
      .reduce((sum, task) => sum + (task.duration / 60), 0),
    importantTasksCompleted: tasks.filter(t => t.isImportant && t.status === 'completed').length,
    totalImportantTasks: tasks.filter(t => t.isImportant).length,
  };

  if (authLoading || tasksLoading || todosLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <CalendarIcon className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-muted-foreground">Loading your calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/10">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Weekly Calendar
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="todos" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              To-Do List
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <TaskForm onAddTask={handleTaskSubmit} />
              </div>
              <div className="lg:col-span-2">
            <WeeklyCalendar 
              tasks={tasks} 
              onUpdateTaskStatus={updateTaskStatus}
              onDeleteTask={deleteTask}
            />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="todos" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <TodoList 
                todos={todos}
                onAddTodo={addTodo}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
              />
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <WeeklyStats stats={weekStats} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}