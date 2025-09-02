import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)} aria-label="Breadcrumb">
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {item.href && !item.current ? (
            <Link
              to={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors px-1 py-1 rounded-md hover:bg-accent"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              "px-1 py-1 rounded-md",
              item.current ? "text-foreground font-medium bg-accent" : "text-muted-foreground"
            )}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export interface TabNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    count?: number;
    icon?: React.ElementType;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({ tabs, activeTab, onTabChange, className }: TabNavigationProps) {
  return (
    <div className={cn("border-b border-border", className)}>
      <nav className="flex space-x-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent",
                isActive
                  ? "text-primary border-primary"
                  : "text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
              )}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                {tab.label}
                {tab.count !== undefined && (
                  <span className={cn(
                    "px-2 py-0.5 text-xs rounded-full",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {tab.count}
                  </span>
                )}
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent/50 rounded-md -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}

export interface StepIndicatorProps {
  steps: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
  currentStep: string;
  completedSteps?: string[];
  className?: string;
}

export function StepIndicator({ steps, currentStep, completedSteps = [], className }: StepIndicatorProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <nav className={cn("", className)} aria-label="Progress">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isUpcoming = index > currentIndex;
          
          return (
            <li key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary text-primary bg-primary/10"
                      : "border-muted-foreground text-muted-foreground"
                  )}
                  whileHover={{ scale: 1.05 }}
                  animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isCompleted ? "✓" : index + 1}
                </motion.div>
                
                <div className="mt-2">
                  <p className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-4",
                  index < currentIndex ? "bg-primary" : "bg-muted"
                )} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}