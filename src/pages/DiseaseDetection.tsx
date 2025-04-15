
import React, { useState } from 'react';
import { Upload, Camera, Microscope, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [detectionResult, setDetectionResult] = useState<{
    disease?: string;
    severity?: string;
    causes?: string[];
    treatment?: string;
  } | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image less than 5MB"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        simulateDiseaseDetection();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateDiseaseDetection = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setDetectionResult({
            disease: 'Apple Scab',
            severity: 'Moderate',
            causes: ['Fungal infection (Venturia inaequalis)', 'High humidity', 'Poor air circulation'],
            treatment: 'Apply copper-based fungicide and improve orchard ventilation. Prune affected areas and maintain proper tree spacing.'
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Disease Detection</h1>
        <p className="text-muted-foreground">
          Upload photos of leaves, branches, or fruits to detect early signs of disease using AI analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer block">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="max-h-64 mx-auto rounded-lg shadow-md"
                  />
                ) : (
                  <div className="space-y-4">
                    <Upload size={48} className="mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Click or drag and drop to upload
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <Button variant="outline" className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
              <Button 
                className="w-full"
                disabled={!selectedImage || isAnalyzing}
                onClick={() => simulateDiseaseDetection()}
              >
                <Microscope className="mr-2 h-4 w-4" />
                Analyze Image
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {detectionResult ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Analysis Results
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Awaiting Analysis
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">Analyzing image...</p>
                <Progress value={progress} />
              </div>
            ) : detectionResult ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Disease</h3>
                  <p className="text-muted-foreground">{detectionResult.disease}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Severity</h3>
                  <p className="text-muted-foreground">{detectionResult.severity}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Possible Causes</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {detectionResult.causes?.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Recommended Treatment</h3>
                  <p className="text-muted-foreground">{detectionResult.treatment}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <p>Upload an image and click "Analyze Image" to detect diseases</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;
