import { useState, useMemo } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { WeeklyCalendar } from '@/components/WeeklyCalendar';
import { TodoList } from '@/components/TodoList';
import { WeeklyStats } from '@/components/WeeklyStats';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNotifications } from '@/hooks/useNotifications';
import { Task, TodoItem, TaskStatus, WeekStats } from '@/types/calendar';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, List, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

export default function Calendar() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('calendar-tasks', []);
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('calendar-todos', []);
  const [activeTab, setActiveTab] = useState('calendar');

  // Enable notifications
  useNotifications(tasks);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task Added",
      description: `"${newTask.title}" has been scheduled.`,
    });
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "Task Updated",
        description: `"${task.title}" marked as ${status}.`,
      });
    }
  };

  const addTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const weekStats: WeekStats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const missedTasks = tasks.filter(t => t.status === 'missed').length;
    const partialTasks = tasks.filter(t => t.status === 'partial').length;
    
    const totalHours = tasks
      .filter(t => t.status === 'completed')
      .reduce((acc, task) => acc + (task.duration / 60), 0);
    
    const importantTasks = tasks.filter(t => t.isImportant);
    const importantTasksCompleted = importantTasks.filter(t => t.status === 'completed').length;
    
    return {
      totalTasks,
      completedTasks,
      missedTasks,
      partialTasks,
      totalHours,
      importantTasksCompleted,
      totalImportantTasks: importantTasks.length,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Weekly Calendar Planner
          </h1>
          <p className="text-muted-foreground mt-2">
            Schedule tasks, track progress, and stay organized throughout your week.
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="todos" className="flex items-center gap-2">
              <List className="h-4 w-4" />
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
                <TaskForm onAddTask={addTask} />
              </div>
              <div className="lg:col-span-2">
                <WeeklyCalendar 
                  tasks={tasks} 
                  onUpdateTaskStatus={updateTaskStatus}
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

        {/* Quick Stats Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-6">
            <span>Total Tasks: {tasks.length}</span>
            <span>Completed: {weekStats.completedTasks}</span>
            <span>Hours Logged: {weekStats.totalHours.toFixed(1)}h</span>
          </div>
        </footer>
      </div>
    </div>
  );
}