"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn, getMembershipColor, getMembershipLabel } from "@/lib/utils";
import type { MembershipBadgeProps } from "@/types";

export function MembershipBadge({ 
  tier, 
  joinDate, 
  className 
}: MembershipBadgeProps) {
  const joinYear = new Date(joinDate).getFullYear();
  
  return (
    <Card className={cn(
      "w-64 bg-gradient-to-br text-white",
      `bg-gradient-to-br ${getMembershipColor(tier)}`,
      className
    )}>
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          {tier === 'vip' && (
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          )}
          {tier === 'premium' && (
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          )}
          {tier === 'standard' && (
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          )}
          <div className="text-lg font-semibold">
            {getMembershipLabel(tier)}
          </div>
        </div>
        
        <div className="text-white/80 text-sm">
          Since {joinYear}
        </div>
        
        {tier === 'vip' && (
          <div className="mt-2 text-xs text-white/70">
            Lifetime Exclusive Access
          </div>
        )}
        
        {tier === 'premium' && (
          <div className="mt-2 text-xs text-white/70">
            Premium Benefits Active
          </div>
        )}
        
        {tier === 'standard' && (
          <div className="mt-2 text-xs text-white/70">
            Valued Member
          </div>
        )}
      </CardContent>
    </Card>
  );
}