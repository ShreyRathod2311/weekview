import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Target, AlertTriangle } from 'lucide-react';
import { WeekStats } from '@/types/calendar';

interface WeeklyStatsProps {
  stats: WeekStats;
}

export function WeeklyStats({ stats }: WeeklyStatsProps) {
  const completionRate = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0;
  const importantCompletionRate = stats.totalImportantTasks > 0 
    ? (stats.importantTasksCompleted / stats.totalImportantTasks) * 100 
    : 0;

  return (
    <Card className="rounded-lg text-card-foreground p-4 bg-background border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Weekly Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Completion */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-sm text-muted-foreground">
              {stats.completedTasks}/{stats.totalTasks} tasks
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {completionRate.toFixed(1)}% completion rate
          </p>
        </div>

        {/* Important Tasks */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Important Tasks</span>
            <span className="text-sm text-muted-foreground">
              {stats.importantTasksCompleted}/{stats.totalImportantTasks} tasks
            </span>
          </div>
          <Progress value={importantCompletionRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {importantCompletionRate.toFixed(1)}% important tasks completed
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <Clock className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">Time Spent</span>
            <span className="font-semibold">{stats.totalHours.toFixed(1)}h</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <Target className="h-4 w-4 text-task-completed mb-1" />
            <span className="text-xs text-muted-foreground">Completed</span>
            <span className="font-semibold text-task-completed">{stats.completedTasks}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-task-partial mb-1" />
            <span className="text-xs text-muted-foreground">Partial</span>
            <span className="font-semibold text-task-partial">{stats.partialTasks}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-task-missed mb-1" />
            <span className="text-xs text-muted-foreground">Missed</span>
            <span className="font-semibold text-task-missed">{stats.missedTasks}</span>
          </div>
        </div>

        {/* Performance Badge */}
        <div className="flex justify-center mt-4">
          {completionRate >= 80 ? (
            <Badge className="bg-task-completed text-white">Excellent Week! 🎉</Badge>
          ) : completionRate >= 60 ? (
            <Badge className="bg-task-partial text-black">Good Progress! 👍</Badge>
          ) : (
            <Badge className="bg-task-missed text-white">Room for Improvement 💪</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}