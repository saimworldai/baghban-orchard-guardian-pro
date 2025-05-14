
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to create optimized image loading
export function optimizeImage(src: string, width: number = 500): string {
  // If it's already an optimized image URL, return as is
  if (src.includes('?w=') || !src || src.startsWith('data:')) {
    return src;
  }
  
  // For external images (like those from APIs)
  if (src.startsWith('http')) {
    return `${src}${src.includes('?') ? '&' : '?'}w=${width}&q=75&auto=format`;
  }
  
  // For local images
  return src;
}

// Format date for better display
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Format time for better display
export function formatTime(time: Date | string): string {
  const t = typeof time === 'string' ? new Date(time) : time;
  return t.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
