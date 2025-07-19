"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Percent, Star, Clock, TrendingUp, Zap } from "lucide-react";

interface OfferCardProps {
  offer: {
    id: number;
    title: string;
    description: string;
    type: string;
    value: string;
    originalValue?: string;
    store: {
      name: string;
      slug: string;
      area: string;
    };
    terms: string;
    validUntil: string;
    isExclusive: boolean;
    isFlash: boolean;
    maxClaims: number;
    currentClaims: number;
    recentActivity: string[];
    avgSavings: string;
    popularityScore: number;
  };
  isAuthenticated: boolean;
}

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
    const timer = setInterval(calculateTimeLeft, 60000);

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

export default function OfferCard({ offer, isAuthenticated }: OfferCardProps) {
  return (
    <Card 
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
          <Link href={`/stores/${offer.store.slug}`}>
            <Button 
              className={`w-full transition-all ${
                offer.isFlash 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' 
                  : 'btn-luxury'
              } group-hover:scale-105`}
              size="sm"
            >
              {offer.isFlash ? '🔥 Claim Flash Deal' : '✨ Claim Offer'}
            </Button>
          </Link>
          
          {!isAuthenticated && (
            <div className="text-xs text-gray-500 text-center">
              Sign in to save offers and get notifications
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}