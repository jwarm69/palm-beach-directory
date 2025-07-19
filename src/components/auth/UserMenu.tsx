"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface UserMenuProps {
  onAuthClick: () => void;
}

export default function UserMenu({ onAuthClick }: UserMenuProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'text-purple-600 bg-purple-50';
      case 'premium': return 'text-gold bg-gold/10';
      default: return 'text-sage bg-sage/10';
    }
  };

  const getMembershipLabel = (tier: string) => {
    switch (tier) {
      case 'vip': return 'VIP Member';
      case 'premium': return 'Premium Member';
      default: return 'Member';
    }
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onAuthClick} className="btn-gold">
        Sign In
      </Button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-sand/10 transition-colors"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-sage/20 rounded-full flex items-center justify-center">
          <span className="text-navy font-semibold">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <div className="font-medium text-navy">
            {user?.firstName} {user?.lastName}
          </div>
          <div className={`text-xs px-2 py-0.5 rounded-full ${getMembershipColor(user?.membershipTier || 'standard')}`}>
            {getMembershipLabel(user?.membershipTier || 'standard')}
          </div>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <Card className="absolute right-0 top-full mt-2 w-64 shadow-luxury border-sand/40 z-50">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-sand/20">
              <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-sage/20 rounded-full flex items-center justify-center">
                <span className="text-navy font-semibold text-lg">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-navy">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-sm text-gray-600">{user?.email}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getMembershipColor(user?.membershipTier || 'standard')}`}>
                  {getMembershipLabel(user?.membershipTier || 'standard')}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-sand/10 hover:text-navy rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Dashboard
              </Link>
              
              <Link 
                href="/dashboard/bookings" 
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-sand/10 hover:text-navy rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                My Bookings
              </Link>
              
              <Link 
                href="/dashboard/offers" 
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-sand/10 hover:text-navy rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Digital Wallet
              </Link>
              
              <Link 
                href="/dashboard/favorites" 
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-sand/10 hover:text-navy rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorites
              </Link>
              
              <Link 
                href="/dashboard/profile" 
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-sand/10 hover:text-navy rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>

              {user?.membershipTier !== 'vip' && (
                <Link 
                  href="/membership" 
                  className="flex items-center gap-3 p-2 text-purple-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Upgrade to VIP
                </Link>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-sand/20">
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}