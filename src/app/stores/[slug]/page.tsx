import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Phone, Globe, Star } from "lucide-react";
import { Metadata } from "next";
import { LocalBusinessSchema, OfferSchema, BreadcrumbSchema } from "@/components/StructuredData";

// Mock store data
interface Store {
  name: string;
  description: string;
  area: string;
  address: string;
  phone: string;
  website: string;
  hours: { day: string; time: string }[];
  categories: string[];
  priceRange: string;
  isPremium: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
  welcomeOffer: {
    title: string;
    description: string;
    terms: string;
    validUntil: string;
  };
}

const storeData: { [key: string]: Store } = {
  "c-orrico": {
    name: "C. Orrico",
    description: "C. Orrico has been Palm Beach's destination for timeless elegance and sophisticated fashion for over three decades. Our carefully curated collection features contemporary and classic pieces for the modern woman who values quality and style.",
    area: "Worth Avenue",
    address: "250 Worth Avenue, Palm Beach, FL 33480",
    phone: "(561) 832-1515",
    website: "https://corrico.com",
    hours: [
      { day: "Monday", time: "10:00 AM - 6:00 PM" },
      { day: "Tuesday", time: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 6:00 PM" },
      { day: "Thursday", time: "10:00 AM - 6:00 PM" },
      { day: "Friday", time: "10:00 AM - 6:00 PM" },
      { day: "Saturday", time: "10:00 AM - 6:00 PM" },
      { day: "Sunday", time: "12:00 PM - 5:00 PM" }
    ],
    categories: ["Women's Fashion", "Designer Clothing", "Accessories"],
    priceRange: "$$$$",
    isPremium: true,
    rating: 4.8,
    reviewCount: 127,
    features: ["Personal Shopping", "Alterations", "Private Appointments", "Gift Services"],
    welcomeOffer: {
      title: "First Time Visitor Special",
      description: "Enjoy 15% off your first purchase and a complimentary styling consultation with our personal shopper.",
      terms: "Valid for new customers only. Cannot be combined with other offers. Minimum purchase of $200 required.",
      validUntil: "2025-12-31"
    }
  },
  "tiffany-co": {
    name: "Tiffany & Co.",
    description: "Since 1837, Tiffany & Co. has been the world's premier jeweler and America's house of design. From the iconic Tiffany Blue Box to the legendary diamond engagement rings and timeless jewelry collections.",
    area: "Worth Avenue",
    address: "200 Worth Avenue, Palm Beach, FL 33480",
    phone: "(561) 655-6100",
    website: "https://tiffany.com",
    hours: [
      { day: "Monday", time: "10:00 AM - 6:00 PM" },
      { day: "Tuesday", time: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 6:00 PM" },
      { day: "Thursday", time: "10:00 AM - 7:00 PM" },
      { day: "Friday", time: "10:00 AM - 7:00 PM" },
      { day: "Saturday", time: "10:00 AM - 7:00 PM" },
      { day: "Sunday", time: "12:00 PM - 6:00 PM" }
    ],
    categories: ["Fine Jewelry", "Engagement Rings", "Watches", "Accessories"],
    priceRange: "$$$$",
    isPremium: true,
    rating: 4.9,
    reviewCount: 203,
    features: ["Diamond Expertise", "Custom Design", "Ring Sizing", "Gift Wrapping"],
    welcomeOffer: {
      title: "Complimentary Jewelry Consultation",
      description: "Book a private consultation with our jewelry specialist and receive a complimentary jewelry cleaning.",
      terms: "By appointment only. Valid for first-time visitors.",
      validUntil: "2025-12-31"
    }
  }
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = storeData[slug];

  if (!store) {
    return {
      title: "Store Not Found | Palm Beach Luxury Guide",
      description: "The store you're looking for doesn't exist in our Palm Beach shopping directory."
    };
  }

  return {
    title: `${store.name} Palm Beach | ${store.area} ${store.categories[0]} Store`,
    description: `${store.description} Located on ${store.area}. ${store.features.slice(0, 3).join(', ')}. Rating: ${store.rating}/5 stars.`,
    keywords: `${store.name}, ${store.area}, Palm Beach shopping, ${store.categories.join(', ')}, luxury boutique`,
    openGraph: {
      title: `${store.name} | Palm Beach Luxury Shopping`,
      description: store.description,
      type: "website",
      locale: "en_US",
      siteName: "Palm Beach Luxury Guide",
    },
    twitter: {
      card: "summary_large_image",
      title: `${store.name} | Palm Beach Shopping`,
      description: store.description,
    },
    alternates: {
      canonical: `https://palm-beach-directory.vercel.app/stores/${slug}`,
    },
  };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  const store = storeData[slug];

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-navy mb-4">Store Not Found</h1>
          <p className="text-gray-600 mb-8">The store you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/stores">
            <Button className="btn-luxury">View All Stores</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentTime = new Date();
  const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase().slice(0, 3);
  const todayHours = store.hours.find((h) => h.day.toLowerCase().includes(currentDay));

  const breadcrumbItems = [
    { name: "Home", url: "https://palm-beach-directory.vercel.app" },
    { name: "Stores", url: "https://palm-beach-directory.vercel.app/stores" },
    { name: store.name, url: `https://palm-beach-directory.vercel.app/stores/${slug}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      <LocalBusinessSchema
        name={store.name}
        description={store.description}
        address={store.address}
        phone={store.phone}
        website={store.website}
        categories={store.categories}
        rating={store.rating}
        reviewCount={store.reviewCount}
        priceRange={store.priceRange}
        hours={store.hours}
      />
      {store.welcomeOffer && (
        <OfferSchema
          name={store.welcomeOffer.title}
          description={store.welcomeOffer.description}
          validFrom="2025-01-01"
          validThrough={store.welcomeOffer.validUntil}
          businessName={store.name}
          url={`https://palm-beach-directory.vercel.app/stores/${slug}`}
        />
      )}
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Store Image */}
            <div className="space-y-4">
              <div className="h-96 bg-gradient-luxury rounded-xl flex items-center justify-center">
                <span className="text-white text-4xl font-display">{store.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-gradient-gold rounded-lg"></div>
                <div className="h-24 bg-sage rounded-lg"></div>
                <div className="h-24 bg-coral/20 rounded-lg"></div>
              </div>
            </div>

            {/* Store Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-navy">
                    {store.name}
                  </h1>
                  {store.isPremium && (
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium">
                      Premium
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-gold fill-current" />
                  <span className="font-medium">{store.rating}</span>
                  <span className="text-gray-500">({store.reviewCount} reviews)</span>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {store.description}
                </p>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-navy mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {store.categories.map((category: string) => (
                    <span
                      key={category}
                      className="bg-sand/50 text-navy px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span className="text-gray-700">{store.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold" />
                  <a href={`tel:${store.phone}`} className="text-gray-700 hover:text-navy">
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gold" />
                  <a 
                    href={store.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-navy"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold" />
                  <span className="text-gray-700">
                    {todayHours ? `Today: ${todayHours.time}` : "Hours vary"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-luxury flex-1">
                  Get Directions
                </Button>
                <Button variant="outline" className="btn-gold flex-1">
                  Call Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Offer */}
      {store.welcomeOffer && (
        <section className="py-16 px-4 bg-sand/10">
          <div className="max-w-4xl mx-auto">
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury text-center text-2xl">
                  🎁 {store.welcomeOffer.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-lg text-gray-700">
                  {store.welcomeOffer.description}
                </p>
                <p className="text-sm text-gray-500">
                  {store.welcomeOffer.terms}
                </p>
                <Button className="btn-gold">
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Hours & Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Hours */}
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury">Store Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {store.hours.map((hour) => (
                    <div key={hour.day} className="flex justify-between">
                      <span className="font-medium">{hour.day}</span>
                      <span className="text-gray-600">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury">Services & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {store.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Stores */}
      <section className="py-16 px-4 bg-sand/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-navy mb-8">
            More Stores in {store.area}
          </h2>
          <Link href={`/areas/${store.area.toLowerCase().replace(' ', '-')}`}>
            <Button variant="outline" className="btn-gold">
              Explore {store.area}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}