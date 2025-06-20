
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { 
  Brain, 
  CloudRain, 
  Camera, 
  MapPin, 
  Leaf, 
  AlertTriangle,
  CheckCircle,
  Info,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const mockDiseases = [
  { name: "Apple Scab", confidence: 92, severity: "Medium", treatment: "Apply fungicide spray" },
  { name: "Fire Blight", confidence: 87, severity: "High", treatment: "Prune affected branches" },
  { name: "Powdery Mildew", confidence: 78, severity: "Low", treatment: "Improve air circulation" }
];

const mockWeatherData = {
  temperature: 24,
  humidity: 68,
  windSpeed: 12,
  condition: "Partly Cloudy",
  alerts: ["Rain expected in 3 hours", "High humidity - monitor for fungal diseases"]
};

export function PublicDemoSection() {
  const [demoMode, setDemoMode] = useState<'disease' | 'weather' | null>(null);
  const [location, setLocation] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleDiseaseDemo = () => {
    toast.info("Analyzing plant image...");
    setTimeout(() => {
      setAnalysisResult(mockDiseases[Math.floor(Math.random() * mockDiseases.length)]);
      toast.success("Analysis complete!");
    }, 2000);
  };

  const handleWeatherDemo = () => {
    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }
    toast.info("Fetching weather data...");
    setTimeout(() => {
      setAnalysisResult(mockWeatherData);
      toast.success("Weather data retrieved!");
    }, 1500);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-full border border-green-200 mb-6"
        >
          <Sparkles className="h-5 w-5 text-green-600" />
          <span className="font-bold text-green-800">Try It Now - No Signup Required!</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
          Experience the Power of 
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> AI Agriculture</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Test our core features instantly. See how AI can transform your farming experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Disease Detection Demo */}
        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
          <Card className="bg-white/80 backdrop-blur-lg border-white/50 shadow-xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                AI Disease Detection Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Upload a plant image and get instant AI-powered disease analysis with treatment recommendations.
              </p>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50/50">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Click to upload plant image</p>
                  <Button 
                    onClick={handleDiseaseDemo}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Try Demo Analysis
                  </Button>
                </div>

                {analysisResult && demoMode !== 'weather' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span className="font-bold text-gray-800">Disease Detected</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{analysisResult.name}</span>
                        <Badge variant="outline" className="bg-white">
                          {analysisResult.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Severity:</span>
                        <Badge className={
                          analysisResult.severity === 'High' ? 'bg-red-100 text-red-800' :
                          analysisResult.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {analysisResult.severity}
                        </Badge>
                      </div>
                      <div className="pt-2 border-t border-purple-200">
                        <span className="font-medium text-green-700">💡 Treatment:</span>
                        <p className="text-gray-700 mt-1">{analysisResult.treatment}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather Intelligence Demo */}
        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
          <Card className="bg-white/80 backdrop-blur-lg border-white/50 shadow-xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                  <CloudRain className="h-6 w-6 text-blue-600" />
                </div>
                Weather Intelligence Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Get real-time weather data and agricultural insights for any location worldwide.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Enter Location</span>
                  </div>
                  <Input
                    placeholder="e.g., California, USA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                  <Button 
                    onClick={handleWeatherDemo}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Get Weather Intelligence
                  </Button>
                </div>

                {analysisResult && demoMode !== 'disease' && analysisResult.temperature && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{analysisResult.temperature}°C</div>
                        <div className="text-sm text-gray-600">Temperature</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{analysisResult.humidity}%</div>
                        <div className="text-sm text-gray-600">Humidity</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Wind Speed:</span>
                        <span className="font-semibold">{analysisResult.windSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Condition:</span>
                        <Badge className="bg-blue-100 text-blue-800">{analysisResult.condition}</Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Agricultural Alerts</span>
                      </div>
                      {analysisResult.alerts.map((alert: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-700 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {alert}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-3xl border border-green-200/50 max-w-4xl mx-auto">
          <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready for Advanced Features?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Sign up to unlock expert consultations, spray scheduling, detailed analytics, 
            and save your farm data securely in the cloud.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-3"
            onClick={() => window.location.href = '/auth'}
          >
            Sign Up for Full Access
          </Button>
        </div>
      </motion.div>
    </motion.section>
  );
}
