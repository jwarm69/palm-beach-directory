import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/20 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-navy mb-6 animate-fade-in">
            Palm Beach
            <span className="block text-gold">Luxury Guide</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover Worth Avenue&apos;s finest boutiques and hidden gems with exclusive welcome offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stores">
              <Button className="btn-luxury text-lg px-8 py-6">
                Explore Stores
              </Button>
            </Link>
            <Link href="/offers">
              <Button variant="outline" className="btn-gold text-lg px-8 py-6">
                View Offers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Areas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            Shopping Districts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/areas/worth-avenue">
              <Card className="card-luxury group cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-luxury">Worth Avenue</CardTitle>
                  <CardDescription>
                    The crown jewel of luxury shopping with world-renowned boutiques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-luxury rounded-lg mb-4 flex items-center justify-center" role="img" aria-label="Worth Avenue luxury shopping district">
                    <span className="text-white text-2xl font-display">Worth Ave</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Explore high-end fashion, jewelry, and art galleries
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/areas/royal-poinciana">
              <Card className="card-luxury group cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-luxury">Royal Poinciana</CardTitle>
                  <CardDescription>
                    Modern luxury shopping with contemporary brands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-gold rounded-lg mb-4 flex items-center justify-center" role="img" aria-label="Royal Poinciana Plaza shopping center">
                    <span className="text-navy text-2xl font-display">Royal P</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Discover modern luxury and lifestyle brands
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/areas/cityplace">
              <Card className="card-luxury group cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-luxury">CityPlace</CardTitle>
                  <CardDescription>
                    Vibrant shopping and dining destination
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-sage rounded-lg mb-4 flex items-center justify-center" role="img" aria-label="CityPlace shopping and entertainment district">
                    <span className="text-white text-2xl font-display">CityPlace</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Mix of premium retailers and local favorites
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Offers Preview */}
      <section className="py-16 px-4 bg-sand/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold text-navy mb-6">
            Exclusive Welcome Offers
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            First-time visitors enjoy special privileges at participating stores
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/offers?type=discount">
              <Card className="card-luxury cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-gold text-3xl mb-3">15%</div>
                  <h3 className="font-display font-semibold text-navy mb-2">First Visit Discount</h3>
                  <p className="text-gray-600">Available at premium boutiques</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/offers?type=experience">
              <Card className="card-luxury cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-coral text-3xl mb-3">🎁</div>
                  <h3 className="font-display font-semibold text-navy mb-2">Complimentary Services</h3>
                  <p className="text-gray-600">Personal styling and consultations</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-sand">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p>&copy; 2025 Palm Beach Luxury Guide. Connecting discerning shoppers with exceptional retailers.</p>
        </div>
      </footer>
    </div>
  );
}
