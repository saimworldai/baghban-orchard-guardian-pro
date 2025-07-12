import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDiseaseDetection } from '@/hooks/useDiseaseDetection';
import { format } from 'date-fns';

export function DiseaseAnalyzer() {
  const {
    detections,
    isLoading,
    selectedImage,
    previewUrl,
    handleImageSelect,
    analyzeImage,
    isUploading,
    isAnalyzing
  } = useDiseaseDetection();

  const [cropType, setCropType] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleAnalyze = () => {
    analyzeImage(cropType);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Disease Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="crop-type">Crop Type (Optional)</Label>
              <Input
                id="crop-type"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                placeholder="e.g., Tomato, Wheat, Rice"
              />
            </div>

            <div>
              <Label htmlFor="image-upload">Upload Plant Image</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Selected plant"
                      className="max-w-full h-48 object-contain mx-auto rounded"
                    />
                    <Button onClick={handleAnalyze} disabled={isUploading || isAnalyzing}>
                      {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Click to upload an image</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {(isUploading || isAnalyzing) && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{isUploading ? 'Uploading image...' : 'Analyzing disease...'}</span>
                </div>
                <Progress value={isUploading ? 50 : 75} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading recent analyses...</p>
            ) : detections.length > 0 ? (
              <div className="space-y-4">
                {detections.slice(0, 3).map((detection) => (
                  <div key={detection.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={detection.image_url}
                        alt="Analyzed plant"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {detection.detected_disease ? (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">
                            {detection.detected_disease || 'Healthy Plant'}
                          </span>
                        </div>
                        {detection.confidence && (
                          <p className="text-sm text-muted-foreground">
                            Confidence: {detection.confidence}%
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(detection.created_at), 'PPp')}
                        </p>
                      </div>
                    </div>
                    {detection.recommendations && (
                      <div className="mt-3 p-3 bg-muted rounded">
                        <p className="text-sm font-medium mb-1">Recommendations:</p>
                        <p className="text-sm">{detection.recommendations}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No analyses yet. Upload an image to get started!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Detections */}
      {detections.length > 3 && (
        <Card>
          <CardHeader>
            <CardTitle>All Disease Detections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {detections.slice(3).map((detection) => (
                <div key={detection.id} className="border rounded-lg p-3">
                  <img
                    src={detection.image_url}
                    alt="Analyzed plant"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">
                      {detection.detected_disease || 'Healthy Plant'}
                    </p>
                    {detection.confidence && (
                      <p className="text-xs text-muted-foreground">
                        {detection.confidence}% confidence
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(detection.created_at), 'PP')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}