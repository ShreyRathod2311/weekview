import { Task, TaskStatus } from '@/types/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, MinusCircle, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeeklyCalendarProps {
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const STATUS_COLORS = {
  upcoming: 'bg-task-upcoming',
  completed: 'bg-task-completed',
  missed: 'bg-task-missed',
  partial: 'bg-task-partial',
};

const STATUS_ICONS = {
  upcoming: Clock,
  completed: CheckCircle,
  missed: XCircle,
  partial: MinusCircle,
};

export function WeeklyCalendar({ tasks, onUpdateTaskStatus, onDeleteTask }: WeeklyCalendarProps) {
  const getTasksForTimeSlot = (dayOfWeek: number, hour: number) => {
    return tasks.filter((task) => {
      const taskStart = new Date(task.startTime);
      const taskHour = taskStart.getHours();
      const taskMinutes = taskStart.getMinutes();
      const taskEndHour = Math.floor((taskHour * 60 + taskMinutes + task.duration) / 60);
      
      return task.dayOfWeek === dayOfWeek && hour >= taskHour && hour < taskEndHour;
    });
  };

  const getTaskPosition = (task: Task, hour: number) => {
    const taskStart = new Date(task.startTime);
    const taskHour = taskStart.getHours();
    const taskMinutes = taskStart.getMinutes();
    
    if (hour === taskHour) {
      const topOffset = (taskMinutes / 60) * 100;
      const duration = Math.min(task.duration, 60 - taskMinutes);
      const height = (duration / 60) * 100;
      return { top: `${topOffset}%`, height: `${height}%` };
    }
    
    return { top: '0%', height: '100%' };
  };

  return (
    <Card className="p-4 bg-background border shadow-lg">
      <div className="grid grid-cols-8 gap-1">
        {/* Time column header */}
        <div className="text-center font-medium text-muted-foreground py-2">
          Time
        </div>
        
        {/* Day headers */}
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={day} className="text-center font-medium text-foreground py-2">
            {day}
          </div>
        ))}

        {/* Time grid */}
        {HOURS.map((hour) => (
          <div key={hour} className="contents">
            {/* Time label */}
            <div className="text-xs text-muted-foreground py-1 text-center border-r">
              {hour.toString().padStart(2, '0')}:00
            </div>
            
            {/* Day columns */}
            {DAYS_OF_WEEK.map((_, dayIndex) => {
              const dayTasks = getTasksForTimeSlot(dayIndex, hour);
              
              return (
                <div
                  key={`${dayIndex}-${hour}`}
                  className="relative h-12 border border-border/50 bg-muted/30"
                >
                  {dayTasks.map((task) => {
                    const position = getTaskPosition(task, hour);
                    const StatusIcon = STATUS_ICONS[task.status];
                    
                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "absolute inset-x-0 rounded px-1 py-0.5 cursor-pointer group transition-all hover:shadow-md",
                          STATUS_COLORS[task.status],
                          task.status === 'upcoming' && "text-white",
                          task.status === 'completed' && "text-white",
                          task.status === 'missed' && "text-white",
                          task.status === 'partial' && "text-black"
                        )}
                        style={position}
                        onClick={() => {
                          const statuses: TaskStatus[] = ['upcoming', 'completed', 'partial', 'missed'];
                          const currentIndex = statuses.indexOf(task.status);
                          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                          onUpdateTaskStatus(task.id, nextStatus);
                        }}
                      >
                        <div className="flex items-center gap-1 text-xs">
                          <StatusIcon className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate font-medium">{task.title}</span>
                          {task.isImportant && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              !
                            </Badge>
                          )}
                        </div>
                        
                        {/* Status change and delete buttons on hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0 bg-task-completed/20 hover:bg-task-completed/40 border-task-completed"
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateTaskStatus(task.id, 'completed');
                              }}
                            >
                              <CheckCircle className="h-3 w-3 text-task-completed" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0 bg-task-partial/20 hover:bg-task-partial/40 border-task-partial"
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateTaskStatus(task.id, 'partial');
                              }}
                            >
                              <MinusCircle className="h-3 w-3 text-task-partial" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-6 w-6 p-0 bg-task-missed/20 hover:bg-task-missed/40 border-task-missed"
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateTaskStatus(task.id, 'missed');
                              }}
                            >
                              <XCircle className="h-3 w-3 text-task-missed" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-6 w-6 p-0 bg-destructive/20 hover:bg-destructive/40 border-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteTask(task.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}