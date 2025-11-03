import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedNavigation } from '@/components/navigation/EnhancedNavigation';
import { WinterAdvisory } from '@/components/weather/WinterAdvisory';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Snowflake, 
  ThermometerSnowflake, 
  Shield,
  AlertTriangle,
  Sprout,
  BookOpen,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WinterCare = () => {
  const winterDiseases = [
    {
      name: 'Winter Canker',
      severity: 'high',
      description: 'Fungal infection causing bark damage during cold months',
      prevention: ['Apply copper fungicide before winter', 'Prune infected branches', 'Protect wounds with sealant'],
      treatment: 'Cut back to healthy wood and apply fungicide'
    },
    {
      name: 'Frost Damage',
      severity: 'high',
      description: 'Cell damage from freezing temperatures',
      prevention: ['Use anti-frost sprays', 'Install heaters for critical nights', 'Ensure proper hydration'],
      treatment: 'Prune damaged tissue after danger of frost passes'
    },
    {
      name: 'Snow Mold',
      severity: 'medium',
      description: 'Fungal growth under prolonged snow cover',
      prevention: ['Improve drainage', 'Clear excessive snow', 'Apply preventive fungicides'],
      treatment: 'Apply systemic fungicide and improve air circulation'
    },
    {
      name: 'Sun Scald',
      severity: 'medium',
      description: 'Bark damage from temperature fluctuations',
      prevention: ['Paint trunks white', 'Wrap young trees', 'Provide shading'],
      treatment: 'Trim damaged bark and protect wounds'
    }
  ];

  const winterSchedule = [
    {
      month: 'November',
      tasks: [
        'Apply dormant oil spray',
        'Complete pruning of damaged branches',
        'Apply trunk whitewash',
        'Install windbreaks',
        'Deep irrigation before freeze'
      ]
    },
    {
      month: 'December',
      tasks: [
        'Monitor frost forecasts daily',
        'Keep anti-frost equipment ready',
        'Clear heavy snow accumulation',
        'Check trunk protection',
        'Inspect for winter damage'
      ]
    },
    {
      month: 'January',
      tasks: [
        'Continue snow management',
        'Monitor for sun scald',
        'Check mulch coverage',
        'Plan spring protection measures',
        'Document frost damage'
      ]
    },
    {
      month: 'February',
      tasks: [
        'Prepare for late winter pruning',
        'Apply copper fungicide',
        'Check for canker development',
        'Begin spring preparation',
        'Assess winter damage'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <EnhancedNavigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <Snowflake className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Kashmir Winter Care</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Apple Orchard Winter Protection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guide for protecting your apple trees during Kashmir's harsh winter months
          </p>
        </motion.div>

        {/* Live Winter Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <WinterAdvisory 
            temperature={3}
            minTemp={-4}
            windSpeed={18}
            snow={true}
          />
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="diseases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="diseases" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Diseases
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="guide" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Guide
            </TabsTrigger>
          </TabsList>

          {/* Winter Diseases Tab */}
          <TabsContent value="diseases">
            <div className="grid md:grid-cols-2 gap-6">
              {winterDiseases.map((disease, index) => (
                <motion.div
                  key={disease.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{disease.name}</h3>
                        <Badge variant={disease.severity === 'high' ? 'destructive' : 'default'}>
                          {disease.severity} severity
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-destructive/10">
                        <ThermometerSnowflake className="h-6 w-6 text-destructive" />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{disease.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Prevention
                        </h4>
                        <ul className="space-y-1">
                          {disease.prevention.map((step, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <h4 className="font-semibold text-sm mb-2">Treatment</h4>
                        <p className="text-sm text-muted-foreground">{disease.treatment}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Winter Schedule Tab */}
          <TabsContent value="schedule">
            <div className="grid md:grid-cols-2 gap-6">
              {winterSchedule.map((month, index) => (
                <motion.div
                  key={month.month}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{month.month}</h3>
                    </div>
                    <ul className="space-y-2">
                      {month.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Comprehensive Guide Tab */}
          <TabsContent value="guide">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sprout className="h-6 w-6 text-primary" />
                  Complete Winter Protection Guide
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Pre-Winter Preparation (October - Early November)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Pruning:</strong> Remove dead, diseased, or damaged branches. Seal large cuts with wound dressing.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Fertilization:</strong> Apply balanced fertilizer to strengthen trees before dormancy.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Irrigation:</strong> Deep watering before ground freezes to ensure adequate soil moisture.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Mulching:</strong> Apply 10-15cm layer of organic mulch around base, keeping it away from trunk.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Frost Protection Measures</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Anti-Frost Sprays:</strong> Apply kaolin clay or anti-transpirant before severe frost events.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Heaters:</strong> Use smudge pots or orchard heaters on critical frost nights (below -5°C).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Wind Machines:</strong> Install to circulate warm air and prevent frost pockets.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Covering:</strong> Use frost blankets for young or vulnerable trees during extreme cold.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Trunk and Branch Protection</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Whitewash:</strong> Mix lime, water, and copper sulfate. Apply to trunk and main branches.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Tree Wraps:</strong> Use burlap or tree wrap tape on young trees to prevent sun scald.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Support Stakes:</strong> Ensure young trees are well-staked to prevent wind damage.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Disease Management</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Dormant Spray:</strong> Apply copper-based fungicide and dormant oil in late winter.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Canker Control:</strong> Monitor and prune infected branches, disinfect tools between cuts.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>Sanitation:</strong> Remove fallen leaves and debris that harbor disease organisms.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-amber-900 dark:text-amber-100">Critical Winter Tips for Kashmir</h4>
                    <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                      <li>• Monitor weather forecasts daily during peak winter months</li>
                      <li>• Temperature below -5°C requires immediate frost protection</li>
                      <li>• Heavy snowfall (&gt;30cm) needs branch clearing within 24 hours</li>
                      <li>• Maintain emergency equipment: heaters, sprays, and covering materials</li>
                      <li>• Document all winter damage for insurance and future planning</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default WinterCare;
