import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreeDeciduous, ImageOff, CheckCircle, AlertTriangle, Leaf, Apple, Bug, Microscope, Gauge, Droplets, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalysisResultsProps {
  isValidating: boolean;
  validationError: string | null;
  detectionResult: {
    disease?: string;
    severity?: string;
    causes?: string[];
    treatment?: string;
    imageExplanation?: string;
    prevention?: string;
    cure?: string;
    sprayUsage?: string;
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
    <Card className="overflow-hidden border border-primary/10 backdrop-blur-sm bg-white/90 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center gap-2 text-primary">
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
              <Microscope className="h-5 w-5 text-green-600" />
              Analysis Results
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Awaiting Analysis
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isValidating ? (
          <div className="space-y-4 py-8">
            <div className="flex items-center justify-center gap-6">
              <Leaf className="h-8 w-8 text-green-500 animate-pulse" />
              <Apple className="h-8 w-8 text-red-500 animate-pulse delay-100" />
              <TreeDeciduous className="h-8 w-8 text-green-700 animate-pulse delay-200" />
            </div>
            <p className="text-center text-muted-foreground font-medium">
              Verifying image content...
            </p>
            <p className="text-center text-sm text-muted-foreground/80">
              Checking if image contains apple, leaves, branches or trees
            </p>
            <Progress value={progress} className="h-2 bg-primary/10" />
          </div>
        ) : isAnalyzing ? (
          <div className="space-y-4 py-8">
            <div className="flex items-center justify-center">
              <Bug className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <p className="text-center text-muted-foreground font-medium">
              Analyzing image using AI...
            </p>
            <Progress value={progress} className="h-2 bg-primary/10" />
          </div>
        ) : validationError ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="p-6 rounded-full bg-red-50 mb-4">
              <ImageOff size={48} className="text-red-500" />
            </div>
            <p className="text-center text-muted-foreground mb-4">{validationError}</p>
            <Button variant="outline" className="mt-2 border-primary/20" onClick={onReset}>
              Try Another Image
            </Button>
          </div>
        ) : detectionResult ? (
          <div className="space-y-6 py-4 max-h-[540px] overflow-y-auto pr-2">
            {detectionResult.imageExplanation && (
              <div className="space-y-2 bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-lg text-blue-900 flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-blue-700" />
                  Image Analysis
                </h3>
                <p className="text-muted-foreground">{detectionResult.imageExplanation}</p>
              </div>
            )}
            
            {detectionResult.disease && (
              <div className="space-y-4 bg-green-50/50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold text-lg text-green-900">{detectionResult.disease}</h3>
                </div>
                {detectionResult.severity && (
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-amber-500" />
                    <span className="font-medium text-sm">Severity: </span>
                    <span className={`text-sm px-2 py-0.5 rounded ${detectionResult.severity === 'Severe' ? 'bg-red-100 text-red-700' : detectionResult.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {detectionResult.severity}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {detectionResult.causes && detectionResult.causes.length > 0 && (
              <div>
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" /> Possible Causes
                </h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {detectionResult.causes.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {detectionResult.prevention && (
              <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100">
                <h3 className="font-semibold text-emerald-700 mb-2 flex items-center gap-1">
                  <Sprout className="h-4 w-4" /> Prevention
                </h3>
                <p className="text-muted-foreground">{detectionResult.prevention}</p>
              </div>
            )}

            {detectionResult.treatment && (
              <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Recommended Treatment
                </h3>
                <p className="text-muted-foreground">{detectionResult.treatment}</p>
              </div>
            )}
            
            {detectionResult.cure && (
              <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
                <h3 className="font-semibold text-purple-700 mb-2 flex items-center gap-1">
                  <Sprout className="h-4 w-4" /> Cure
                </h3>
                <p className="text-muted-foreground">{detectionResult.cure}</p>
              </div>
            )}
            
            {detectionResult.sprayUsage && (
              <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
                <h3 className="font-semibold text-amber-700 mb-2 flex items-center gap-1">
                  <Droplets className="h-4 w-4" /> Spray Usage
                </h3>
                <p className="text-muted-foreground">{detectionResult.sprayUsage}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-primary/5 p-6 mb-4">
              <Microscope size={48} className="text-primary/60" />
            </div>
            <p className="text-muted-foreground">
              Upload an image and click "Analyze Image" to detect diseases
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2 max-w-xs">
              Our AI can analyze leaves, branches, fruits, and trees to identify common apple orchard diseases
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
