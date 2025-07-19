"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StoreFilters from "@/components/StoreFilters";

interface Store {
  id: number;
  name: string;
  slug: string;
  description: string;
  area: string;
  category: string;
  isPremium: boolean;
  hasOffer: boolean;
  image: string;
  priceRange: string;
  amenities?: string[];
}

// Enhanced mock data for stores
const stores: Store[] = [
  {
    id: 1,
    name: "C. Orrico",
    slug: "c-orrico",
    description: "Timeless elegance and sophisticated fashion for the modern woman",
    area: "Worth Avenue",
    category: "Women's Fashion",
    isPremium: true,
    hasOffer: true,
    image: "/api/placeholder/300/200",
    priceRange: "$$$$",
    amenities: ["Personal Shopping", "Alterations", "Private Appointments", "Gift Wrapping"]
  },
  {
    id: 2,
    name: "Tiffany & Co.",
    slug: "tiffany-co",
    description: "Iconic jewelry and luxury goods since 1837",
    area: "Worth Avenue",
    category: "Jewelry",
    isPremium: true,
    hasOffer: true,
    image: "/api/placeholder/300/200",
    priceRange: "$$$$",
    amenities: ["VIP Services", "Custom Orders", "Gift Wrapping", "Complimentary Refreshments"]
  },
  {
    id: 3,
    name: "Hermès",
    slug: "hermes",
    description: "French luxury goods manufacturer specializing in leather, lifestyle accessories",
    area: "Worth Avenue",
    category: "Luxury Goods",
    isPremium: true,
    hasOffer: false,
    image: "/api/placeholder/300/200",
    priceRange: "$$$$",
    amenities: ["Personal Shopping", "VIP Services", "Custom Orders", "Valet Parking"]
  },
  {
    id: 4,
    name: "The Colony Shop",
    slug: "colony-shop",
    description: "Preppy style and classic American fashion",
    area: "Royal Poinciana",
    category: "Men's Fashion",
    isPremium: false,
    hasOffer: true,
    image: "/api/placeholder/300/200",
    priceRange: "$$$",
    amenities: ["Alterations", "Gift Wrapping", "Personal Shopping"]
  },
  {
    id: 5,
    name: "Stubbs & Wootton",
    slug: "stubbs-wootton",
    description: "Handcrafted needlepoint slippers and luxury accessories",
    area: "Worth Avenue",
    category: "Shoes & Accessories",
    isPremium: true,
    hasOffer: true,
    image: "/api/placeholder/300/200",
    priceRange: "$$$",
    amenities: ["Custom Orders", "Gift Wrapping", "Personal Shopping"]
  },
  {
    id: 6,
    name: "Rapunzel's Closet",
    slug: "rapunzels-closet",
    description: "Contemporary fashion and unique designer pieces",
    area: "CityPlace",
    category: "Women's Fashion",
    isPremium: false,
    hasOffer: false,
    image: "/api/placeholder/300/200",
    priceRange: "$$",
    amenities: ["Alterations", "Gift Wrapping"]
  },
  {
    id: 7,
    name: "Worth Avenue Beauty",
    slug: "worth-avenue-beauty",
    description: "Premium skincare and luxury cosmetics",
    area: "Worth Avenue",
    category: "Beauty & Cosmetics",
    isPremium: true,
    hasOffer: true,
    image: "/api/placeholder/300/200",
    priceRange: "$$$",
    amenities: ["Complimentary Refreshments", "Private Appointments", "Gift Wrapping"]
  },
  {
    id: 8,
    name: "Palm Beach Galleries",
    slug: "palm-beach-galleries",
    description: "Fine art and exclusive collectibles",
    area: "Worth Avenue",
    category: "Art & Antiques",
    isPremium: true,
    hasOffer: false,
    image: "/api/placeholder/300/200",
    priceRange: "$$$$",
    amenities: ["VIP Services", "Custom Orders", "Private Appointments"]
  }
];

export default function StoresPage() {
  const [filters, setFilters] = useState({
    areas: [] as string[],
    categories: [] as string[],
    priceRanges: [] as string[],
    amenities: [] as string[],
    search: "",
    hasOffers: false,
    isPremium: false,
  });

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          store.name.toLowerCase().includes(searchLower) ||
          store.description.toLowerCase().includes(searchLower) ||
          store.category.toLowerCase().includes(searchLower) ||
          store.area.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
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
        const hasRequiredAmenities = filters.amenities.some(amenity => 
          store.amenities?.includes(amenity)
        );
        if (!hasRequiredAmenities) return false;
      }

      // Offers filter
      if (filters.hasOffers && !store.hasOffer) {
        return false;
      }

      // Premium filter
      if (filters.isPremium && !store.isPremium) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
            Store Directory
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover Palm Beach&apos;s finest boutiques, from Worth Avenue&apos;s luxury retailers to hidden gems throughout the area
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <StoreFilters onFiltersChange={handleFiltersChange} />
        </div>
      </section>

      {/* Results Summary */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-navy">{filteredStores.length}</span> of <span className="font-semibold">{stores.length}</span> stores
            </p>
            {filteredStores.length === 0 && (
              <Button onClick={() => setFilters({
                areas: [],
                categories: [],
                priceRanges: [],
                amenities: [],
                search: "",
                hasOffers: false,
                isPremium: false,
              })} 
              className="btn-gold">
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Store Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredStores.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-sand/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-semibold text-navy mb-4">
                No stores found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn&apos;t find any stores matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button onClick={() => setFilters({
                areas: [],
                categories: [],
                priceRanges: [],
                amenities: [],
                search: "",
                hasOffers: false,
                isPremium: false,
              })} 
              className="btn-luxury">
                View All Stores
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStores.map((store) => (
                <Link key={store.id} href={`/stores/${store.slug}`}>
                  <Card className={`card-luxury group cursor-pointer h-full ${store.isPremium ? 'ring-2 ring-gold/20' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-luxury text-xl">{store.name}</CardTitle>
                        <div className="flex gap-2">
                          {store.isPremium && (
                            <span className="bg-gold/10 text-gold text-xs px-2 py-1 rounded-full font-medium">
                              Premium
                            </span>
                          )}
                          {store.hasOffer && (
                            <span className="bg-coral/10 text-coral text-xs px-2 py-1 rounded-full font-medium">
                              Welcome Offer
                            </span>
                          )}
                        </div>
                      </div>
                      <CardDescription className="text-sm text-gray-500">
                        {store.area} • {store.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 bg-gradient-to-br from-sand/30 to-sage/20 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-navy/60 text-lg font-display">{store.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {store.description}
                      </p>
                      
                      {/* Amenities Preview */}
                      {store.amenities && store.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {store.amenities.slice(0, 2).map((amenity) => (
                            <span key={amenity} className="text-xs bg-sage/10 text-sage px-2 py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {store.amenities.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{store.amenities.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{store.priceRange}</span>
                        <span className="text-sm text-navy font-medium group-hover:text-gold transition-colors">
                          View Details →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-sand/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-navy mb-4">
            Own a Store in Palm Beach?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our exclusive directory and connect with discerning shoppers
          </p>
          <Button className="btn-luxury text-lg px-8 py-4">
            List Your Store
          </Button>
        </div>
      </section>
    </div>
  );
}