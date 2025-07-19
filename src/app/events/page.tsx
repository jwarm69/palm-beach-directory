"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  type: 'fashion-show' | 'trunk-show' | 'vip-event' | 'workshop' | 'opening' | 'seasonal';
  date: string;
  time: string;
  endTime?: string;
  location: string;
  store?: string;
  description: string;
  image: string;
  price: number;
  maxAttendees?: number;
  currentAttendees: number;
  isExclusive: boolean;
  requiresRSVP: boolean;
  perks?: string[];
}

const events: Event[] = [
  {
    id: 1,
    title: "Spring Fashion Preview",
    type: "fashion-show",
    date: "2025-02-15",
    time: "19:00",
    endTime: "21:00",
    location: "Worth Avenue Plaza",
    store: "C. Orrico",
    description: "An exclusive preview of the Spring 2025 collection featuring the latest trends in luxury fashion. Includes champagne reception and personal styling consultations.",
    image: "/api/placeholder/400/300",
    price: 125,
    maxAttendees: 50,
    currentAttendees: 32,
    isExclusive: true,
    requiresRSVP: true,
    perks: ["Champagne Reception", "20% Discount", "Personal Styling", "Gift Bag"]
  },
  {
    id: 2,
    title: "Tiffany & Co. Diamond Workshop",
    type: "workshop",
    date: "2025-02-20",
    time: "15:00",
    endTime: "17:00",
    location: "Tiffany & Co. Worth Avenue",
    store: "Tiffany & Co.",
    description: "Learn about diamond grading, cuts, and how to select the perfect piece. Led by certified gemologists with hands-on examination of rare stones.",
    image: "/api/placeholder/400/300",
    price: 75,
    maxAttendees: 12,
    currentAttendees: 8,
    isExclusive: true,
    requiresRSVP: true,
    perks: ["Expert Consultation", "Certificate", "Refreshments", "Exclusive Access"]
  },
  {
    id: 3,
    title: "Hermès Leather Goods Trunk Show",
    type: "trunk-show",
    date: "2025-02-25",
    time: "10:00",
    endTime: "18:00",
    location: "Hermès Worth Avenue",
    store: "Hermès",
    description: "Exclusive showcase of the latest leather goods collection including limited edition pieces not available in regular inventory.",
    image: "/api/placeholder/400/300",
    price: 0,
    maxAttendees: 30,
    currentAttendees: 22,
    isExclusive: true,
    requiresRSVP: true,
    perks: ["Private Viewing", "Complimentary Refreshments", "Gift with Purchase"]
  },
  {
    id: 4,
    title: "VIP Shopping Night",
    type: "vip-event",
    date: "2025-03-01",
    time: "18:00",
    endTime: "22:00",
    location: "Multiple Worth Avenue Stores",
    description: "After-hours exclusive shopping experience across Worth Avenue's finest boutiques. Includes personal shopping services and special offers.",
    image: "/api/placeholder/400/300",
    price: 250,
    maxAttendees: 100,
    currentAttendees: 67,
    isExclusive: true,
    requiresRSVP: true,
    perks: ["Personal Shopper", "15% Discount", "Valet Parking", "Dinner Included"]
  },
  {
    id: 5,
    title: "Art Gallery Opening: Modern Masters",
    type: "opening",
    date: "2025-03-05",
    time: "18:30",
    endTime: "21:00",
    location: "Palm Beach Galleries",
    store: "Palm Beach Galleries",
    description: "Opening reception for our latest exhibition featuring contemporary works by emerging and established artists.",
    image: "/api/placeholder/400/300",
    price: 0,
    currentAttendees: 45,
    isExclusive: false,
    requiresRSVP: true,
    perks: ["Wine Reception", "Artist Meet & Greet", "Catalog"]
  },
  {
    id: 6,
    title: "Resort Season Collection Launch",
    type: "seasonal",
    date: "2025-03-10",
    time: "16:00",
    endTime: "19:00",
    location: "Royal Poinciana Plaza",
    description: "Celebrate the arrival of resort wear collections from multiple designers. Perfect for upcoming spring travels.",
    image: "/api/placeholder/400/300",
    price: 50,
    maxAttendees: 75,
    currentAttendees: 34,
    isExclusive: false,
    requiresRSVP: true,
    perks: ["Welcome Cocktail", "10% Discount", "Style Guide"]
  }
];

const eventTypes = [
  { key: 'all', label: 'All Events', icon: '🎭' },
  { key: 'fashion-show', label: 'Fashion Shows', icon: '👗' },
  { key: 'trunk-show', label: 'Trunk Shows', icon: '👜' },
  { key: 'vip-event', label: 'VIP Events', icon: '⭐' },
  { key: 'workshop', label: 'Workshops', icon: '🎓' },
  { key: 'opening', label: 'Openings', icon: '🖼️' },
  { key: 'seasonal', label: 'Seasonal', icon: '🌺' }
];

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    let filtered = events;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }
    
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(event => {
        const eventMonth = new Date(event.date).getMonth();
        return eventMonth.toString() === selectedMonth;
      });
    }
    
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedType, selectedMonth]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getAvailabilityStatus = (event: Event) => {
    if (!event.maxAttendees) return null;
    const percentage = (event.currentAttendees / event.maxAttendees) * 100;
    
    if (percentage >= 90) return { status: 'limited', color: 'text-coral', text: 'Almost Full' };
    if (percentage >= 70) return { status: 'filling', color: 'text-gold', text: 'Filling Fast' };
    return { status: 'available', color: 'text-sage', text: 'Available' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6 animate-fade-in">
            Events &
            <span className="block text-gold">Experiences</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Exclusive fashion shows, intimate trunk shows, and VIP shopping experiences that define Palm Beach&apos;s luxury lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-luxury text-lg px-8 py-4">
              Browse Current Events
            </Button>
            <Button variant="outline" className="btn-gold text-lg px-8 py-4">
              VIP Membership
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white/50 backdrop-blur-sm border-y border-sand/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Event Type Filter */}
            <div className="flex-1">
              <label className="text-sm font-medium text-navy mb-2 block">Event Type</label>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <Button
                    key={type.key}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedType(type.key)}
                    className={`transition-colors ${
                      selectedType === type.key
                        ? 'bg-gold text-navy border-gold hover:bg-gold/90'
                        : 'bg-white border-sand/40 text-gray-700 hover:border-gold hover:text-gold'
                    }`}
                  >
                    <span className="mr-1">{type.icon}</span>
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Month Filter */}
            <div className="lg:w-48">
              <label className="text-sm font-medium text-navy mb-2 block">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-sand/40 rounded-lg bg-white focus:border-gold focus:ring-1 focus:ring-gold"
              >
                <option value="all">All Months</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold text-navy">
              Upcoming Events
            </h2>
            <p className="text-gray-600">
              Showing <span className="font-semibold text-navy">{filteredEvents.length}</span> events
            </p>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-sand/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎭</span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-navy mb-4">
                No events found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more events.
              </p>
              <Button 
                onClick={() => {
                  setSelectedType('all');
                  setSelectedMonth('all');
                }}
                className="btn-luxury"
              >
                Show All Events
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredEvents.map((event) => {
                const availability = getAvailabilityStatus(event);
                
                return (
                  <Card key={event.id} className={`card-luxury group cursor-pointer h-full ${event.isExclusive ? 'ring-2 ring-gold/20' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-luxury text-xl mb-1">{event.title}</CardTitle>
                          <CardDescription className="text-sm text-gray-500">
                            {event.store && `${event.store} • `}{event.location}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {event.isExclusive && (
                            <span className="bg-gold/10 text-gold text-xs px-2 py-1 rounded-full font-medium">
                              Exclusive
                            </span>
                          )}
                          {availability && (
                            <span className={`text-xs font-medium ${availability.color}`}>
                              {availability.text}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="h-48 bg-gradient-to-br from-sand/30 to-gold/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        <span className="text-navy/60 text-lg font-display text-center px-4">
                          {event.title}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Date & Time */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{formatDate(event.date)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            {formatTime(event.time)}
                            {event.endTime && ` - ${formatTime(event.endTime)}`}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {event.description}
                        </p>

                        {/* Perks */}
                        {event.perks && event.perks.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {event.perks.slice(0, 3).map((perk) => (
                              <span key={perk} className="text-xs bg-sage/10 text-sage px-2 py-1 rounded-full">
                                {perk}
                              </span>
                            ))}
                            {event.perks.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{event.perks.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Price & RSVP */}
                        <div className="flex justify-between items-center pt-2 border-t border-sand/20">
                          <div className="text-sm">
                            <span className="font-semibold text-navy">
                              {event.price === 0 ? 'Free' : `$${event.price}`}
                            </span>
                            {event.maxAttendees && (
                              <span className="text-gray-500 ml-2">
                                {event.currentAttendees}/{event.maxAttendees} guests
                              </span>
                            )}
                          </div>
                          
                          <Button size="sm" className="btn-gold">
                            {event.requiresRSVP ? 'RSVP' : 'Learn More'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* VIP Membership CTA */}
      <section className="py-16 px-4 bg-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Unlock VIP Access
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join our exclusive membership for early access to events, private previews, and special pricing.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-navy text-2xl">🎫</span>
              </div>
              <h3 className="font-display font-semibold mb-2">Priority Access</h3>
              <p className="text-white/80 text-sm">
                First to know about exclusive events and guaranteed seating
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-navy text-2xl">💎</span>
              </div>
              <h3 className="font-display font-semibold mb-2">Exclusive Perks</h3>
              <p className="text-white/80 text-sm">
                Special discounts, complimentary services, and VIP treatment
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-navy text-2xl">🤝</span>
              </div>
              <h3 className="font-display font-semibold mb-2">Personal Concierge</h3>
              <p className="text-white/80 text-sm">
                Dedicated assistance for event planning and reservations
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gold hover:bg-gold/90 text-navy text-lg px-8 py-4">
              Join VIP Membership
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}