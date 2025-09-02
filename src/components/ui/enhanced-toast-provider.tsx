import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from 'next-themes';
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

export function EnhancedToastProvider() {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme as 'light' | 'dark' | 'system'}
      position="top-right"
      closeButton
      richColors
      expand={false}
      visibleToasts={4}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          color: 'hsl(var(--foreground))',
        },
        className: 'glass shadow-elegant',
      }}
      icons={{
        success: <CheckCircle className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <AlertCircle className="h-4 w-4" />,
        error: <XCircle className="h-4 w-4" />,
      }}
    />
  );
}

// Enhanced toast utilities
export const toast = {
  success: (message: string, options?: any) => {
    const { toast: sonnerToast } = require('sonner');
    return sonnerToast.success(message, {
      className: 'border-emerald-200 dark:border-emerald-800',
      ...options
    });
  },
  
  error: (message: string, options?: any) => {
    const { toast: sonnerToast } = require('sonner');
    return sonnerToast.error(message, {
      className: 'border-red-200 dark:border-red-800',
      ...options
    });
  },
  
  warning: (message: string, options?: any) => {
    const { toast: sonnerToast } = require('sonner');
    return sonnerToast.warning(message, {
      className: 'border-amber-200 dark:border-amber-800',
      ...options
    });
  },
  
  info: (message: string, options?: any) => {
    const { toast: sonnerToast } = require('sonner');
    return sonnerToast.info(message, {
      className: 'border-blue-200 dark:border-blue-800',
      ...options
    });
  },
  
  loading: (message: string, options?: any) => {
    const { toast: sonnerToast } = require('sonner');
    return sonnerToast.loading(message, {
      className: 'border-muted',
      ...options
    });
  },
  
  promise: (
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string | ((data: any) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    const { toast: sonnerToast } = require('sonner');
    return sonnerToast.promise(promise, messages);
  },
};