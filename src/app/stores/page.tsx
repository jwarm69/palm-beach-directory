import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for stores
const stores = [
  {
    id: 1,
    name: "C. Orrico",
    slug: "c-orrico",
    description: "Timeless elegance and sophisticated fashion for the modern woman",
    area: "Worth Avenue",
    category: "Women&apos;s Fashion",
    isPremium: true,
    hasOffer: true,
    image: "/api/placeholder/300/200",
    priceRange: "$$$$"
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
    priceRange: "$$$$"
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
    priceRange: "$$$$"
  },
  {
    id: 4,
    name: "The Colony Shop",
    slug: "colony-shop",
    description: "Preppy style and classic American fashion",
    area: "Royal Poinciana",
    category: "Fashion",
    isPremium: false,
    hasOffer: true,
    image: "/api/placeholder/300/200",
    priceRange: "$$$"
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
    priceRange: "$$$"
  },
  {
    id: 6,
    name: "Rapunzel&apos;s Closet",
    slug: "rapunzels-closet",
    description: "Contemporary fashion and unique designer pieces",
    area: "CityPlace",
    category: "Women&apos;s Fashion",
    isPremium: false,
    hasOffer: false,
    image: "/api/placeholder/300/200",
    priceRange: "$$"
  }
];

export default function StoresPage() {
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
          
          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" className="bg-white">All Stores</Button>
            <Button variant="outline" className="bg-white">Worth Avenue</Button>
            <Button variant="outline" className="bg-white">Royal Poinciana</Button>
            <Button variant="outline" className="bg-white">CityPlace</Button>
            <Button variant="outline" className="bg-gold text-navy">With Offers</Button>
          </div>
        </div>
      </section>

      {/* Store Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store) => (
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