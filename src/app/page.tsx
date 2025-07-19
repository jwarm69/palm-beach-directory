import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/20 via-white/50 to-white">
      {/* Hero Section with Enhanced Glass Background */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-sage/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-coral/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-12 shadow-glass border border-white/20 mb-8">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-navy mb-6 animate-fade-in">
              Palm Beach
              <span className="block text-gold-glow animate-pulse-glow">Luxury Guide</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover Worth Avenue&apos;s finest boutiques and hidden gems with exclusive welcome offers
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/stores">
              <Button className="btn-luxury text-lg px-10 py-6 hover-lift">
                ✨ Explore Stores
              </Button>
            </Link>
            <Link href="/offers">
              <Button className="btn-gold text-lg px-10 py-6 hover-lift">
                🎁 View Offers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Areas */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-luxury mb-4">
              Premier Shopping Districts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore three distinct luxury destinations, each offering unique experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/areas/worth-avenue">
              <Card className="card-premium group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-luxury text-2xl">Worth Avenue</CardTitle>
                  <CardDescription className="text-base">
                    The crown jewel of luxury shopping with world-renowned boutiques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-52 bg-gradient-luxury rounded-xl mb-6 flex items-center justify-center shadow-luxury-deep relative overflow-hidden group-hover:scale-105 transition-transform duration-500" role="img" aria-label="Worth Avenue luxury shopping district">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-white text-3xl font-display relative z-10">Worth Ave</span>
                    <div className="absolute bottom-4 right-4 text-white/80 text-sm">Est. 1918</div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Explore high-end fashion, jewelry, and art galleries in America's most prestigious shopping destination
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/areas/royal-poinciana">
              <Card className="card-premium group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-luxury text-2xl">Royal Poinciana</CardTitle>
                  <CardDescription className="text-base">
                    Modern luxury shopping with contemporary brands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-52 bg-gradient-gold rounded-xl mb-6 flex items-center justify-center shadow-gold-deep relative overflow-hidden group-hover:scale-105 transition-transform duration-500" role="img" aria-label="Royal Poinciana Plaza shopping center">
                    <div className="absolute inset-0 bg-navy/10"></div>
                    <span className="text-navy text-3xl font-display relative z-10">Royal P</span>
                    <div className="absolute bottom-4 right-4 text-navy/70 text-sm">Waterfront</div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Discover modern luxury and lifestyle brands in a stunning waterfront setting
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/areas/cityplace">
              <Card className="card-premium group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-luxury text-2xl">CityPlace</CardTitle>
                  <CardDescription className="text-base">
                    Vibrant shopping and dining destination
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-52 bg-gradient-to-br from-sage to-sage/80 rounded-xl mb-6 flex items-center justify-center shadow-luxury-deep relative overflow-hidden group-hover:scale-105 transition-transform duration-500" role="img" aria-label="CityPlace shopping and entertainment district">
                    <div className="absolute inset-0 bg-white/10"></div>
                    <span className="text-white text-3xl font-display relative z-10">CityPlace</span>
                    <div className="absolute bottom-4 right-4 text-white/80 text-sm">Downtown</div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Experience the perfect mix of premium retailers and beloved local favorites
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Offers Preview */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background with glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/20 via-white/10 to-coral/10"></div>
        <div className="absolute inset-0 backdrop-blur-3xl bg-white/30"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-luxury mb-6">
              Exclusive Welcome Offers
            </h2>
            <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
              First-time visitors enjoy special privileges at participating stores
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-coral mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/offers?type=discount">
              <Card className="card-glass cursor-pointer group h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold-glow group-hover:scale-110 transition-all duration-500">
                    <span className="text-white text-2xl font-display font-bold">15%</span>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-luxury mb-4">First Visit Discount</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">Available at premium boutiques throughout Worth Avenue</p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <span>✨ Limited Time</span>
                    <span className="mx-2">•</span>
                    <span>🛍️ 50+ Stores</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/offers?type=experience">
              <Card className="card-glass cursor-pointer group h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-coral to-coral/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-glow group-hover:scale-110 transition-all duration-500">
                    <span className="text-white text-2xl">🎁</span>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-luxury mb-4">Complimentary Services</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">Personal styling, consultations, and exclusive experiences</p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <span>👗 Personal Styling</span>
                    <span className="mx-2">•</span>
                    <span>☕ Refreshments</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="mt-12">
            <Link href="/offers">
              <Button className="btn-glass text-lg px-10 py-4 hover-lift">
                View All Exclusive Offers →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-t from-sand/20 to-white border-t border-glass">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-8 shadow-glass border border-white/20">
            <p className="text-gray-700 text-lg leading-relaxed">
              &copy; 2025 Palm Beach Luxury Guide. 
              <span className="text-luxury font-medium"> Connecting discerning shoppers with exceptional retailers.</span>
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>🌴 Est. 2025</span>
              <span>•</span>
              <span>✨ Curated Excellence</span>
              <span>•</span>
              <span>🛍️ Luxury Redefined</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
