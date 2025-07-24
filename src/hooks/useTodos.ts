import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TodoItem } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load todos from Supabase
  const loadTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at');

      if (error) throw error;

      const formattedTodos = data.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.created_at
      }));

      setTodos(formattedTodos);
    } catch (error: any) {
      toast({
        title: "Error loading todos",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (title: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('todos')
        .insert({
          user_id: user.id,
          title: title,
          completed: false
        })
        .select()
        .single();

      if (error) throw error;

      const newTodo: TodoItem = {
        id: data.id,
        title: data.title,
        completed: data.completed,
        createdAt: data.created_at
      };

      setTodos(prev => [...prev, newTodo]);
      
      toast({
        title: "Todo created",
        description: `"${title}" added to your list.`
      });
    } catch (error: any) {
      toast({
        title: "Error creating todo",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Toggle todo completion
  const toggleTodo = async (todoId: string) => {
    try {
      const todo = todos.find(t => t.id === todoId);
      if (!todo) return;

      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', todoId);

      if (error) throw error;

      setTodos(prev => 
        prev.map(todo => 
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );

      toast({
        title: "Todo updated",
        description: `Task marked as ${!todo.completed ? 'completed' : 'incomplete'}.`
      });
    } catch (error: any) {
      toast({
        title: "Error updating todo",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Delete todo
  const deleteTodo = async (todoId: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId);

      if (error) throw error;

      setTodos(prev => prev.filter(todo => todo.id !== todoId));
      
      toast({
        title: "Todo deleted",
        description: "Todo has been removed."
      });
    } catch (error: any) {
      toast({
        title: "Error deleting todo",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: loadTodos
  };
}