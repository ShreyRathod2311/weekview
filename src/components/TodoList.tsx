import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { TodoItem } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface TodoListProps {
  todos: TodoItem[];
  onAddTodo: (title: string) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      onAddTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };

  return (
    <Card className="rounded-lg text-card-foreground p-4 bg-background border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="h-5 w-5 text-primary" />
          Weekly To-Do List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <Input
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1"
            />
            <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {todos.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border bg-background/50 hover:bg-background transition-colors",
                  todo.completed && "opacity-60"
                )}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                
                <Checkbox
                  id={todo.id}
                  checked={todo.completed}
                  onCheckedChange={() => onToggleTodo(todo.id)}
                />
                
                <label
                  htmlFor={todo.id}
                  className={cn(
                    "flex-1 cursor-pointer transition-all",
                    todo.completed && "line-through text-muted-foreground"
                  )}
                >
                  {todo.title}
                </label>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteTodo(todo.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Completed: {todos.filter(t => t.completed).length}</span>
              <span>Remaining: {todos.filter(t => !t.completed).length}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}