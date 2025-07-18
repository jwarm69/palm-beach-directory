import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Percent, Star, Calendar } from "lucide-react";

// Mock offers data
const offers = [
  {
    id: 1,
    title: "First Time Visitor Special",
    description: "Enjoy 15% off your first purchase and a complimentary styling consultation with our personal shopper.",
    type: "percent",
    value: "15%",
    store: {
      name: "C. Orrico",
      slug: "c-orrico",
      area: "Worth Avenue"
    },
    terms: "Valid for new customers only. Cannot be combined with other offers. Minimum purchase of $200 required.",
    validUntil: "2025-12-31",
    isExclusive: true
  },
  {
    id: 2,
    title: "Complimentary Jewelry Consultation",
    description: "Book a private consultation with our jewelry specialist and receive a complimentary jewelry cleaning.",
    type: "experience",
    value: "Free Service",
    store: {
      name: "Tiffany & Co.",
      slug: "tiffany-co",
      area: "Worth Avenue"
    },
    terms: "By appointment only. Valid for first-time visitors.",
    validUntil: "2025-12-31",
    isExclusive: true
  },
  {
    id: 3,
    title: "New Customer Welcome",
    description: "Receive a complimentary gift with your first purchase over $150.",
    type: "gift",
    value: "Free Gift",
    store: {
      name: "Stubbs & Wootton",
      slug: "stubbs-wootton",
      area: "Worth Avenue"
    },
    terms: "Minimum purchase of $150. Gift while supplies last.",
    validUntil: "2025-06-30",
    isExclusive: false
  },
  {
    id: 4,
    title: "Personal Shopping Session",
    description: "Complimentary one-hour personal shopping session with our style consultant.",
    type: "experience",
    value: "1 Hour Session",
    store: {
      name: "The Colony Shop",
      slug: "colony-shop",
      area: "Royal Poinciana"
    },
    terms: "By appointment only. Available Monday-Friday.",
    validUntil: "2025-12-31",
    isExclusive: false
  },
  {
    id: 5,
    title: "Welcome Discount",
    description: "Get 10% off your entire first purchase when you sign up for our newsletter.",
    type: "percent",
    value: "10%",
    store: {
      name: "Rapunzel's Closet",
      slug: "rapunzels-closet",
      area: "CityPlace"
    },
    terms: "Valid for new newsletter subscribers. One-time use only.",
    validUntil: "2025-12-31",
    isExclusive: false
  }
];

const getOfferIcon = (type: string) => {
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

const getOfferColor = (type: string) => {
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

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
            Welcome Offers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Exclusive privileges for first-time visitors to Palm Beach's finest retailers. 
            Discover complimentary services, special discounts, and unique experiences.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" className="bg-white">All Offers</Button>
            <Button variant="outline" className="bg-white">
              <Percent className="w-4 h-4 mr-2" />
              Discounts
            </Button>
            <Button variant="outline" className="bg-white">
              <Star className="w-4 h-4 mr-2" />
              Experiences
            </Button>
            <Button variant="outline" className="bg-white">
              <Gift className="w-4 h-4 mr-2" />
              Free Gifts
            </Button>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <Card key={offer.id} className={`card-luxury group cursor-pointer h-full ${offer.isExclusive ? 'ring-2 ring-gold/30' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-full ${getOfferColor(offer.type)}`}>
                      {getOfferIcon(offer.type)}
                    </div>
                    {offer.isExclusive && (
                      <span className="bg-gold text-navy text-xs px-2 py-1 rounded-full font-medium">
                        Exclusive
                      </span>
                    )}
                  </div>
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
                  <div className={`inline-block px-3 py-1 rounded-full text-lg font-bold ${getOfferColor(offer.type)}`}>
                    {offer.value}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {offer.description}
                  </p>
                  <div className="space-y-3">
                    <div className="text-xs text-gray-500">
                      <strong>Terms:</strong> {offer.terms}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        Valid until {new Date(offer.validUntil).toLocaleDateString()}
                      </div>
                    </div>
                    <Link href={`/stores/${offer.store.slug}`}>
                      <Button 
                        className="w-full btn-luxury group-hover:bg-gold group-hover:text-navy transition-all"
                        size="sm"
                      >
                        Claim Offer
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-sand/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            How Welcome Offers Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-gold">1</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  Browse Offers
                </h3>
                <p className="text-gray-600">
                  Explore exclusive welcome offers from Palm Beach's finest retailers
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-coral">2</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  Visit Store
                </h3>
                <p className="text-gray-600">
                  Present the offer at the store or mention it when booking services
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-sage">3</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  Enjoy Benefits
                </h3>
                <p className="text-gray-600">
                  Receive your welcome discount, gift, or complimentary service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-navy mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore Palm Beach's shopping districts and discover your new favorites
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stores">
              <Button className="btn-luxury">
                Browse All Stores
              </Button>
            </Link>
            <Link href="/areas">
              <Button variant="outline" className="btn-gold">
                Explore Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}