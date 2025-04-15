
import React from 'react';
import { Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  selectedImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validationError: string | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isValidating: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImage,
  onImageUpload,
  validationError,
  onAnalyze,
  isAnalyzing,
  isValidating
}) => {
  return (
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
            onChange={onImageUpload}
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
            onClick={onAnalyze}
          >
            <Upload className="mr-2 h-4 w-4" />
            Analyze Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
