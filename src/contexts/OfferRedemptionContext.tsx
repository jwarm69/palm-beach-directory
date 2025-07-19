"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface ClaimedOffer {
  id: string;
  offerId: number;
  offerTitle: string;
  offerValue: string;
  storeName: string;
  storeSlug: string;
  claimedAt: string;
  expiresAt: string;
  status: 'active' | 'redeemed' | 'expired';
  redemptionCode: string;
  qrCodeData: string;
  redeemedAt?: string;
  redeemedLocation?: string;
  savingsAmount?: number;
  terms: string;
}

interface OfferRedemptionContextType {
  claimedOffers: ClaimedOffer[];
  isLoading: boolean;
  claimOffer: (offerData: OfferData) => Promise<boolean>;
  redeemOffer: (claimedOfferId: string, location?: string) => Promise<boolean>;
  getClaimedOffer: (offerId: number) => ClaimedOffer | undefined;
  isOfferClaimed: (offerId: number) => boolean;
  getActiveOffers: () => ClaimedOffer[];
  getRedeemedOffers: () => ClaimedOffer[];
  getTotalSavings: () => number;
}

interface OfferData {
  id: number;
  title: string;
  value: string;
  store: {
    name: string;
    slug: string;
  };
  validUntil: string;
  terms: string;
  avgSavings: string;
}

const OfferRedemptionContext = createContext<OfferRedemptionContextType | undefined>(undefined);

export function OfferRedemptionProvider({ children }: { children: ReactNode }) {
  const [claimedOffers, setClaimedOffers] = useState<ClaimedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load claimed offers from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && user) {
      try {
        const storedOffers = localStorage.getItem(`palmbeach_claimed_offers_${user.id}`);
        if (storedOffers) {
          const parsed = JSON.parse(storedOffers);
          // Filter out expired offers
          const activeOffers = parsed.filter((offer: ClaimedOffer) => {
            return new Date(offer.expiresAt).getTime() > new Date().getTime() || offer.status === 'redeemed';
          });
          setClaimedOffers(activeOffers);
        }
      } catch (error) {
        console.error('Failed to load claimed offers:', error);
      }
    }
  }, [isAuthenticated, user]);

  // Save claimed offers to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem(`palmbeach_claimed_offers_${user.id}`, JSON.stringify(claimedOffers));
    }
  }, [claimedOffers, user]);

  // Generate unique redemption code
  const generateRedemptionCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'PB-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate QR code data (in real app, this would be a secure token)
  const generateQRCodeData = (offer: OfferData, redemptionCode: string): string => {
    const qrData = {
      type: 'palm_beach_offer',
      offerId: offer.id,
      redemptionCode,
      storeSlug: offer.store.slug,
      validUntil: offer.validUntil,
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(qrData);
  };

  const claimOffer = async (offerData: OfferData): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Check if already claimed
      const existingClaim = claimedOffers.find(claim => 
        claim.offerId === offerData.id && claim.status !== 'expired'
      );
      
      if (existingClaim) {
        setIsLoading(false);
        return false; // Already claimed
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const redemptionCode = generateRedemptionCode();
      const qrCodeData = generateQRCodeData(offerData, redemptionCode);
      
      // Calculate expiration (30 days from now or offer expiration, whichever is sooner)
      const offerExpiry = new Date(offerData.validUntil);
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const expiresAt = offerExpiry < thirtyDaysFromNow ? offerExpiry : thirtyDaysFromNow;
      
      const newClaim: ClaimedOffer = {
        id: `claim_${Date.now()}`,
        offerId: offerData.id,
        offerTitle: offerData.title,
        offerValue: offerData.value,
        storeName: offerData.store.name,
        storeSlug: offerData.store.slug,
        claimedAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: 'active',
        redemptionCode,
        qrCodeData,
        terms: offerData.terms,
        savingsAmount: parseInt(offerData.avgSavings.replace(/[^\d]/g, '')) || 0
      };
      
      setClaimedOffers(prev => [...prev, newClaim]);
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Offer claiming failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const redeemOffer = async (claimedOfferId: string, location?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call to verify and redeem
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClaimedOffers(prev => 
        prev.map(offer => 
          offer.id === claimedOfferId 
            ? { 
                ...offer, 
                status: 'redeemed' as const,
                redeemedAt: new Date().toISOString(),
                redeemedLocation: location
              }
            : offer
        )
      );
      
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Offer redemption failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const getClaimedOffer = (offerId: number): ClaimedOffer | undefined => {
    return claimedOffers.find(offer => 
      offer.offerId === offerId && offer.status !== 'expired'
    );
  };

  const isOfferClaimed = (offerId: number): boolean => {
    return claimedOffers.some(offer => 
      offer.offerId === offerId && offer.status !== 'expired'
    );
  };

  const getActiveOffers = (): ClaimedOffer[] => {
    return claimedOffers.filter(offer => offer.status === 'active');
  };

  const getRedeemedOffers = (): ClaimedOffer[] => {
    return claimedOffers.filter(offer => offer.status === 'redeemed');
  };

  const getTotalSavings = (): number => {
    return claimedOffers
      .filter(offer => offer.status === 'redeemed')
      .reduce((total, offer) => total + (offer.savingsAmount || 0), 0);
  };

  const value: OfferRedemptionContextType = {
    claimedOffers: claimedOffers.filter(offer => offer.status !== 'expired'),
    isLoading,
    claimOffer,
    redeemOffer,
    getClaimedOffer,
    isOfferClaimed,
    getActiveOffers,
    getRedeemedOffers,
    getTotalSavings
  };

  return (
    <OfferRedemptionContext.Provider value={value}>
      {children}
    </OfferRedemptionContext.Provider>
  );
}

export function useOfferRedemption() {
  const context = useContext(OfferRedemptionContext);
  if (context === undefined) {
    throw new Error('useOfferRedemption must be used within an OfferRedemptionProvider');
  }
  return context;
}

export type { ClaimedOffer, OfferData };