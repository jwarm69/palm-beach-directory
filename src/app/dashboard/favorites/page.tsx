"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FavoriteStore } from "@/contexts/FavoritesContext";

export default function FavoritesPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { favorites, removeFromFavorites, updateFavoriteSettings, getFavoritesByCategory, getFavoritesByArea } = useFavorites();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [editingFavorite, setEditingFavorite] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white flex items-center justify-center">
        <div className="flex items-center gap-2 text-navy">
          <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
          Loading your favorites...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Filter favorites based on search term
  const filteredFavorites = favorites.filter(favorite =>
    favorite.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    favorite.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    favorite.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get favorites by category for tabs
  const categories = [...new Set(favorites.map(fav => fav.category))];
  const areas = [...new Set(favorites.map(fav => fav.area))];

  const getTabFavorites = () => {
    if (activeTab === "all") return filteredFavorites;
    if (areas.includes(activeTab)) return getFavoritesByArea(activeTab).filter(fav => 
      fav.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return getFavoritesByCategory(activeTab).filter(fav => 
      fav.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleRemoveFavorite = async (storeId: string) => {
    await removeFromFavorites(storeId);
  };

  const handleUpdateSettings = async (favoriteId: string, settings: { notes?: string; notifyOfOffers: boolean; notifyOfEvents: boolean }) => {
    await updateFavoriteSettings(favoriteId, settings);
    setEditingFavorite(null);
  };

  const FavoriteCard = ({ favorite }: { favorite: FavoriteStore }) => (
    <Card className="card-premium group relative">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-luxury text-xl mb-2">
              <Link href={`/stores/${favorite.storeSlug}`} className="hover:text-gold transition-colors">
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
              onClick={() => setEditingFavorite(editingFavorite === favorite.id ? null : favorite.id)}
              className="text-navy border-navy/20 hover:bg-navy/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveFavorite(favorite.storeId)}
              className="text-red-600 border-red-600/20 hover:bg-red-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
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
              {new Date(favorite.addedAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>

          {/* Notification Status */}
          <div className="flex items-center gap-4 text-sm pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${favorite.notifyOfOffers ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-gray-600">Offer Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${favorite.notifyOfEvents ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
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
          {editingFavorite === favorite.id && (
            <div className="pt-4 border-t border-gold/20 bg-sand/5 -mx-6 px-6 pb-6 space-y-4">
              <h4 className="font-semibold text-navy">Favorite Settings</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Personal Notes</label>
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
                      <label className="text-sm font-medium text-gray-700">Offer Notifications</label>
                      <p className="text-xs text-gray-500">Get notified about new offers from this store</p>
                    </div>
                    <Switch checked={favorite.notifyOfOffers} id={`offers-${favorite.id}`} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Event Notifications</label>
                      <p className="text-xs text-gray-500">Get notified about events at this store</p>
                    </div>
                    <Switch checked={favorite.notifyOfEvents} id={`events-${favorite.id}`} />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      const notesEl = document.getElementById(`notes-${favorite.id}`) as HTMLTextAreaElement;
                      const offersEl = document.getElementById(`offers-${favorite.id}`) as HTMLInputElement;
                      const eventsEl = document.getElementById(`events-${favorite.id}`) as HTMLInputElement;
                      
                      handleUpdateSettings(favorite.id, {
                        notes: notesEl.value,
                        notifyOfOffers: offersEl.checked,
                        notifyOfEvents: eventsEl.checked
                      });
                    }}
                    className="btn-gold group"
                  >
                    Save Changes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingFavorite(null)}
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 via-white/50 to-white">
      {/* Header */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-sage/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/6 w-40 h-40 bg-coral/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-12 shadow-glass border border-white/20 mb-8">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-luxury mb-6">
              My Favorites
            </h1>
            <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto leading-relaxed">
              Your curated collection of {favorites.length} favorite stores and boutiques
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sage to-coral mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search your favorite stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Link href="/stores">
              <Button className="btn-sage group">
                + Add More Favorites
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Favorites Content */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {favorites.length === 0 ? (
            <Card className="card-glass p-12 text-center">
              <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-semibold text-luxury mb-4">No Favorites Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start building your collection of favorite stores and boutiques for personalized shopping experiences
              </p>
              <Link href="/stores">
                <Button className="btn-sage group">
                  Discover Stores
                </Button>
              </Link>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8">
                <TabsTrigger value="all">All ({favorites.length})</TabsTrigger>
                {areas.slice(0, 2).map(area => (
                  <TabsTrigger key={area} value={area}>
                    {area} ({getFavoritesByArea(area).length})
                  </TabsTrigger>
                ))}
                {categories.slice(0, 2).map(category => (
                  <TabsTrigger key={category} value={category} className="hidden lg:flex">
                    {category} ({getFavoritesByCategory(category).length})
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeTab}>
                {getTabFavorites().length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No favorites found matching your search.</p>
                    <Button onClick={() => setSearchTerm("")} variant="outline">
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-2 gap-6">
                    {getTabFavorites().map((favorite) => (
                      <FavoriteCard key={favorite.id} favorite={favorite} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      {favorites.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-r from-sage/5 to-sand/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-luxury text-center mb-8">Your Shopping Profile</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-glass text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-sage mb-2">{areas.length}</div>
                  <div className="text-gray-600">Shopping Areas</div>
                </CardContent>
              </Card>
              
              <Card className="card-glass text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-coral mb-2">{categories.length}</div>
                  <div className="text-gray-600">Store Categories</div>
                </CardContent>
              </Card>
              
              <Card className="card-glass text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gold mb-2">
                    {favorites.filter(f => f.notifyOfOffers).length}
                  </div>
                  <div className="text-gray-600">Offer Alerts Active</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}