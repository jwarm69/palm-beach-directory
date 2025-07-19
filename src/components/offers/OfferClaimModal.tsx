"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Percent, Gift, Star } from "lucide-react";
import { useOfferRedemption, type OfferData } from "@/contexts/OfferRedemptionContext";
import { useAuth } from "@/contexts/AuthContext";

interface OfferClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: OfferData;
}

export default function OfferClaimModal({ isOpen, onClose, offer }: OfferClaimModalProps) {
  const [isClaimed, setIsClaimed] = useState(false);
  const { claimOffer, isLoading, isOfferClaimed } = useOfferRedemption();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const alreadyClaimed = isOfferClaimed(offer.id);

  const handleClaimOffer = async () => {
    if (!isAuthenticated) {
      // Handle authentication redirect
      return;
    }

    const success = await claimOffer(offer);
    if (success) {
      setIsClaimed(true);
    }
  };

  const getOfferIcon = () => {
    if (offer.value.includes('%')) {
      return <Percent className="w-8 h-8 text-gold" />;
    } else if (offer.title.toLowerCase().includes('gift')) {
      return <Gift className="w-8 h-8 text-sage" />;
    } else {
      return <Star className="w-8 h-8 text-coral" />;
    }
  };

  const formatExpiryDate = () => {
    const date = new Date(offer.validUntil);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isClaimed || alreadyClaimed) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Card className="card-luxury w-full max-w-md relative animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-luxury text-2xl text-green-600">Offer Claimed!</CardTitle>
              <CardDescription>
                Your exclusive offer has been added to your digital wallet
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">What&apos;s Next?</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>&bull; Visit your My Offers page to view your digital pass</li>
                  <li>&bull; Show the QR code at {offer.store} checkout</li>
                  <li>&bull; Enjoy your exclusive discount or service</li>
                  <li>&bull; Your savings will be tracked automatically</li>
                </ul>
              </div>

              <div className="bg-gold/5 border border-gold/20 rounded-lg p-4">
                <h4 className="font-semibold text-navy mb-2">Offer Details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Offer:</strong> {offer.title}</p>
                  <p><strong>Value:</strong> {offer.value}</p>
                  <p><strong>Store:</strong> {offer.store}</p>
                  <p><strong>Expires:</strong> {formatExpiryDate()}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={onClose} className="btn-luxury flex-1">
                  Done
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('/dashboard/offers', '_blank')} 
                  className="flex-1"
                >
                  View My Offers
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
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-gold/10">
                {getOfferIcon()}
              </div>
              <div className="flex-1">
                <CardTitle className="text-luxury text-xl pr-8">{offer.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  Exclusive offer from {offer.store}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30">
                {offer.value}
              </Badge>
              <Badge variant="outline" className="bg-sage/10 text-sage border-sage/30">
                Exclusive Deal
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Offer Benefits */}
            <div className="bg-sand/10 rounded-lg p-4">
              <h4 className="font-semibold text-navy mb-3">What You&apos;ll Get</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Instant access to exclusive discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Digital QR code for easy redemption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">Automatic savings tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">No need to remember or print anything</span>
                </div>
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-coral/5 rounded-lg p-4">
              <h4 className="font-semibold text-navy mb-3">Where to Redeem</h4>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coral mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{offer.store}</p>
                  <p className="text-sm text-gray-600">Show your QR code at checkout</p>
                  <p className="text-sm text-gray-600">Staff will scan and apply your discount</p>
                </div>
              </div>
            </div>

            {/* Expiry Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Important Timing</h4>
              </div>
              <div className="text-sm text-yellow-700">
                <p><strong>Offer Expires:</strong> {formatExpiryDate()}</p>
                <p><strong>Once Claimed:</strong> Valid for 30 days or until offer expires</p>
                <p><strong>Redemption:</strong> Use once at participating store</p>
              </div>
            </div>

            {/* Terms */}
            <div className="border-t border-sand/20 pt-4">
              <h4 className="font-semibold text-navy mb-2">Terms & Conditions</h4>
              <p className="text-xs text-gray-600">{offer.terms}</p>
            </div>

            {/* Authentication Check */}
            {!isAuthenticated ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L4.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-yellow-700 text-sm font-medium">Please sign in to claim this offer</p>
                </div>
              </div>
            ) : (
              <Button 
                onClick={handleClaimOffer}
                disabled={isLoading || alreadyClaimed}
                className="w-full btn-luxury h-12 text-base font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Claiming Offer...
                  </div>
                ) : alreadyClaimed ? (
                  "Already Claimed ✓"
                ) : (
                  `🎯 Claim ${offer.value} Offer`
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}