"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

export function Loading({ 
  message = "Loading...", 
  size = 'md', 
  variant = 'spinner',
  className 
}: LoadingProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      case 'md':
      default:
        return 'w-6 h-6';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'md':
      default:
        return 'text-base';
    }
  };

  const renderSpinner = () => (
    <div className={cn(
      "border-2 border-navy border-t-transparent rounded-full animate-spin",
      getSizeClasses()
    )}></div>
  );

  const renderDots = () => (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-navy rounded-full animate-pulse",
            size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'
          )}
          style={{ animationDelay: `${i * 0.2}s` }}
        ></div>
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={cn(
      "bg-navy/20 rounded-full animate-pulse",
      getSizeClasses()
    )}></div>
  );

  const renderIndicator = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={cn("flex items-center gap-2 text-navy", className)}>
      {renderIndicator()}
      <span className={getTextSize()}>{message}</span>
    </div>
  );
}

// Full screen loading component
export function FullScreenLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white flex items-center justify-center">
      <Loading message={message} size="lg" />
    </div>
  );
}

// Overlay loading component
export function LoadingOverlay({ message = "Loading...", isVisible }: { message?: string; isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <Loading message={message} size="lg" />
      </div>
    </div>
  );
}