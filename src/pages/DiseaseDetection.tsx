
import React, { useState } from 'react';
import { Upload, Camera, Microscope, AlertTriangle, CheckCircle, ImageOff, Leaf, Apple, TreeDeciduous } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
  const [isValidating, setIsValidating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [detectionResult, setDetectionResult] = useState<{
    disease?: string;
    severity?: string;
    causes?: string[];
    treatment?: string;
  } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

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
        setValidationError(null);
        setDetectionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateImage = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setIsValidating(true);
      setProgress(0);
      
      // Simulating image validation process
      let validationProgress = 0;
      const interval = setInterval(() => {
        validationProgress += 20;
        setProgress(validationProgress);
        
        if (validationProgress >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          
          // Simulate validation based on image data
          // In a real app, this would use ML to identify the image content
          const isAppleOrTree = simulateImageContentCheck();
          
          if (!isAppleOrTree) {
            setValidationError("The uploaded image does not appear to contain apples, leaves, branches, or trees. Please upload a relevant image for disease detection.");
            resolve(false);
          } else {
            setValidationError(null);
            resolve(true);
          }
        }
      }, 100);
    });
  };

  const simulateImageContentCheck = (): boolean => {
    // In a real app, this would use ML to analyze the image content
    // For simulation purposes, we'll return true most of the time, but occasionally false
    // This is based on a hash of the image data
    if (!selectedImage) return false;
    
    let hash = 0;
    for (let i = 0; i < Math.min(selectedImage.length, 100); i++) {
      hash = ((hash << 5) - hash) + selectedImage.charCodeAt(i);
      hash = hash & hash;
    }
    
    // Return false approximately 20% of the time for testing purposes
    return Math.abs(hash) % 5 !== 0;
  };

  const simulateDiseaseDetection = async () => {
    // First validate the image
    setDetectionResult(null);
    
    const isValid = await validateImage();
    if (!isValid) {
      return;
    }
    
    // Proceed with disease detection if image is valid
    setIsAnalyzing(true);
    setProgress(0);
    
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

            {validationError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Invalid Image</AlertTitle>
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Button variant="outline" className="flex-1 min-w-[120px]">
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
              <Button 
                className="flex-1 min-w-[120px]"
                disabled={!selectedImage || isAnalyzing || isValidating}
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
              {isValidating ? (
                <>
                  <TreeDeciduous className="h-5 w-5 text-blue-500 animate-pulse" />
                  Validating Image...
                </>
              ) : validationError ? (
                <>
                  <ImageOff className="h-5 w-5 text-red-500" />
                  Image Validation Failed
                </>
              ) : detectionResult ? (
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
            {isValidating ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Leaf className="h-5 w-5 text-green-500" />
                  <Apple className="h-5 w-5 text-red-500" />
                  <TreeDeciduous className="h-5 w-5 text-green-700" />
                </div>
                <p className="text-center text-muted-foreground">Checking if image contains apple, leaves, branches or trees...</p>
                <Progress value={progress} />
              </div>
            ) : isAnalyzing ? (
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">Analyzing image...</p>
                <Progress value={progress} />
              </div>
            ) : validationError ? (
              <div className="flex flex-col items-center justify-center p-6">
                <ImageOff size={48} className="text-red-500 mb-4" />
                <p className="text-center text-muted-foreground">{validationError}</p>
                <Button variant="outline" className="mt-4" onClick={() => setValidationError(null)}>
                  Try Another Image
                </Button>
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
