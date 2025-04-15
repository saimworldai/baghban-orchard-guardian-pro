
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreeDeciduous, ImageOff, CheckCircle, AlertTriangle, Leaf, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalysisResultsProps {
  isValidating: boolean;
  validationError: string | null;
  detectionResult: {
    disease?: string;
    severity?: string;
    causes?: string[];
    treatment?: string;
  } | null;
  isAnalyzing: boolean;
  progress: number;
  onReset?: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  isValidating,
  validationError,
  detectionResult,
  isAnalyzing,
  progress,
  onReset
}) => {
  return (
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
            <p className="text-center text-muted-foreground">
              Checking if image contains apple, leaves, branches or trees...
            </p>
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
            <Button variant="outline" className="mt-4" onClick={onReset}>
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
  );
};

export default AnalysisResults;
