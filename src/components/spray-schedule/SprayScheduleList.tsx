
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, isSameDay, isBefore, isToday, addDays } from 'date-fns';
import { 
  Check, 
  Calendar, 
  AlertTriangle, 
  Trash, 
  Edit,
  CloudRain,
  Bell,
  BellOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { mockSprayTasks } from '@/services/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// In a real implementation, this would fetch from a database
const fetchSprayTasks = async () => {
  // Simulating API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSprayTasks;
};

// Mock function to update task (would connect to DB in real implementation)
const updateTask = async (taskId: string, updates: Partial<any>) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id: taskId, ...updates };
};

// Mock function to delete task
const deleteTask = async (taskId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};

type SprayScheduleListProps = {
  date?: Date;
  onEditTask?: (taskId: string) => void;
};

export const SprayScheduleList: React.FC<SprayScheduleListProps> = ({ date, onEditTask }) => {
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showOffline, setShowOffline] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['sprayTasks'],
    queryFn: fetchSprayTasks,
  });

  const completeMutation = useMutation({
    mutationFn: ({ taskId, completed }: { taskId: string; completed: boolean }) => 
      updateTask(taskId, { 
        completed, 
        completedDate: completed ? new Date().toISOString() : null 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sprayTasks'] });
      toast({
        title: "Task updated",
        description: "The spray task has been updated",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sprayTasks'] });
      toast({
        title: "Task deleted",
        description: "The spray task has been removed",
      });
      setTaskToDelete(null);
    },
  });

  // Toggle task completion status
  const handleToggleComplete = (taskId: string, currentStatus: boolean) => {
    completeMutation.mutate({ taskId, completed: !currentStatus });
  };

  // Confirm and delete a task
  const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteMutation.mutate(taskToDelete);
    }
  };

  // Handle edit task
  const handleEditTask = (taskId: string) => {
    if (onEditTask) {
      onEditTask(taskId);
    } else {
      // Fallback if no edit handler provided
      toast({
        title: "Edit not available",
        description: "Editing functionality is not available in this view",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Filter tasks by date if a date is provided
  let filteredTasks = tasks || [];
  
  if (date) {
    filteredTasks = filteredTasks.filter(task => isSameDay(new Date(task.scheduledDate), date));
  }

  // Helper to determine if a task is due soon (within 2 days)
  const isDueSoon = (taskDate: string) => {
    const date = new Date(taskDate);
    return !isBefore(date, new Date()) && (isToday(date) || isBefore(date, addDays(new Date(), 2)));
  };

  if (!filteredTasks?.length) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        <div className="mb-4">
          No spray tasks {date ? 'scheduled for this day' : 'found'}.
        </div>
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2">
            <Checkbox 
              id="showOffline" 
              checked={showOffline}
              onCheckedChange={(checked) => setShowOffline(!!checked)}
            />
            <label 
              htmlFor="showOffline"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Show offline tasks
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <Card 
          key={task.id} 
          className={`${task.completed ? 'bg-muted/20' : isDueSoon(task.scheduledDate) ? 'border-amber-300' : 'bg-card'}`}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  {task.pesticide}
                  {isDueSoon(task.scheduledDate) && !task.completed && (
                    <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800">Due Soon</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {format(new Date(task.scheduledDate), 'MMMM d, yyyy')}
                </CardDescription>
              </div>
              <Badge 
                variant={task.priority === 'high' ? 'destructive' : 
                       task.priority === 'medium' ? 'default' : 'outline'}
              >
                {task.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Target:</span> {task.diseaseTarget}
              </div>
              <div>
                <span className="text-muted-foreground">Dose:</span> {task.dose}
              </div>
              {task.reminder && (
                <div className="col-span-2 flex items-center text-blue-600 mt-1">
                  <Bell className="h-4 w-4 mr-1" />
                  <span>Reminder: {task.reminder} before</span>
                </div>
              )}
              {task.weatherRisk && (
                <div className="col-span-2 flex items-center text-amber-600 mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>{task.weatherRisk}</span>
                </div>
              )}
              {task.offlineSync && (
                <div className="col-span-2 flex items-center text-purple-600 mt-1 text-xs">
                  <span>Pending sync (updated offline)</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-between">
            {task.completed ? (
              <div className="text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> 
                Completed {task.completedDate && format(new Date(task.completedDate), 'MMM d, h:mm a')}
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleToggleComplete(task.id, !!task.completed)}
                disabled={completeMutation.isPending}
              >
                <Check className="h-4 w-4 mr-1" /> Mark Complete
              </Button>
            )}
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleEditTask(task.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setTaskToDelete(task.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Spray Task</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this spray task? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setTaskToDelete(null)}>Cancel</Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteTask}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      ))}
      
      <div className="flex justify-between items-center mt-4">
        <div className="inline-flex items-center space-x-2">
          <Checkbox 
            id="showOfflineList" 
            checked={showOffline}
            onCheckedChange={(checked) => setShowOffline(!!checked)}
          />
          <label 
            htmlFor="showOfflineList"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Show offline tasks
          </label>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm"
          onClick={() => {
            toast({
              title: "Synced",
              description: "All tasks have been synchronized",
            });
          }}
        >
          Sync Now
        </Button>
      </div>
    </div>
  );
};
