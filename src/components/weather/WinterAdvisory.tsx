import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Snowflake, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  Wind,
  CloudSnow,
  Shield,
  Droplet
} from 'lucide-react';

interface WinterAdvisoryProps {
  temperature?: number;
  minTemp?: number;
  windSpeed?: number;
  snow?: boolean;
}

export const WinterAdvisory: React.FC<WinterAdvisoryProps> = ({ 
  temperature = 5, 
  minTemp = -2,
  windSpeed = 10,
  snow = false 
}) => {
  const isFrostRisk = minTemp < 0;
  const isSevereWinter = temperature < 5;
  const isWindChill = windSpeed > 15;

  const getWinterTasks = () => {
    const tasks = [];
    
    if (isFrostRisk) {
      tasks.push({
        icon: Thermometer,
        title: 'Frost Protection Required',
        description: 'Apply anti-frost sprays and prepare heaters for critical nights',
        priority: 'high',
        action: 'Immediate action needed'
      });
    }

    if (snow) {
      tasks.push({
        icon: CloudSnow,
        title: 'Snow Management',
        description: 'Clear excessive snow from branches to prevent breakage',
        priority: 'medium',
        action: 'Monitor accumulation'
      });
    }

    if (isWindChill) {
      tasks.push({
        icon: Wind,
        title: 'Wind Protection',
        description: 'Check windbreaks and secure young trees',
        priority: 'medium',
        action: 'Inspect orchard'
      });
    }

    tasks.push({
      icon: Shield,
      title: 'Trunk Protection',
      description: 'Apply whitewash to prevent sun scald and bark damage',
      priority: 'low',
      action: 'Apply before heavy frost'
    });

    tasks.push({
      icon: Droplet,
      title: 'Pre-Winter Irrigation',
      description: 'Ensure adequate soil moisture before ground freezes',
      priority: isFrostRisk ? 'high' : 'medium',
      action: 'Water deeply if soil is dry'
    });

    return tasks;
  };

  const winterTasks = getWinterTasks();

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {isFrostRisk && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertTitle className="text-destructive font-semibold">Frost Alert - Kashmir Valley</AlertTitle>
            <AlertDescription className="text-destructive/90">
              Temperature expected to drop to {minTemp}°C. Immediate frost protection measures recommended for your apple orchard.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Winter Advisory Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-200 dark:border-blue-800">
            <Snowflake className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Winter Care Advisory</h3>
            <p className="text-sm text-muted-foreground">
              Specialized recommendations for Kashmir apple orchards
            </p>
          </div>
        </div>

        {/* Current Conditions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Current</span>
            </div>
            <p className="text-2xl font-bold">{temperature}°C</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
            <div className="flex items-center gap-2 mb-1">
              <Snowflake className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Min Temp</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{minTemp}°C</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Wind</span>
            </div>
            <p className="text-2xl font-bold">{windSpeed} km/h</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border">
            <div className="flex items-center gap-2 mb-1">
              <CloudSnow className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Snow</span>
            </div>
            <p className="text-2xl font-bold">{snow ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Winter Tasks */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground mb-3">Recommended Actions</h4>
          {winterTasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-background/70 backdrop-blur-sm border hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  task.priority === 'high' 
                    ? 'bg-destructive/10 border border-destructive/20' 
                    : task.priority === 'medium'
                    ? 'bg-warning/10 border border-warning/20'
                    : 'bg-primary/10 border border-primary/20'
                }`}>
                  <task.icon className={`h-5 w-5 ${
                    task.priority === 'high'
                      ? 'text-destructive'
                      : task.priority === 'medium'
                      ? 'text-warning'
                      : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-foreground">{task.title}</h5>
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' : 
                      task.priority === 'medium' ? 'default' : 
                      'secondary'
                    } className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{task.action}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Winter Prevention Guide */}
      <Card className="p-6">
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Kashmir Winter Prevention Guide
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-foreground">Before Winter</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Apply dormant oil spray to control overwintering pests</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Prune damaged or diseased branches</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Apply thick mulch layer around tree base</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Whitewash tree trunks with lime solution</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-foreground">During Winter</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Monitor for frost damage on critical nights</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Clear heavy snow from branches gently</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Check trunk wraps and supports regularly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Apply anti-transpirant sprays during warm spells</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
