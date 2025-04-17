
import React from 'react';
import { Upload, Camera, ImagePlus, ScanLine, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

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
    <Card className="overflow-hidden border border-primary/10 backdrop-blur-sm bg-white/90 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center gap-2 text-primary">
          <ImagePlus className="h-5 w-5" />
          Upload Image for Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary transition-colors group relative">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer block">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="max-h-64 mx-auto rounded-lg shadow-md transition-transform hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Upload size={32} className="text-primary" />
                </div>
                
                {!validationError && !isValidating && (
                  <div className="absolute -top-2 -right-2 bg-green-100 rounded-full p-1 border-2 border-white shadow-md">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 py-10">
                <ScanLine size={64} className="mx-auto text-primary/60" />
                <p className="text-muted-foreground">
                  Drop your image here or click to browse
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Supports: JPG, PNG, WEBP (max 5MB)
                </p>
                <p className="text-xs text-amber-500 font-medium mt-2">
                  * Only upload images of apples, leaves, branches, or trees
                </p>
              </div>
            )}
          </label>
        </div>

        {validationError && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Invalid Image Content</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        {selectedImage && !validationError && !isValidating && (
          <Alert className="bg-green-50 border-green-100 text-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Valid Image</AlertTitle>
            <AlertDescription>Your image is suitable for disease detection.</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="flex-1 min-w-[120px] border-primary/20 bg-primary/5 hover:bg-primary/10">
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
          <Button 
            className="flex-1 min-w-[120px] bg-gradient-to-r from-green-600 to-primary hover:from-green-700 hover:to-primary/90"
            disabled={!selectedImage || isAnalyzing || isValidating || validationError}
            onClick={onAnalyze}
          >
            <ScanLine className="mr-2 h-4 w-4" />
            Analyze Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
