"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StoreFilters from "@/components/StoreFilters";
import { getStores } from "@/lib/database";
import type { Store } from "@/types";
import { LoadingState } from "@/components/ui/loading";

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    areas: [] as string[],
    categories: [] as string[],
    priceRanges: [] as string[],
    amenities: [] as string[],
    searchQuery: ""
  });

  useEffect(() => {
    const loadStores = async () => {
      try {
        const storesData = await getStores();
        setStores(storesData);
      } catch (error) {
        console.error('Error loading stores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStores();
  }, []);

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      // Search query filter
      if (filters.searchQuery && !store.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !store.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      // Area filter
      if (filters.areas.length > 0 && !filters.areas.includes(store.area)) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(store.category)) {
        return false;
      }

      // Price range filter
      if (filters.priceRanges.length > 0 && !filters.priceRanges.includes(store.priceRange)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasMatchingAmenity = filters.amenities.some(amenity => 
          store.amenities.includes(amenity)
        );
        if (!hasMatchingAmenity) {
          return false;
        }
      }

      return true;
    });
  }, [stores, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand-50 to-sage-50">
        <div className="container mx-auto px-6 py-20">
          <LoadingState />
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
            Luxury Shopping Directory
          </h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Discover Palm Beach's finest boutiques, galleries, and luxury retailers. 
            Each store is carefully curated to provide an exceptional shopping experience.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-navy-600">
              <div className="w-3 h-3 bg-gold-400 rounded-full"></div>
              <span className="text-sm font-medium">{stores.length} Premium Stores</span>
            </div>
            <div className="flex items-center gap-2 text-navy-600">
              <div className="w-3 h-3 bg-coral-400 rounded-full"></div>
              <span className="text-sm font-medium">{filteredStores.length} Results</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <StoreFilters 
            stores={stores} 
            onFilterChange={handleFilterChange}
            filters={filters}
          />
        </div>

        {/* Results */}
        {filteredStores.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-navy-800 mb-4">No stores found</h3>
            <p className="text-navy-600 mb-8 max-w-md mx-auto">
              Try adjusting your filters or search terms to find more stores.
            </p>
            <Button 
              onClick={() => setFilters({
                areas: [],
                categories: [],
                priceRanges: [],
                amenities: [],
                searchQuery: ""
              })}
              className="btn-luxury"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map((store) => (
              <Card key={store.id} className="card-luxury group hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={store.image || '/api/placeholder/300/200'}
                    alt={store.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="px-3 py-1 bg-navy-800/90 text-sand-50 text-xs rounded-full font-medium">
                      {store.priceRange}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-navy-800 group-hover:text-gold-600 transition-colors">
                        {store.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-navy-600">{store.area}</span>
                        <span className="text-navy-300">•</span>
                        <span className="text-sm text-navy-600">{store.category}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-navy-600 mb-4 line-clamp-2">
                    {store.description}
                  </CardDescription>

                  {store.amenities && store.amenities.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {store.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-md font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                        {store.amenities.length > 3 && (
                          <span className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-md font-medium">
                            +{store.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    <Link href={`/stores/${store.slug}`}>
                      <Button className="btn-luxury flex-1">
                        View Details
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
              Ready to Start Shopping?
            </h3>
            <p className="text-xl text-navy-600 mb-8 max-w-2xl mx-auto">
              Join our exclusive community and unlock special offers from Palm Beach's finest retailers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offers">
                <Button className="btn-gold min-w-48">
                  View Exclusive Offers
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" className="min-w-48 border-navy-300 text-navy-800 hover:bg-navy-50">
                  Upcoming Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}