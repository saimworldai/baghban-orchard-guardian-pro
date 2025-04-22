
import React from 'react';
import { WeatherData } from '@/services/weatherService';
import { diseaseDatabase } from '@/constants/diseaseData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type SprayRecommendationsProps = {
  weather: WeatherData | null;
};

export const SprayRecommendations: React.FC<SprayRecommendationsProps> = ({ weather }) => {
  // Mock season data - in a real app this would be determined by the date and location
  const currentSeason = "Summer";
  const appleVariety = "Red Delicious";
  const growthStage = "Fruit development";
  
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Seasonal Recommendations</CardTitle>
          <CardDescription className="text-green-700">
            Recommended spray schedule for {appleVariety} in {currentSeason} ({growthStage})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-green-50/50">
                <TableHead>Disease/Pest</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Recommended Treatment</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diseaseDatabase.map((disease) => (
                <TableRow key={disease.disease} className="hover:bg-green-50/50">
                  <TableCell className="font-medium">{disease.disease}</TableCell>
                  <TableCell>
                    <Badge variant={
                      disease.severity === 'Severe' ? 'destructive' :
                      disease.severity === 'Moderate' ? 'default' : 'outline'
                    }>
                      {disease.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[240px] truncate" title={disease.treatment}>
                    {disease.treatment}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="hover:bg-green-50">
                      <Plus className="h-4 w-4 mr-1" /> Schedule
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Optimal Spray Windows</CardTitle>
          <CardDescription className="text-blue-700">
            Weather-based recommendations for the next 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!weather ? (
            <div className="text-center p-4 text-blue-600">
              Select a location to view optimal spray windows
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-green-100/50 text-green-800 rounded-md">
                <div className="w-4 h-full bg-green-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Tomorrow Morning (6-9 AM)</h4>
                  <p className="text-sm">Low wind, no precipitation, moderate humidity</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-amber-100/50 text-amber-800 rounded-md">
                <div className="w-4 h-full bg-amber-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Day After Tomorrow (4-7 PM)</h4>
                  <p className="text-sm">Acceptable conditions with light breeze</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-red-100/50 text-red-800 rounded-md">
                <div className="w-4 h-full bg-red-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Next 3 Days</h4>
                  <p className="text-sm">Not recommended: Rain forecast with high winds</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
