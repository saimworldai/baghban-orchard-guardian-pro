
import React, { useState } from 'react';
import { Upload, Camera, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<{
    disease?: string;
    severity?: string;
    causes?: string[];
    treatment?: string;
  } | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        // TODO: Implement AI disease detection
        simulateDiseaseDetection();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateDiseaseDetection = () => {
    // Placeholder for future AI integration
    setDetectionResult({
      disease: 'Apple Scab',
      severity: 'Moderate',
      causes: ['Fungal infection', 'High humidity'],
      treatment: 'Apply fungicide and improve air circulation'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Disease Detection</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="border-2 border-dashed p-8 rounded-lg text-center">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
            <Upload size={48} className="text-primary mb-2" />
            <span>Upload Leaf/Fruit Image</span>
          </label>
        </div>

        {selectedImage && (
          <div className="mt-4 text-center">
            <img 
              src={selectedImage} 
              alt="Uploaded" 
              className="max-w-xs mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {detectionResult && (
          <div className="mt-4 p-4 bg-secondary/10 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold flex items-center">
              <CheckCircle className="mr-2 text-green-500" /> 
              Disease Detection Results
            </h2>
            <div className="mt-2">
              <p><strong>Disease:</strong> {detectionResult.disease}</p>
              <p><strong>Severity:</strong> {detectionResult.severity}</p>
              <p><strong>Possible Causes:</strong> {detectionResult.causes?.join(', ')}</p>
              <p><strong>Recommended Treatment:</strong> {detectionResult.treatment}</p>
            </div>
          </div>
        )}

        <div className="flex space-x-4 mt-4">
          <Button variant="outline">
            <Camera className="mr-2" /> Take Photo
          </Button>
          <Button disabled={!selectedImage}>
            Analyze Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
