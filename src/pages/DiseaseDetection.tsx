
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/disease-detection/ImageUploader';
import AnalysisResults from '@/components/disease-detection/AnalysisResults';
import { diseaseDatabase } from '@/constants/diseaseData';

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
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Disease Detection</h1>
        <p className="text-muted-foreground">
          Upload photos of leaves, branches, or fruits to detect early signs of disease using AI analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
  );
};

export default DiseaseDetection;
