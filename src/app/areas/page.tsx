import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Store, Star } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Areas | Worth Avenue, Royal Poinciana & CityPlace Guide",
  description: "Explore Palm Beach's premier shopping districts. Worth Avenue luxury boutiques, Royal Poinciana contemporary brands, and CityPlace diverse retailers.",
  keywords: "Worth Avenue, Royal Poinciana, CityPlace, Palm Beach shopping areas, luxury districts, shopping guide",
  openGraph: {
    title: "Palm Beach Shopping Areas | Luxury District Guide",
    description: "Your guide to Palm Beach's distinct shopping districts and their unique character",
    type: "website",
  },
  alternates: {
    canonical: "https://palm-beach-directory.vercel.app/areas",
  },
};

const areas = [
  {
    name: "Worth Avenue",
    slug: "worth-avenue",
    description: "The crown jewel of luxury shopping with world-renowned boutiques and art galleries",
    storeCount: 250,
    highlights: ["Luxury Fashion", "Fine Jewelry", "Art Galleries", "Historic Architecture"],
    image: "/api/placeholder/400/250"
  },
  {
    name: "Royal Poinciana Plaza",
    slug: "royal-poinciana",
    description: "Modern luxury shopping with contemporary brands and beautiful outdoor setting",
    storeCount: 50,
    highlights: ["Contemporary Brands", "Outdoor Shopping", "Dining Options", "Events"],
    image: "/api/placeholder/400/250"
  },
  {
    name: "CityPlace",
    slug: "cityplace",
    description: "Vibrant mixed-use destination with shopping, dining, and entertainment",
    storeCount: 80,
    highlights: ["Local Favorites", "Entertainment", "Diverse Dining", "Regular Events"],
    image: "/api/placeholder/400/250"
  }
];

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
            Shopping Areas
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore Palm Beach&apos;s distinct shopping districts, each offering its own unique character, 
            atmosphere, and collection of retailers.
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`}>
                <Card className="card-luxury group cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-luxury text-2xl mb-2">
                      {area.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-4">
                      {area.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Store className="w-4 h-4" />
                        <span>{area.storeCount}+ stores</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Palm Beach</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Hero Image */}
                    <div className="h-48 bg-gradient-luxury rounded-lg mb-6 flex items-center justify-center">
                      <span className="text-white text-2xl font-display">{area.name}</span>
                    </div>
                    
                    {/* Highlights */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-navy">Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {area.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-gold fill-current flex-shrink-0" />
                            <span className="text-xs text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <span className="text-navy font-medium group-hover:text-gold transition-colors">
                        Explore Area →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-sand/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            Palm Beach Shopping Map
          </h2>
          <Card className="card-luxury">
            <CardContent className="p-8">
              <div className="h-96 bg-gradient-to-br from-sage/20 to-gold/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-display font-bold text-navy mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600">
                    Coming soon: Interactive map showing all shopping areas and stores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="card-luxury">
              <CardContent className="p-8">
                <div className="text-4xl font-display font-bold text-gold mb-2">3</div>
                <div className="text-lg font-semibold text-navy mb-2">Shopping Districts</div>
                <p className="text-gray-600">Distinct areas each with unique character</p>
              </CardContent>
            </Card>
            
            <Card className="card-luxury">
              <CardContent className="p-8">
                <div className="text-4xl font-display font-bold text-coral mb-2">380+</div>
                <div className="text-lg font-semibold text-navy mb-2">Retailers</div>
                <p className="text-gray-600">From luxury boutiques to local favorites</p>
              </CardContent>
            </Card>
            
            <Card className="card-luxury">
              <CardContent className="p-8">
                <div className="text-4xl font-display font-bold text-sage mb-2">25+</div>
                <div className="text-lg font-semibold text-navy mb-2">Welcome Offers</div>
                <p className="text-gray-600">Exclusive benefits for first-time visitors</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}