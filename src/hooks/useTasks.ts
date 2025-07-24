import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Task } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load tasks from Supabase
  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('start_time');

      if (error) throw error;

      const formattedTasks = data.map(task => ({
        id: task.id,
        title: task.title,
        dayOfWeek: task.day_of_week,
        startTime: task.start_time,
        duration: task.duration,
        status: task.status as Task['status'],
        isImportant: task.is_important,
        createdAt: task.created_at
      }));

      setTasks(formattedTasks);
    } catch (error: any) {
      toast({
        title: "Error loading tasks",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: taskData.title,
          day_of_week: taskData.dayOfWeek,
          start_time: taskData.startTime,
          duration: taskData.duration,
          status: taskData.status,
          is_important: taskData.isImportant
        })
        .select()
        .single();

      if (error) throw error;

      const newTask: Task = {
        id: data.id,
        title: data.title,
        dayOfWeek: data.day_of_week,
        startTime: data.start_time,
        duration: data.duration,
        status: data.status as Task['status'],
        isImportant: data.is_important,
        createdAt: data.created_at
      };

      setTasks(prev => [...prev, newTask]);
      
      toast({
        title: "Task created",
        description: `"${taskData.title}" has been scheduled.`
      });
    } catch (error: any) {
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId: string, status: Task['status']) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, status } : task
        )
      );

      toast({
        title: "Task updated",
        description: `Task marked as ${status}.`
      });
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      toast({
        title: "Task deleted",
        description: "Task has been removed."
      });
    } catch (error: any) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    addTask,
    updateTaskStatus,
    deleteTask,
    refreshTasks: loadTasks
  };
}