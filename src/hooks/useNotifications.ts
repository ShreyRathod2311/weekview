import { useEffect } from 'react';
import { Task } from '@/types/calendar';

export function useNotifications(tasks: Task[]) {
  useEffect(() => {
    // Request notification permission on first load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const checkUpcomingTasks = () => {
      const now = new Date();
      const in15Minutes = new Date(now.getTime() + 15 * 60 * 1000);

      tasks.forEach((task) => {
        if (task.isImportant && task.status === 'upcoming') {
          const taskStartTime = new Date(task.startTime);
          
          // Check if task starts in 15 minutes (within 1-minute window)
          if (taskStartTime > now && taskStartTime <= in15Minutes) {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`⏰ Important Task Starting Soon`, {
                body: `"${task.title}" starts in 15 minutes`,
                icon: '/favicon.ico',
                tag: task.id, // Prevents duplicate notifications
              });
            }
          }
        }
      });
    };

    // Check every minute
    const interval = setInterval(checkUpcomingTasks, 60000);
    
    // Also check immediately
    checkUpcomingTasks();

    return () => clearInterval(interval);
  }, [tasks]);
}