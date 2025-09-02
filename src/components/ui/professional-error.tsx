import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

export interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export function ErrorFallback({ 
  error, 
  resetError, 
  title = "Something went wrong", 
  description,
  showHomeButton = true,
  showBackButton = true 
}: ErrorFallbackProps) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="glass shadow-elegant border-destructive/20">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </motion.div>
            
            <CardTitle className="text-xl font-bold text-foreground">
              {title}
            </CardTitle>
            
            <CardDescription className="text-muted-foreground">
              {description || "We're sorry, but something unexpected happened. Please try again."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && process.env.NODE_ENV === 'development' && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {error.message}
                </p>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              {resetError && (
                <Button 
                  onClick={resetError}
                  className="w-full hover-lift"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
              
              {showHomeButton && (
                <Button 
                  onClick={handleGoHome}
                  variant="outline"
                  className="w-full hover-lift"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              )}
              
              {showBackButton && (
                <Button 
                  onClick={handleGoBack}
                  variant="ghost"
                  className="w-full hover-lift"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export interface NotFoundPageProps {
  title?: string;
  description?: string;
  showSearchButton?: boolean;
}

export function NotFoundPage({ 
  title = "Page Not Found", 
  description = "The page you're looking for doesn't exist or has been moved.",
  showSearchButton = false 
}: NotFoundPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl font-bold text-gradient-primary mb-4"
        >
          404
        </motion.div>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {title}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {description}
        </p>
        
        <div className="flex flex-col gap-2">
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full hover-lift"
            variant="default"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          {showSearchButton && (
            <Button 
              variant="outline"
              className="w-full hover-lift"
            >
              Search Site
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}