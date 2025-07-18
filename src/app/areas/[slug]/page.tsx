import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Car, Clock, Star } from "lucide-react";

// Mock area data
const areaData: { [key: string]: any } = {
  "worth-avenue": {
    name: "Worth Avenue",
    description: "Worth Avenue is internationally renowned as one of the world's premier luxury shopping destinations. This iconic street stretches for four blocks and features over 250 shops, boutiques, art galleries, and restaurants in a Mediterranean-style setting.",
    heroImage: "/api/placeholder/1200/400",
    highlights: [
      "Home to world-famous luxury brands",
      "Beautiful Mediterranean architecture", 
      "Art galleries and cultural venues",
      "Fine dining restaurants",
      "Historic landmarks and courtyards"
    ],
    parkingInfo: {
      description: "Several parking options are available along Worth Avenue",
      options: [
        "Street parking (2-hour limit)",
        "Worth Avenue Garage (entrance on Sunrise)",
        "Valet parking at select locations",
        "Public lots nearby"
      ]
    },
    stores: [
      {
        id: 1,
        name: "C. Orrico",
        slug: "c-orrico",
        description: "Timeless elegance and sophisticated fashion",
        category: "Women's Fashion",
        isPremium: true,
        hasOffer: true,
        rating: 4.8
      },
      {
        id: 2,
        name: "Tiffany & Co.",
        slug: "tiffany-co", 
        description: "Iconic jewelry and luxury goods since 1837",
        category: "Jewelry",
        isPremium: true,
        hasOffer: true,
        rating: 4.9
      },
      {
        id: 3,
        name: "Hermès",
        slug: "hermes",
        description: "French luxury goods and leather accessories",
        category: "Luxury Goods",
        isPremium: true,
        hasOffer: false,
        rating: 4.7
      },
      {
        id: 4,
        name: "Stubbs & Wootton",
        slug: "stubbs-wootton",
        description: "Handcrafted needlepoint slippers",
        category: "Shoes",
        isPremium: true,
        hasOffer: true,
        rating: 4.6
      }
    ]
  },
  "royal-poinciana": {
    name: "Royal Poinciana Plaza",
    description: "Royal Poinciana Plaza offers a sophisticated shopping experience with contemporary luxury brands and lifestyle retailers. This modern outdoor shopping destination combines high-end retail with beautiful landscaping and dining options.",
    heroImage: "/api/placeholder/1200/400",
    highlights: [
      "Contemporary luxury brands",
      "Beautiful outdoor setting",
      "Diverse dining options",
      "Regular events and activities",
      "Easy parking and accessibility"
    ],
    parkingInfo: {
      description: "Ample free parking available throughout the plaza",
      options: [
        "Free surface parking",
        "Covered parking areas", 
        "Accessible parking spaces",
        "Valet service available"
      ]
    },
    stores: [
      {
        id: 4,
        name: "The Colony Shop",
        slug: "colony-shop",
        description: "Preppy style and classic American fashion",
        category: "Fashion",
        isPremium: false,
        hasOffer: true,
        rating: 4.4
      }
    ]
  },
  "cityplace": {
    name: "CityPlace",
    description: "CityPlace is a vibrant mixed-use development featuring shopping, dining, entertainment, and residential spaces. This dynamic destination offers a diverse mix of retailers from well-known brands to local favorites.",
    heroImage: "/api/placeholder/1200/400",
    highlights: [
      "Mix of national and local retailers",
      "Entertainment venues and cinema",
      "Diverse dining scene",
      "Residential and office spaces",
      "Regular events and festivals"
    ],
    parkingInfo: {
      description: "Multiple parking options throughout CityPlace",
      options: [
        "Parking garages",
        "Street parking",
        "Validated parking at restaurants",
        "Residential parking areas"
      ]
    },
    stores: [
      {
        id: 6,
        name: "Rapunzel's Closet",
        slug: "rapunzels-closet",
        description: "Contemporary fashion and unique designer pieces",
        category: "Women's Fashion",
        isPremium: false,
        hasOffer: false,
        rating: 4.3
      }
    ]
  }
};

interface Props {
  params: {
    slug: string;
  };
}

export default function AreaPage({ params }: Props) {
  const area = areaData[params.slug];

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-navy mb-4">Area Not Found</h1>
          <p className="text-gray-600 mb-8">The area you're looking for doesn't exist.</p>
          <Link href="/areas">
            <Button className="btn-luxury">View All Areas</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
              {area.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {area.description}
            </p>
          </div>

          {/* Hero Image */}
          <div className="h-96 bg-gradient-luxury rounded-xl flex items-center justify-center mb-12">
            <span className="text-white text-4xl font-display">{area.name}</span>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {area.highlights.map((highlight: string, index: number) => (
              <Card key={index} className="card-luxury">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-navy font-medium">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-16 px-4 bg-sand/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            Featured Stores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {area.stores.map((store: any) => (
              <Link key={store.id} href={`/stores/${store.slug}`}>
                <Card className={`card-luxury group cursor-pointer h-full ${store.isPremium ? 'ring-2 ring-gold/20' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-luxury">{store.name}</CardTitle>
                      <div className="flex gap-1">
                        {store.isPremium && (
                          <span className="bg-gold/10 text-gold text-xs px-2 py-1 rounded-full font-medium">
                            Premium
                          </span>
                        )}
                        {store.hasOffer && (
                          <span className="bg-coral/10 text-coral text-xs px-2 py-1 rounded-full font-medium">
                            Offer
                          </span>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-sm text-gray-500">
                      {store.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gradient-to-br from-sand/30 to-sage/20 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-navy/60 font-display">{store.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {store.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold fill-current" />
                        <span className="text-sm font-medium">{store.rating}</span>
                      </div>
                      <span className="text-sm text-navy font-medium group-hover:text-gold transition-colors">
                        View Store →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/stores">
              <Button variant="outline" className="btn-gold">
                View All Stores in {area.name}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Parking Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="text-luxury flex items-center gap-3">
                <Car className="w-6 h-6 text-gold" />
                Parking Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">{area.parkingInfo.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {area.parkingInfo.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm">{option}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-sand/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-navy mb-4">
            Plan Your Visit
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover exclusive offers and make the most of your shopping experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/offers">
              <Button className="btn-luxury">
                View Welcome Offers
              </Button>
            </Link>
            <Link href="/stores">
              <Button variant="outline" className="btn-gold">
                Browse All Stores
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}