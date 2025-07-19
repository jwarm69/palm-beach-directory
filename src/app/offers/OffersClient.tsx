"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Percent, Star, Clock, TrendingUp, Users, Zap, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useOfferRedemption } from "@/contexts/OfferRedemptionContext";
import OfferClaimModal from "@/components/offers/OfferClaimModal";

// Enhanced offers with urgency and tracking
const offers = [
  {
    id: 1,
    title: "Flash Weekend Special",
    description: "Enjoy 20% off your first purchase and a complimentary styling consultation with our personal shopper. Limited time only!",
    type: "percent",
    value: "20%",
    originalValue: "15%",
    store: {
      name: "C. Orrico",
      slug: "c-orrico",
      area: "Worth Avenue"
    },
    terms: "Valid for new customers only. Cannot be combined with other offers. Minimum purchase of $200 required.",
    validUntil: "2025-01-26T23:59:59",
    isExclusive: true,
    isFlash: true,
    maxClaims: 25,
    currentClaims: 18,
    recentActivity: ["Sarah claimed 2m ago", "Michael saved $150", "Emma just visited"],
    avgSavings: "$275",
    popularityScore: 95
  },
  {
    id: 2,
    title: "VIP Jewelry Experience",
    description: "Book a private consultation with our jewelry specialist, receive complimentary cleaning, and enjoy champagne service.",
    type: "experience",
    value: "Premium Service",
    store: {
      name: "Tiffany & Co.",
      slug: "tiffany-co",
      area: "Worth Avenue"
    },
    terms: "By appointment only. Valid for first-time visitors. 48-hour notice required.",
    validUntil: "2025-02-28T23:59:59",
    isExclusive: true,
    isFlash: false,
    maxClaims: 12,
    currentClaims: 8,
    recentActivity: ["Booked by Catherine", "5-star experience", "Alexandra loved it"],
    avgSavings: "$200",
    popularityScore: 88
  },
  {
    id: 3,
    title: "New Customer Welcome",
    description: "Receive a luxury gift with your first purchase over $150 plus 10% off your entire order.",
    type: "gift",
    value: "Gift + 10% Off",
    store: {
      name: "Stubbs & Wootton",
      slug: "stubbs-wootton",
      area: "Worth Avenue"
    },
    terms: "Minimum purchase of $150. Gift while supplies last. One per customer.",
    validUntil: "2025-01-31T23:59:59",
    isExclusive: false,
    isFlash: false,
    maxClaims: 50,
    currentClaims: 31,
    recentActivity: ["Gift claimed by James", "Limited stock warning", "Popular this week"],
    avgSavings: "$95",
    popularityScore: 72
  },
  {
    id: 4,
    title: "Styling Session + Rewards",
    description: "Complimentary one-hour personal shopping session with style consultant plus $50 credit for future purchases.",
    type: "experience",
    value: "Session + $50 Credit",
    store: {
      name: "The Colony Shop",
      slug: "colony-shop",
      area: "Royal Poinciana"
    },
    terms: "By appointment only. Available Monday-Friday. Credit expires in 30 days.",
    validUntil: "2025-03-15T23:59:59",
    isExclusive: false,
    isFlash: false,
    maxClaims: 30,
    currentClaims: 12,
    recentActivity: ["Appointment booked", "Great reviews", "Book ahead recommended"],
    avgSavings: "$125",
    popularityScore: 81
  },
  {
    id: 5,
    title: "Triple Welcome Bonus",
    description: "15% off entire purchase + free newsletter signup gift + priority access to sales. Best value offer!",
    type: "percent",
    value: "15% + Extras",
    store: {
      name: "Rapunzel's Closet",
      slug: "rapunzels-closet",
      area: "CityPlace"
    },
    terms: "Valid for new newsletter subscribers. Gifts while supplies last. One-time use only.",
    validUntil: "2025-02-14T23:59:59",
    isExclusive: false,
    isFlash: false,
    maxClaims: 100,
    currentClaims: 43,
    recentActivity: ["Newsletter signup popular", "Triple bonus trending", "Great value"],
    avgSavings: "$85",
    popularityScore: 79
  }
];

const getOfferIcon = (type: string, isFlash: boolean = false) => {
  if (isFlash) {
    return <Zap className="w-6 h-6 text-red-500 animate-pulse" />;
  }
  
  switch (type) {
    case "percent":
      return <Percent className="w-6 h-6 text-gold" />;
    case "experience":
      return <Star className="w-6 h-6 text-coral" />;
    case "gift":
      return <Gift className="w-6 h-6 text-sage" />;
    default:
      return <Gift className="w-6 h-6 text-gold" />;
  }
};

const getOfferColor = (type: string, isFlash: boolean = false) => {
  if (isFlash) {
    return "text-red-600 bg-red-50 ring-2 ring-red-200";
  }
  
  switch (type) {
    case "percent":
      return "text-gold bg-gold/10";
    case "experience":
      return "text-coral bg-coral/10";
    case "gift":
      return "text-sage bg-sage/10";
    default:
      return "text-gold bg-gold/10";
  }
};

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setIsUrgent(hours < 24);
        
        if (hours < 1) {
          setTimeLeft(`${minutes}m left`);
        } else if (hours < 24) {
          setTimeLeft(`${hours}h ${minutes}m left`);
        } else {
          const days = Math.floor(hours / 24);
          setTimeLeft(`${days}d ${hours % 24}h left`);
        }
      } else {
        setTimeLeft("Expired");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      isUrgent ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-600'
    }`}>
      <Clock className="w-3 h-3" />
      {timeLeft}
    </div>
  );
}

function ProgressBar({ current, max }: { current: number; max: number }) {
  const percentage = (current / max) * 100;
  const isAlmostFull = percentage > 80;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600">Claimed</span>
        <span className={`font-medium ${isAlmostFull ? 'text-red-600' : 'text-gray-700'}`}>
          {current}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isAlmostFull ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isAlmostFull && (
        <p className="text-xs text-red-600 font-medium">Almost full! Claim soon</p>
      )}
    </div>
  );
}

function ActivityFeed({ activities }: { activities: string[] }) {
  return (
    <div className="space-y-1">
      {activities.slice(0, 2).map((activity, index) => (
        <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          {activity}
        </div>
      ))}
    </div>
  );
}

export default function OffersClient() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState<typeof offers[0] | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isOfferClaimed } = useOfferRedemption();

  const filteredOffers = offers.filter(offer => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "flash") return offer.isFlash;
    if (selectedFilter === "exclusive") return offer.isExclusive;
    return offer.type === selectedFilter;
  });

  // Sort by popularity and urgency
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (a.isFlash && !b.isFlash) return -1;
    if (!a.isFlash && b.isFlash) return 1;
    return b.popularityScore - a.popularityScore;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Flash Alert Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 animate-bounce" />
          <span className="font-semibold">Flash Weekend Special Active!</span>
          <span className="hidden sm:inline">Extra savings on C. Orrico - Limited time only</span>
          <Flame className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
            Irresistible Offers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Exclusive deals that luxury shoppers can&apos;t resist. Limited quantities, time-sensitive offers, 
            and first-time visitor privileges you won&apos;t find anywhere else.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">156</div>
              <div className="text-sm text-gray-600">Offers Claimed Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">$12,450</div>
              <div className="text-sm text-gray-600">Total Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">4.9★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              variant={selectedFilter === "all" ? "default" : "outline"} 
              className={selectedFilter === "all" ? "btn-luxury" : "bg-white"}
              onClick={() => setSelectedFilter("all")}
            >
              All Offers
            </Button>
            <Button 
              variant={selectedFilter === "flash" ? "default" : "outline"} 
              className={selectedFilter === "flash" ? "btn-luxury" : "bg-white"}
              onClick={() => setSelectedFilter("flash")}
            >
              <Zap className="w-4 h-4 mr-2 text-red-500" />
              Flash Deals
            </Button>
            <Button 
              variant={selectedFilter === "exclusive" ? "default" : "outline"} 
              className={selectedFilter === "exclusive" ? "btn-luxury" : "bg-white"}
              onClick={() => setSelectedFilter("exclusive")}
            >
              <Star className="w-4 h-4 mr-2" />
              Exclusive
            </Button>
            <Button 
              variant={selectedFilter === "percent" ? "default" : "outline"} 
              className={selectedFilter === "percent" ? "btn-luxury" : "bg-white"}
              onClick={() => setSelectedFilter("percent")}
            >
              <Percent className="w-4 h-4 mr-2" />
              Discounts
            </Button>
            <Button 
              variant={selectedFilter === "experience" ? "default" : "outline"} 
              className={selectedFilter === "experience" ? "btn-luxury" : "bg-white"}
              onClick={() => setSelectedFilter("experience")}
            >
              <Star className="w-4 h-4 mr-2" />
              Experiences
            </Button>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedOffers.map((offer) => (
              <Card 
                key={offer.id} 
                className={`card-luxury group cursor-pointer h-full transition-all duration-300 hover:scale-105 ${
                  offer.isExclusive ? 'ring-2 ring-gold/30' : ''
                } ${
                  offer.isFlash ? 'ring-2 ring-red-300 shadow-lg shadow-red-100' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-full ${getOfferColor(offer.type, offer.isFlash)}`}>
                      {getOfferIcon(offer.type, offer.isFlash)}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {offer.isFlash && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
                          FLASH DEAL
                        </span>
                      )}
                      {offer.isExclusive && (
                        <span className="bg-gold text-navy text-xs px-2 py-1 rounded-full font-medium">
                          Exclusive
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <TrendingUp className="w-3 h-3" />
                        {offer.popularityScore}% popular
                      </div>
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div className="mb-4">
                    <CountdownTimer endTime={offer.validUntil} />
                  </div>

                  {/* Title and Store */}
                  <CardTitle className="text-luxury text-xl mb-2">
                    {offer.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 mb-4">
                    <Link 
                      href={`/stores/${offer.store.slug}`}
                      className="hover:text-navy transition-colors font-medium"
                    >
                      {offer.store.name}
                    </Link>
                    {" • "}
                    <Link 
                      href={`/areas/${offer.store.area.toLowerCase().replace(' ', '-')}`}
                      className="hover:text-navy transition-colors"
                    >
                      {offer.store.area}
                    </Link>
                  </CardDescription>

                  {/* Value Display */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`inline-block px-3 py-2 rounded-full text-lg font-bold ${getOfferColor(offer.type, offer.isFlash)}`}>
                      {offer.value}
                    </div>
                    {offer.originalValue && (
                      <div className="text-sm text-gray-500 line-through">
                        was {offer.originalValue}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {offer.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <ProgressBar current={offer.currentClaims} max={offer.maxClaims} />
                  </div>

                  {/* Recent Activity */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Recent Activity</h4>
                    <ActivityFeed activities={offer.recentActivity} />
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-navy">{offer.avgSavings}</div>
                      <div className="text-xs text-gray-600">Avg. Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-navy">{offer.maxClaims - offer.currentClaims}</div>
                      <div className="text-xs text-gray-600">Left</div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="text-xs text-gray-500 mb-4">
                    <strong>Terms:</strong> {offer.terms}
                  </div>

                  {/* Action Button */}
                  <div className="space-y-2">
                    {isOfferClaimed(offer.id) ? (
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                          disabled
                        >
                          ✅ Claimed - In Your Wallet
                        </Button>
                        <Link href="/dashboard/offers">
                          <Button 
                            variant="outline"
                            className="w-full text-xs"
                            size="sm"
                          >
                            View in Digital Wallet
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => {
                          setSelectedOffer(offer);
                          setShowClaimModal(true);
                        }}
                        className={`w-full transition-all ${
                          offer.isFlash 
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' 
                            : 'btn-luxury'
                        } group-hover:scale-105`}
                        size="sm"
                      >
                        {offer.isFlash ? '🔥 Claim Flash Deal' : '✨ Claim Offer'}
                      </Button>
                    )}
                    
                    <Link href={`/stores/${offer.store.slug}`}>
                      <Button 
                        variant="outline"
                        className="w-full text-xs"
                        size="sm"
                      >
                        Store Details
                      </Button>
                    </Link>
                    
                    {!isAuthenticated && (
                      <div className="text-xs text-gray-500 text-center">
                        Sign in to claim offers and get QR codes
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 bg-sand/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            Join Thousands of Smart Shoppers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  2,847 Members
                </h3>
                <p className="text-gray-600">
                  Exclusive community of luxury shoppers saving money every day
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-coral" />
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  $1.2M Saved
                </h3>
                <p className="text-gray-600">
                  Total savings by our members in the last 12 months
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  4.9/5 Rating
                </h3>
                <p className="text-gray-600">
                  Average satisfaction score from our luxury shopping experiences
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-gold">1</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  Discover Offers
                </h3>
                <p className="text-gray-600">
                  Browse time-sensitive deals from Palm Beach&apos;s finest retailers
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-coral">2</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  Claim & Visit
                </h3>
                <p className="text-gray-600">
                  Reserve your offer and visit the store with your digital pass
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-sage">3</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  Save & Enjoy
                </h3>
                <p className="text-gray-600">
                  Get your discount, gift, or premium service and share the love
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 px-4 bg-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Don&apos;t Miss Out on These Amazing Deals
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of smart shoppers who are saving money at Palm Beach&apos;s finest stores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stores">
              <Button className="bg-gold hover:bg-gold/90 text-navy text-lg px-8 py-4">
                Start Shopping Now
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy text-lg px-8 py-4">
                Explore VIP Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Claim Modal */}
      {selectedOffer && (
        <OfferClaimModal
          isOpen={showClaimModal}
          onClose={() => {
            setShowClaimModal(false);
            setSelectedOffer(null);
          }}
          offer={selectedOffer}
        />
      )}
    </div>
  );
}