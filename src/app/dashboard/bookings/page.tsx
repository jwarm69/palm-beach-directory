"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { eventBookings, conciergeBookings, cancelEventBooking, cancelConciergeBooking } = useBooking();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("events");

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
          Loading your bookings...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const upcomingEvents = eventBookings.filter(booking => 
    new Date(booking.eventDate) > new Date() && booking.status !== 'cancelled'
  );
  const pastEvents = eventBookings.filter(booking => 
    new Date(booking.eventDate) <= new Date() || booking.status === 'cancelled'
  );

  const activeConcierge = conciergeBookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'pending'
  );
  const completedConcierge = conciergeBookings.filter(booking => 
    booking.status === 'cancelled'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 via-white/50 to-white">
      {/* Header */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-coral/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/6 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-12 shadow-glass border border-white/20 mb-8">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-luxury mb-6">
              My Bookings
            </h1>
            <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto leading-relaxed">
              Manage your event reservations and concierge service appointments
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-coral to-gold mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Bookings Content */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="events" className="data-[state=active]:bg-coral data-[state=active]:text-white">
                Event Reservations ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="concierge" className="data-[state=active]:bg-gold data-[state=active]:text-white">
                Concierge Services ({activeConcierge.length})
              </TabsTrigger>
            </TabsList>

            {/* Event Bookings Tab */}
            <TabsContent value="events" className="space-y-8">
              {/* Upcoming Events */}
              <div>
                <h2 className="text-3xl font-display font-bold text-luxury mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upcoming Events
                </h2>
                
                {upcomingEvents.length === 0 ? (
                  <Card className="card-glass p-12 text-center">
                    <div className="w-20 h-20 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-luxury mb-4">No Upcoming Events</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Discover exclusive fashion shows, trunk shows, and VIP shopping events
                    </p>
                    <Link href="/events">
                      <Button className="btn-luxury group">
                        Browse Events
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {upcomingEvents.map((booking) => (
                      <Card key={booking.id} className="card-premium group">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-xl font-display font-semibold text-luxury">{booking.eventTitle}</h3>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                              
                              <div className="space-y-2 text-gray-600">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {formatDate(booking.eventDate)} at {formatTime(booking.eventTime)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {booking.location}
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                  </svg>
                                  {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                                </div>
                                {booking.specialRequests && (
                                  <div className="flex items-start gap-2 mt-3">
                                    <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <span className="text-sm">{booking.specialRequests}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button 
                                variant="outline" 
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => cancelEventBooking(booking.id)}
                              >
                                Cancel Booking
                              </Button>
                              <Button className="btn-glass group">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold text-gray-700 mb-6">Past Events</h2>
                  <div className="grid gap-4">
                    {pastEvents.slice(0, 3).map((booking) => (
                      <Card key={booking.id} className="card-luxury opacity-75">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-navy">{booking.eventTitle}</h4>
                              <p className="text-sm text-gray-600">{formatDate(booking.eventDate)}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Concierge Services Tab */}
            <TabsContent value="concierge" className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-luxury mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Active Services
                </h2>
                
                {activeConcierge.length === 0 ? (
                  <Card className="card-glass p-12 text-center">
                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-luxury mb-4">No Active Services</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Book personal shopping, styling consultations, or VIP concierge services
                    </p>
                    <Link href="/concierge">
                      <Button className="btn-gold group">
                        Book Services
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {activeConcierge.map((booking) => (
                      <Card key={booking.id} className="card-premium group">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-xl font-display font-semibold text-luxury">{booking.serviceTitle}</h3>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                              
                              <div className="space-y-2 text-gray-600">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {formatDate(booking.date)} at {formatTime(booking.time)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {booking.duration}
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                  ${booking.price}
                                </div>
                                {booking.preferences && (
                                  <div className="mt-3 p-3 bg-sand/10 rounded-lg">
                                    <div className="text-sm font-medium text-navy mb-1">Preferences:</div>
                                    {booking.preferences.budget && (
                                      <div className="text-sm text-gray-600">Budget: {booking.preferences.budget}</div>
                                    )}
                                    {booking.preferences.stylist && (
                                      <div className="text-sm text-gray-600">Stylist: {booking.preferences.stylist}</div>
                                    )}
                                    {booking.preferences.categories && booking.preferences.categories.length > 0 && (
                                      <div className="text-sm text-gray-600">
                                        Categories: {booking.preferences.categories.join(', ')}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button 
                                variant="outline" 
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => cancelConciergeBooking(booking.id)}
                              >
                                Cancel Service
                              </Button>
                              <Button className="btn-glass group">
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Cancelled Services */}
              {completedConcierge.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold text-gray-700 mb-6">Cancelled Services</h2>
                  <div className="grid gap-4">
                    {completedConcierge.slice(0, 3).map((booking) => (
                      <Card key={booking.id} className="card-luxury opacity-75">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-navy">{booking.serviceTitle}</h4>
                              <p className="text-sm text-gray-600">{formatDate(booking.date)}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}