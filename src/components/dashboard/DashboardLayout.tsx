"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { DashboardLayoutProps } from "@/types";

export function DashboardLayout({ 
  children, 
  title, 
  description,
  showBackButton = false,
  className 
}: DashboardLayoutProps & { className?: string }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white flex items-center justify-center">
        <div className="flex items-center gap-2 text-navy">
          <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-b from-sand/10 via-white/50 to-white", className)}>
      {/* Header */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-sage/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/6 w-40 h-40 bg-coral/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-12 shadow-glass border border-white/20 mb-8">
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-navy hover:text-sage transition-colors mb-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            )}
            
            <h1 className="text-5xl md:text-6xl font-display font-bold text-luxury mb-6">
              {title}
            </h1>
            
            {description && (
              <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
            
            <div className="w-24 h-1 bg-gradient-to-r from-sage to-coral mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </section>
    </div>
  );
}