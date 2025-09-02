import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { LoadingSpinner } from './loading-states';
import { cn } from '@/lib/utils';

export interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
  pulse?: boolean;
  glow?: boolean;
}

export const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    children, 
    loading, 
    icon: Icon, 
    iconPosition = 'left', 
    pulse, 
    glow, 
    disabled, 
    className, 
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <motion.div
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        className={cn(
          pulse && "animate-pulse-subtle",
          glow && "shadow-glow"
        )}
      >
        <Button
          ref={ref}
          disabled={isDisabled}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            loading && "cursor-not-allowed",
            className
          )}
          {...props}
        >
          {/* Loading overlay */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-background/20 backdrop-blur-sm flex items-center justify-center"
            >
              <LoadingSpinner size="sm" />
            </motion.div>
          )}
          
          {/* Content */}
          <div className={cn(
            "flex items-center gap-2",
            loading && "opacity-50"
          )}>
            {Icon && iconPosition === 'left' && (
              <Icon className="w-4 h-4" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon className="w-4 h-4" />
            )}
          </div>
        </Button>
      </motion.div>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";