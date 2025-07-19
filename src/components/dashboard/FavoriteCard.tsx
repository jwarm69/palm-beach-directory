"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { formatDate, cn } from "@/lib/utils";
import Link from "next/link";
import type { FavoriteStore } from "@/types";

interface FavoriteCardProps {
  favorite: FavoriteStore;
  onRemove?: (storeId: string) => void;
  onUpdateSettings?: (favoriteId: string, settings: { notes?: string; notifyOfOffers: boolean; notifyOfEvents: boolean }) => void;
  className?: string;
}

export function FavoriteCard({ 
  favorite, 
  onRemove, 
  onUpdateSettings,
  className 
}: FavoriteCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSettings = () => {
    if (!onUpdateSettings) return;

    const notesEl = document.getElementById(`notes-${favorite.id}`) as HTMLTextAreaElement;
    const offersEl = document.getElementById(`offers-${favorite.id}`) as HTMLInputElement;
    const eventsEl = document.getElementById(`events-${favorite.id}`) as HTMLInputElement;
    
    onUpdateSettings(favorite.id, {
      notes: notesEl?.value || '',
      notifyOfOffers: offersEl?.checked || false,
      notifyOfEvents: eventsEl?.checked || false
    });
    
    setIsEditing(false);
  };

  return (
    <Card className={cn("card-premium group relative", className)}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-luxury text-xl mb-2">
              <Link 
                href={`/stores/${favorite.storeSlug}`} 
                className="hover:text-gold transition-colors"
              >
                {favorite.storeName}
              </Link>
            </CardTitle>
            <CardDescription className="text-base">
              📍 {favorite.area} • {favorite.category}
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-navy border-navy/20 hover:bg-navy/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>
            
            {onRemove && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemove(favorite.storeId)}
                className="text-red-600 border-red-600/20 hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Store Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Price Range:</span>
            <span className="font-semibold text-navy">{favorite.priceRange}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Added:</span>
            <span className="text-gray-600">
              {formatDate(favorite.addedAt, { short: true })}
            </span>
          </div>

          {/* Notification Status */}
          <div className="flex items-center gap-4 text-sm pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full", 
                favorite.notifyOfOffers ? 'bg-green-500' : 'bg-gray-300'
              )}></div>
              <span className="text-gray-600">Offer Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full", 
                favorite.notifyOfEvents ? 'bg-blue-500' : 'bg-gray-300'
              )}></div>
              <span className="text-gray-600">Event Alerts</span>
            </div>
          </div>

          {/* Notes */}
          {favorite.notes && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-600 italic">{favorite.notes}</p>
            </div>
          )}

          {/* Settings Panel */}
          {isEditing && onUpdateSettings && (
            <div className="pt-4 border-t border-gold/20 bg-sand/5 -mx-6 px-6 pb-6 space-y-4">
              <h4 className="font-semibold text-navy">Favorite Settings</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Personal Notes
                  </label>
                  <Textarea
                    placeholder="Add your personal notes about this store..."
                    defaultValue={favorite.notes || ""}
                    className="resize-none"
                    id={`notes-${favorite.id}`}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Offer Notifications
                      </label>
                      <p className="text-xs text-gray-500">
                        Get notified about new offers from this store
                      </p>
                    </div>
                    <Switch 
                      checked={favorite.notifyOfOffers} 
                      id={`offers-${favorite.id}`} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Event Notifications
                      </label>
                      <p className="text-xs text-gray-500">
                        Get notified about events at this store
                      </p>
                    </div>
                    <Switch 
                      checked={favorite.notifyOfEvents} 
                      id={`events-${favorite.id}`} 
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={handleUpdateSettings}
                    className="btn-gold group"
                  >
                    Save Changes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}