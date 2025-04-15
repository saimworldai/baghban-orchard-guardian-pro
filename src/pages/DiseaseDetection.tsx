
import React, { useState } from 'react';
import { Upload, Camera, Microscope, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Disease database for different detection results
const diseaseDatabase = [
  {
    disease: 'Apple Scab',
    severity: 'Moderate',
    causes: ['Fungal infection (Venturia inaequalis)', 'High humidity', 'Poor air circulation'],
    treatment: 'Apply copper-based fungicide and improve orchard ventilation. Prune affected areas and maintain proper tree spacing.'
  },
  {
    disease: 'Fire Blight',
    severity: 'Severe',
    causes: ['Bacterial infection (Erwinia amylovora)', 'Warm, wet spring weather', 'Insect carriers'],
    treatment: 'Remove infected branches by cutting at least 12 inches below visible symptoms. Sterilize pruning tools between cuts. Apply streptomycin sprays during bloom period.'
  },
  {
    disease: 'Cedar Apple Rust',
    severity: 'Mild',
    causes: ['Fungal pathogen (Gymnosporangium juniperi-virginianae)', 'Proximity to cedar trees', 'Spring rainfall'],
    treatment: 'Plant resistant apple varieties. Apply fungicides at bud break and during early fruit development. Remove nearby cedar trees if possible.'
  },
  {
    disease: 'Powdery Mildew',
    severity: 'Moderate',
    causes: ['Fungal infection (Podosphaera leucotricha)', 'High humidity with moderate temperatures', 'Poor air circulation'],
    treatment: 'Apply sulfur-based fungicides at first sign of infection. Increase spacing between trees. Prune to improve air circulation.'
  },
  {
    disease: 'Sooty Blotch',
    severity: 'Mild',
    causes: ['Fungal complex', 'Long periods of high humidity', 'Rainy seasons'],
    treatment: 'Apply fungicides during fruit development. Thin fruit to improve air circulation. Prune trees to open canopy.'
  }
];

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
        // Don't automatically analyze - wait for user to click the button
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateDiseaseDetection = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setDetectionResult(null);
    
    // Determine a "hash" from the image data to select a disease consistently for the same image
    let hash = 0;
    if (selectedImage) {
      for (let i = 0; i < Math.min(selectedImage.length, 100); i++) {
        hash = ((hash << 5) - hash) + selectedImage.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
    }
    
    // Use the absolute value of hash to ensure it's positive
    const diseaseIndex = Math.abs(hash) % diseaseDatabase.length;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setDetectionResult(diseaseDatabase[diseaseIndex]);
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
