"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Percent, Star, Clock, Zap, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useOfferRedemption } from "@/contexts/OfferRedemptionContext";
import OfferClaimModal from "@/components/offers/OfferClaimModal";
import { getOffers } from "@/lib/database";
import type { Offer } from "@/types";
import { Loading } from "@/components/ui/loading";

export default function OffersClient() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isOfferClaimed } = useOfferRedemption();

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const offersData = await getOffers();
        setOffers(offersData);
      } catch (error) {
        console.error('Error loading offers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOffers();
  }, []);

  const filteredOffers = offers.filter(offer => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "flash") return offer.isFlash;
    if (selectedFilter === "featured") return offer.featured;
    return offer.type === selectedFilter;
  });

  const handleClaimOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowClaimModal(true);
  };

  const getOfferIcon = (type: string) => {
    switch (type) {
      case "percent": return <Percent className="w-5 h-5" />;
      case "dollar": return <span className="text-base font-bold">$</span>;
      case "experience": return <Star className="w-5 h-5" />;
      case "gift": return <Gift className="w-5 h-5" />;
      default: return <Gift className="w-5 h-5" />;
    }
  };

  const getOfferTypeColor = (type: string) => {
    switch (type) {
      case "percent": return "bg-coral-500";
      case "dollar": return "bg-gold-500";
      case "experience": return "bg-sage-500";
      case "gift": return "bg-navy-500";
      default: return "bg-navy-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isExpiringSoon = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand-50 to-sage-50">
        <div className="container mx-auto px-6 py-20">
          <Loading message="Loading exclusive offers..." size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 to-sage-50">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-6">
            Exclusive Welcome Offers
          </h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Unlock special privileges at Palm Beach&apos;s finest stores. 
            These exclusive offers are available only to first-time visitors through our directory.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "all", label: "All Offers", icon: <Star className="w-4 h-4" /> },
            { id: "flash", label: "Flash Deals", icon: <Zap className="w-4 h-4" /> },
            { id: "featured", label: "Featured", icon: <Flame className="w-4 h-4" /> },
            { id: "percent", label: "Discounts", icon: <Percent className="w-4 h-4" /> },
            { id: "experience", label: "Experiences", icon: <Star className="w-4 h-4" /> },
            { id: "gift", label: "Free Gifts", icon: <Gift className="w-4 h-4" /> }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === filter.id
                  ? "bg-navy-600 text-white shadow-lg scale-105"
                  : "bg-white/70 text-navy-600 hover:bg-white hover:shadow-md"
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎁</div>
            <h3 className="text-2xl font-bold text-navy-800 mb-4">No offers found</h3>
            <p className="text-navy-600 mb-8 max-w-md mx-auto">
              Try selecting a different filter to find more offers.
            </p>
            <Button 
              onClick={() => setSelectedFilter("all")}
              className="btn-luxury"
            >
              View All Offers
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer) => (
              <Card key={offer.id} className="card-luxury group relative overflow-hidden">
                {/* Flash/Featured Badge */}
                {(offer.isFlash || offer.featured) && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white ${
                      offer.isFlash ? "bg-coral-500" : "bg-gold-500"
                    }`}>
                      {offer.isFlash ? <Zap className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                      {offer.isFlash ? "FLASH" : "FEATURED"}
                    </div>
                  </div>
                )}

                {/* Expiring Soon Badge */}
                {isExpiringSoon(offer.validUntil) && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1 bg-red-500 rounded-full text-xs font-bold text-white">
                      <Clock className="w-3 h-3" />
                      EXPIRING SOON
                    </div>
                  </div>
                )}

                <div className="relative">
                  <img
                    src={offer.image || '/api/placeholder/400/200'}
                    alt={offer.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Offer Value Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-bold ${getOfferTypeColor(offer.type)}`}>
                      {getOfferIcon(offer.type)}
                      <span className="text-lg">{offer.value}</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-navy-800 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {offer.title}
                  </CardTitle>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-navy-600">
                      <span className="font-medium">{offer.store}</span>
                      <span className="text-navy-300">•</span>
                      <span>{offer.area}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-navy-600 mb-4 line-clamp-3">
                    {offer.description}
                  </CardDescription>

                  {/* Highlights */}
                  {offer.highlights && offer.highlights.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {offer.highlights.slice(0, 2).map((highlight, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-md font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expiry Info */}
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="flex items-center gap-1 text-navy-500">
                      <Clock className="w-4 h-4" />
                      <span>Valid until {formatDate(offer.validUntil)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="space-y-3">
                    {isAuthenticated ? (
                      <>
                        {isOfferClaimed(offer.id) ? (
                          <Button disabled className="w-full">
                            Already Claimed
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleClaimOffer(offer)}
                            className="w-full btn-luxury"
                          >
                            Claim Offer
                          </Button>
                        )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Button 
                          onClick={() => handleClaimOffer(offer)}
                          className="w-full btn-luxury"
                        >
                          Sign In to Claim
                        </Button>
                        <p className="text-xs text-navy-500 text-center">
                          Free account required to claim offers
                        </p>
                      </div>
                    )}
                    
                    <Link href={`/stores/${offer.storeSlug}`}>
                      <Button variant="outline" className="w-full text-navy-600 border-navy-300 hover:bg-navy-50">
                        View Store Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/40">
            <h3 className="text-3xl font-bold text-navy-800 mb-4">
              Don&apos;t Miss Out on These Exclusive Deals
            </h3>
            <p className="text-xl text-navy-600 mb-8 max-w-2xl mx-auto">
              Join our community today and get instant access to member-only offers from Palm Beach&apos;s finest retailers.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-gold min-w-48">
                  Create Free Account
                </Button>
                <Link href="/stores">
                  <Button variant="outline" className="min-w-48 border-navy-300 text-navy-800 hover:bg-navy-50">
                    Browse All Stores
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      {selectedOffer && (
        <OfferClaimModal
          isOpen={showClaimModal}
          onClose={() => {
            setShowClaimModal(false);
            setSelectedOffer(null);
          }}
          offer={{
            id: selectedOffer.id,
            title: selectedOffer.title,
            store: selectedOffer.store,
            storeSlug: selectedOffer.storeSlug,
            value: selectedOffer.value,
            validUntil: selectedOffer.validUntil,
            terms: selectedOffer.terms
          }}
        />
      )}
    </div>
  );
}