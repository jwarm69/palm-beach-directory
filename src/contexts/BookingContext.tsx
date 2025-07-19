"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface EventBooking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  guests: number;
  specialRequests?: string;
}

interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
}

interface ServiceData {
  type: string;
  title: string;
  duration: string;
  price: number;
}

interface BookingDetails {
  date: string;
  time: string;
  location?: string;
  specialRequests?: string;
  preferences?: {
    stylist?: string;
    budget?: string;
    categories?: string[];
  };
}

interface ConciergeBooking {
  id: string;
  serviceType: string;
  serviceTitle: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  price: number;
  specialRequests?: string;
  preferences?: {
    stylist?: string;
    budget?: string;
    categories?: string[];
  };
}

interface BookingContextType {
  eventBookings: EventBooking[];
  conciergeBookings: ConciergeBooking[];
  isLoading: boolean;
  bookEvent: (eventId: string, eventData: EventData, guests: number, specialRequests?: string) => Promise<boolean>;
  bookConciergeService: (serviceData: ServiceData, bookingDetails: BookingDetails) => Promise<boolean>;
  cancelEventBooking: (bookingId: string) => Promise<boolean>;
  cancelConciergeBooking: (bookingId: string) => Promise<boolean>;
  getEventBooking: (eventId: string) => EventBooking | undefined;
  isEventBooked: (eventId: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [eventBookings, setEventBookings] = useState<EventBooking[]>([]);
  const [conciergeBookings, setConciergeBookings] = useState<ConciergeBooking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load bookings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && user) {
      try {
        const storedEventBookings = localStorage.getItem(`palmbeach_event_bookings_${user.id}`);
        const storedConciergeBookings = localStorage.getItem(`palmbeach_concierge_bookings_${user.id}`);
        
        if (storedEventBookings) {
          setEventBookings(JSON.parse(storedEventBookings));
        }
        
        if (storedConciergeBookings) {
          setConciergeBookings(JSON.parse(storedConciergeBookings));
        }
      } catch (error) {
        console.error('Failed to load bookings:', error);
      }
    }
  }, [isAuthenticated, user]);

  // Save bookings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem(`palmbeach_event_bookings_${user.id}`, JSON.stringify(eventBookings));
    }
  }, [eventBookings, user]);

  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem(`palmbeach_concierge_bookings_${user.id}`, JSON.stringify(conciergeBookings));
    }
  }, [conciergeBookings, user]);

  const bookEvent = async (
    eventId: string, 
    eventData: EventData, 
    guests: number = 1, 
    specialRequests?: string
  ): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if already booked
      const existingBooking = eventBookings.find(booking => 
        booking.eventId === eventId && booking.status !== 'cancelled'
      );
      
      if (existingBooking) {
        setIsLoading(false);
        return false; // Already booked
      }
      
      const newBooking: EventBooking = {
        id: `event_${Date.now()}`,
        eventId,
        eventTitle: eventData.title,
        eventDate: eventData.date,
        eventTime: eventData.time,
        location: eventData.location,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
        guests,
        specialRequests
      };
      
      setEventBookings(prev => [...prev, newBooking]);
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Event booking failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const bookConciergeService = async (
    serviceData: ServiceData, 
    bookingDetails: BookingDetails
  ): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const newBooking: ConciergeBooking = {
        id: `concierge_${Date.now()}`,
        serviceType: serviceData.type,
        serviceTitle: serviceData.title,
        date: bookingDetails.date,
        time: bookingDetails.time,
        duration: serviceData.duration,
        location: bookingDetails.location || 'Worth Avenue Plaza',
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
        price: serviceData.price,
        specialRequests: bookingDetails.specialRequests,
        preferences: bookingDetails.preferences
      };
      
      setConciergeBookings(prev => [...prev, newBooking]);
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Concierge booking failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const cancelEventBooking = async (bookingId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEventBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      );
      
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Event booking cancellation failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const cancelConciergeBooking = async (bookingId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setConciergeBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      );
      
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Concierge booking cancellation failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const getEventBooking = (eventId: string): EventBooking | undefined => {
    return eventBookings.find(booking => 
      booking.eventId === eventId && booking.status !== 'cancelled'
    );
  };

  const isEventBooked = (eventId: string): boolean => {
    return eventBookings.some(booking => 
      booking.eventId === eventId && booking.status !== 'cancelled'
    );
  };

  const value: BookingContextType = {
    eventBookings: eventBookings.filter(booking => booking.status !== 'cancelled'),
    conciergeBookings: conciergeBookings.filter(booking => booking.status !== 'cancelled'),
    isLoading,
    bookEvent,
    bookConciergeService,
    cancelEventBooking,
    cancelConciergeBooking,
    getEventBooking,
    isEventBooked
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export type { EventBooking, ConciergeBooking, EventData, ServiceData, BookingDetails };