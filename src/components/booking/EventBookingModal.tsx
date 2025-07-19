"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBooking } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";

interface EventBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    endTime?: string;
    location: string;
    description: string;
    price: number;
    maxAttendees?: number;
    currentAttendees: number;
    perks?: string[];
  };
}

export default function EventBookingModal({ isOpen, onClose, event }: EventBookingModalProps) {
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const { bookEvent, isLoading, isEventBooked } = useBooking();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const isAlreadyBooked = isEventBooked(event.id.toString());
  const spotsRemaining = event.maxAttendees ? event.maxAttendees - event.currentAttendees : null;
  const canBook = !isAlreadyBooked && (!spotsRemaining || spotsRemaining >= guests);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError("Please sign in to book this event");
      return;
    }

    if (isAlreadyBooked) {
      setError("You have already booked this event");
      return;
    }

    if (spotsRemaining && guests > spotsRemaining) {
      setError(`Only ${spotsRemaining} spots remaining`);
      return;
    }

    setError("");
    
    const success = await bookEvent(
      event.id.toString(),
      event,
      guests,
      specialRequests
    );

    if (success) {
      setIsConfirmed(true);
    } else {
      setError("Booking failed. Please try again.");
    }
  };

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

  if (isConfirmed) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Card className="card-luxury w-full max-w-md relative animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-luxury text-2xl text-green-600">Booking Confirmed!</CardTitle>
              <CardDescription>
                Your RSVP for {event.title} has been confirmed
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Event Details</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <p><strong>Event:</strong> {event.title}</p>
                  <p><strong>Date:</strong> {formatDate(event.date)}</p>
                  <p><strong>Time:</strong> {formatTime(event.time)}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Guests:</strong> {guests}</p>
                </div>
              </div>

              <div className="bg-gold/5 border border-gold/20 rounded-lg p-4">
                <h4 className="font-semibold text-navy mb-2">What&apos;s Next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>&bull; Check your email for event details</li>
                  <li>&bull; Add the event to your calendar</li>
                  <li>&bull; Visit your dashboard to manage bookings</li>
                  <li>&bull; Contact us for any special arrangements</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={onClose} className="btn-luxury flex-1">
                  Done
                </Button>
                <Button variant="outline" onClick={() => window.open('/dashboard/bookings', '_blank')} className="flex-1">
                  View Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="card-luxury w-full max-w-lg relative animate-fade-in max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <CardHeader className="pb-4">
            <CardTitle className="text-luxury text-xl pr-8">{event.title}</CardTitle>
            <CardDescription className="text-gray-600">
              {event.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Event Details */}
            <div className="bg-sand/10 rounded-lg p-4">
              <h4 className="font-semibold text-navy mb-3">Event Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">
                    {formatTime(event.time)}
                    {event.endTime && ` - ${formatTime(event.endTime)}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-700">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </span>
                </div>
                {spotsRemaining !== null && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-700">
                      {spotsRemaining > 0 ? `${spotsRemaining} spots remaining` : 'Sold out'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Perks */}
            {event.perks && event.perks.length > 0 && (
              <div>
                <h4 className="font-semibold text-navy mb-3">What&apos;s Included</h4>
                <div className="flex flex-wrap gap-2">
                  {event.perks.map((perk, index) => (
                    <span key={index} className="text-xs bg-sage/10 text-sage px-3 py-1 rounded-full">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Status Messages */}
            {isAlreadyBooked && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-blue-700 text-sm font-medium">You&apos;re already registered for this event</p>
                </div>
              </div>
            )}

            {!isAuthenticated && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L4.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-yellow-700 text-sm font-medium">Please sign in to book this event</p>
                </div>
              </div>
            )}

            {/* Booking Form */}
            {isAuthenticated && !isAlreadyBooked && canBook && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="guests" className="text-navy font-medium">Number of Guests</Label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-sand/40 rounded-md bg-white focus:ring-2 focus:ring-gold focus:border-gold"
                  >
                    {Array.from({ length: Math.min(5, spotsRemaining || 5) }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="requests" className="text-navy font-medium">Special Requests (Optional)</Label>
                  <textarea
                    id="requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full mt-1 h-20 px-3 py-2 text-sm border border-sand/40 rounded-md resize-none focus:ring-2 focus:ring-gold focus:border-gold"
                    placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="btn-luxury w-full h-12 text-base font-medium" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Confirming RSVP...
                    </div>
                  ) : (
                    `RSVP for ${guests} ${guests === 1 ? 'guest' : 'guests'}`
                  )}
                </Button>
              </form>
            )}

            {/* Sold Out Message */}
            {spotsRemaining === 0 && !isAlreadyBooked && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">This event is sold out</p>
                <Button variant="outline" className="btn-gold">
                  Join Waitlist
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}