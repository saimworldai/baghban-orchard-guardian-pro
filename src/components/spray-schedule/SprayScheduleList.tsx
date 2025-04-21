
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, isSameDay } from 'date-fns';
import { 
  Check, 
  Calendar, 
  AlertTriangle, 
  Trash, 
  Edit,
  CloudRain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, a
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { mockSprayTasks } from '@/services/mockData';

// In a real implementation, this would fetch from a database
const fetchSprayTasks = async () => {
  // Simulating API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSprayTasks;
};

type SprayScheduleListProps = {
  date?: Date;
};

export const SprayScheduleList: React.FC<SprayScheduleListProps> = ({ date }) => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['sprayTasks'],
    queryFn: fetchSprayTasks,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Filter tasks by date if a date is provided
  const filteredTasks = date 
    ? tasks?.filter(task => isSameDay(new Date(task.scheduledDate), date)) 
    : tasks;

  if (!filteredTasks?.length) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        No spray tasks {date ? 'scheduled for this day' : 'found'}.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <Card key={task.id} className={`${task.completed ? 'bg-muted/20' : 'bg-card'}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{task.pesticide}</CardTitle>
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
              {task.weatherRisk && (
                <div className="col-span-2 flex items-center text-amber-600 mt-2">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>{task.weatherRisk}</span>
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
              <Button variant="outline" size="sm">
                <Check className="h-4 w-4 mr-1" /> Mark Complete
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
