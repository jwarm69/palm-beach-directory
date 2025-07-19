"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white flex items-center justify-center">
        <div className="flex items-center gap-2 text-navy">
          <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
          Loading your dashboard...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'from-purple-500 to-purple-600';
      case 'premium': return 'from-gold to-yellow-500';
      default: return 'from-sage to-green-500';
    }
  };

  const getMembershipPerks = (tier: string) => {
    switch (tier) {
      case 'vip': 
        return ['Exclusive Event Access', 'Personal Concierge', 'Priority Reservations', 'Complimentary Services'];
      case 'premium':
        return ['Early Event Access', 'Concierge Services', 'Member Discounts', 'Special Offers'];
      default:
        return ['Event Notifications', 'Basic Support', 'Store Updates'];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                Welcome back, {user.firstName}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Your personalized Palm Beach luxury shopping experience awaits.
              </p>
            </div>
            
            {/* Membership Card */}
            <Card className={`w-full lg:w-80 bg-gradient-to-br ${getMembershipColor(user.membershipTier)} text-white relative overflow-hidden`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl">
                      {user.membershipTier === 'vip' ? 'VIP Member' : 
                       user.membershipTier === 'premium' ? 'Premium Member' : 'Member'}
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Member since {new Date(user.joinDate).getFullYear()}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{user.firstName[0]}{user.lastName[0]}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{user.firstName} {user.lastName}</div>
                  <div className="text-white/80 text-sm">{user.email}</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-sm text-white/80 mb-2">Member Benefits:</div>
                  <div className="space-y-1">
                    {getMembershipPerks(user.membershipTier).slice(0, 2).map((perk, index) => (
                      <div key={index} className="text-xs flex items-center gap-1">
                        <span className="text-white">✓</span>
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="card-luxury text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-navy mb-2">{user.stats.eventsAttended}</div>
                <div className="text-gray-600">Events Attended</div>
              </CardContent>
            </Card>
            
            <Card className="card-luxury text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-navy mb-2">{user.stats.conciergeBookings}</div>
                <div className="text-gray-600">Concierge Services</div>
              </CardContent>
            </Card>
            
            <Card className="card-luxury text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-navy mb-2">{user.stats.favoriteStores}</div>
                <div className="text-gray-600">Favorite Stores</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-navy mb-8">Quick Actions</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/events">
              <Card className="card-luxury group cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">Browse Events</h3>
                  <p className="text-sm text-gray-600">Discover upcoming fashion shows and exclusive events</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/concierge">
              <Card className="card-luxury group cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">Book Concierge</h3>
                  <p className="text-sm text-gray-600">Schedule personal shopping and VIP services</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/stores">
              <Card className="card-luxury group cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">Explore Stores</h3>
                  <p className="text-sm text-gray-600">Discover new boutiques and exclusive offers</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/profile">
              <Card className="card-luxury group cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-2">Manage Profile</h3>
                  <p className="text-sm text-gray-600">Update preferences and account settings</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Upgrade CTA */}
      {user.membershipTier !== 'vip' && (
        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-navy mb-4">
              Upgrade to VIP Experience
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Unlock exclusive access to private events, personal concierge services, and premium benefits.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {['Exclusive Events', 'Personal Concierge', 'Priority Access'].map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
              Upgrade Membership
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}