import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Task } from '@/types/calendar';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const DURATION_OPTIONS = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
  { value: 180, label: '3 hours' },
  { value: 240, label: '4 hours' },
];

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState<number | null>(null);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || dayOfWeek === null || !time || !duration) {
      return;
    }

    // Create date string for the selected day and time
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const taskDate = new Date(startOfWeek);
    taskDate.setDate(startOfWeek.getDate() + dayOfWeek);
    
    const [hours, minutes] = time.split(':').map(Number);
    taskDate.setHours(hours, minutes, 0, 0);

    onAddTask({
      title,
      startTime: taskDate.toISOString(),
      duration,
      isImportant,
      status: 'upcoming',
      dayOfWeek,
    });

    // Reset form
    setTitle('');
    setDayOfWeek(null);
    setTime('');
    setDuration(null);
    setIsImportant(false);
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-secondary">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="h-5 w-5 text-primary" />
          Schedule New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Day of Week</Label>
              <Select value={dayOfWeek?.toString()} onValueChange={(value) => setDayOfWeek(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS_OF_WEEK.map((day, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="time">Start Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label>Duration</Label>
            <Select value={duration?.toString()} onValueChange={(value) => setDuration(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="important"
              checked={isImportant}
              onCheckedChange={setIsImportant}
            />
            <Label htmlFor="important">Mark as Important (15-min notification)</Label>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}