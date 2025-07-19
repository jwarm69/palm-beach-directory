"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { EmptyStateProps } from "@/types";

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className
}: EmptyStateProps & { className?: string }) {
  
  return (
    <Card className={cn("card-glass", className)}>
      <CardContent className="p-12 text-center">
        <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
          {icon}
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-luxury mb-4">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
        
        {(actionLabel && (actionHref || onAction)) && (
          <>
            {actionHref ? (
              <Link href={actionHref}>
                <Button className="btn-sage group">
                  {actionLabel}
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={onAction}
                className="btn-sage group"
              >
                {actionLabel}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}