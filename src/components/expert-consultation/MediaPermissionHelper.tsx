import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Mic, Info, RefreshCw } from 'lucide-react';

interface MediaPermissionHelperProps {
  onRetry: () => void;
}

export function MediaPermissionHelper({ onRetry }: MediaPermissionHelperProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera & Microphone Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            To join video calls, please allow access to your camera and microphone.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h4 className="font-medium">How to enable permissions:</h4>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">1</span>
              <span>Look for the camera icon in your browser's address bar</span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">2</span>
              <span>Click on it and select "Allow" for both camera and microphone</span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">3</span>
              <span>Click "Try Again" below to test your devices</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Having trouble?</strong> You can still join calls with audio only. 
            Your browser will ask for permissions when you start a call.
          </p>
        </div>

        <Button onClick={onRetry} className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}