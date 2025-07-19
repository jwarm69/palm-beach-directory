"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatCardProps } from "@/types";

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  color = "sage",
  trend,
  className 
}: StatCardProps & { className?: string }) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'coral':
        return 'text-coral bg-coral/5 border-coral/20';
      case 'gold':
        return 'text-gold bg-gold/5 border-gold/20';
      case 'navy':
        return 'text-navy bg-navy/5 border-navy/20';
      case 'sage':
      default:
        return 'text-sage bg-sage/5 border-sage/20';
    }
  };

  const getTrendColor = (isPositive: boolean) => {
    return isPositive 
      ? 'text-green-600 bg-green-50' 
      : 'text-red-600 bg-red-50';
  };

  return (
    <Card className={cn("card-glass transition-all duration-200 hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {icon && (
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  getColorClasses(color)
                )}>
                  {icon}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-luxury">{value}</p>
              </div>
            </div>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          
          {trend && (
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
              getTrendColor(trend.isPositive)
            )}>
              <svg 
                className={cn(
                  "w-3 h-3",
                  trend.isPositive ? "rotate-0" : "rotate-180"
                )} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}