import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/disease-detection/ImageUploader';
import AnalysisResults from '@/components/disease-detection/AnalysisResults';
import { diseaseDatabase } from '@/constants/diseaseData';
import { TreeDeciduous, Leaf, Microscope } from 'lucide-react';

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
      
      let validationProgress = 0;
      const interval = setInterval(() => {
        validationProgress += 20;
        setProgress(validationProgress);
        
        if (validationProgress >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          
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
    if (!selectedImage) return false;
    
    let hash = 0;
    for (let i = 0; i < Math.min(selectedImage.length, 100); i++) {
      hash = ((hash << 5) - hash) + selectedImage.charCodeAt(i);
      hash = hash & hash;
    }
    
    return Math.abs(hash) % 5 !== 0;
  };

  const simulateDiseaseDetection = async () => {
    setDetectionResult(null);
    
    const isValid = await validateImage();
    if (!isValid) {
      return;
    }
    
    setIsAnalyzing(true);
    setProgress(0);
    
    let hash = 0;
    if (selectedImage) {
      for (let i = 0; i < Math.min(selectedImage.length, 100); i++) {
        hash = ((hash << 5) - hash) + selectedImage.charCodeAt(i);
        hash = hash & hash;
      }
    }
    
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1MCA3NXYyNUgwdi0yNWgxNTB6bTAgNTB2MjVIMHYtMjVoMTUwek0wIDE1MHYyNWgxNTB2LTI1SDB6TTAgMHYyNWgxNTBWMEgweiIgZmlsbD0iIzAwNjkwMCIgZmlsbC1vcGFjaXR5PSIuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] bg-repeat opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-10 relative">
          <div className="absolute -z-10 inset-0 flex items-center justify-center opacity-10">
            <Microscope size={140} className="text-primary" />
            <Leaf size={120} className="text-green-600 ml-20 mt-10" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-primary bg-clip-text text-transparent mb-4">
            Disease Detection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload photos of leaves, branches, or fruits to detect early signs of disease using our advanced AI analysis. Early detection helps protect your orchard health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <ImageUploader
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            validationError={validationError}
            onAnalyze={simulateDiseaseDetection}
            isAnalyzing={isAnalyzing}
            isValidating={isValidating}
          />
          <AnalysisResults
            isValidating={isValidating}
            validationError={validationError}
            detectionResult={detectionResult}
            isAnalyzing={isAnalyzing}
            progress={progress}
            onReset={() => setValidationError(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
