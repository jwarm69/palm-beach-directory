"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatTime, cn } from "@/lib/utils";
import type { EventBooking, ConciergeBooking } from "@/types";

interface BookingCardProps {
  booking: EventBooking | ConciergeBooking;
  type: 'event' | 'concierge';
  onCancel?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onReschedule?: (id: string) => void;
  className?: string;
}

export function BookingCard({ 
  booking, 
  type, 
  onCancel, 
  onViewDetails, 
  onReschedule,
  className 
}: BookingCardProps) {
  const isEvent = type === 'event';
  const eventBooking = booking as EventBooking;
  const conciergeBooking = booking as ConciergeBooking;

  const getBookingIcon = () => {
    if (isEvent) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    }
  };

  const getTitle = () => {
    return isEvent ? eventBooking.eventTitle : conciergeBooking.serviceTitle;
  };

  const getDateTime = () => {
    if (isEvent) {
      return {
        date: eventBooking.eventDate,
        time: eventBooking.eventTime
      };
    } else {
      return {
        date: conciergeBooking.date,
        time: conciergeBooking.time
      };
    }
  };

  const getLocation = () => {
    return isEvent ? eventBooking.location : conciergeBooking.location;
  };

  const { date, time } = getDateTime();

  return (
    <Card className={cn("card-premium group", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-display font-semibold text-luxury">
                {getTitle()}
              </h3>
              <StatusBadge status={booking.status} />
            </div>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                {getBookingIcon()}
                {formatDate(date, { includeWeekday: true })} at {formatTime(time)}
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {getLocation()}
              </div>

              {isEvent && eventBooking.guests && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  {eventBooking.guests} guest{eventBooking.guests !== 1 ? 's' : ''}
                </div>
              )}

              {!isEvent && conciergeBooking.duration && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {conciergeBooking.duration}
                </div>
              )}

              {!isEvent && conciergeBooking.price && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  ${conciergeBooking.price}
                </div>
              )}

              {/* Special Requests */}
              {((isEvent && eventBooking.specialRequests) || (!isEvent && conciergeBooking.specialRequests)) && (
                <div className="flex items-start gap-2 mt-3">
                  <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="text-sm">
                    {isEvent ? eventBooking.specialRequests : conciergeBooking.specialRequests}
                  </span>
                </div>
              )}

              {/* Concierge Preferences */}
              {!isEvent && conciergeBooking.preferences && (
                <div className="mt-3 p-3 bg-sand/10 rounded-lg">
                  <div className="text-sm font-medium text-navy mb-1">Preferences:</div>
                  {conciergeBooking.preferences.budget && (
                    <div className="text-sm text-gray-600">Budget: {conciergeBooking.preferences.budget}</div>
                  )}
                  {conciergeBooking.preferences.stylist && (
                    <div className="text-sm text-gray-600">Stylist: {conciergeBooking.preferences.stylist}</div>
                  )}
                  {conciergeBooking.preferences.categories && conciergeBooking.preferences.categories.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Categories: {conciergeBooking.preferences.categories.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {booking.status !== 'cancelled' && onCancel && (
              <Button 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => onCancel(booking.id)}
              >
                Cancel {isEvent ? 'Booking' : 'Service'}
              </Button>
            )}
            
            {!isEvent && booking.status !== 'cancelled' && onReschedule && (
              <Button 
                variant="outline"
                onClick={() => onReschedule(booking.id)}
                className="border-navy/20 hover:bg-navy/5"
              >
                Reschedule
              </Button>
            )}
            
            {onViewDetails && (
              <Button 
                onClick={() => onViewDetails(booking.id)}
                className="btn-glass group"
              >
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}