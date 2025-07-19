import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Palm Beach Luxury Guide - Your Premier Shopping Concierge",
  description: "Learn about Palm Beach Luxury Guide's mission to connect discerning shoppers with the finest boutiques on Worth Avenue and beyond.",
  keywords: "about Palm Beach Luxury Guide, Worth Avenue shopping, luxury retail concierge, Palm Beach business directory",
  openGraph: {
    title: "About Palm Beach Luxury Guide | Premier Shopping Experience",
    description: "Your trusted guide to luxury shopping in Palm Beach since 2025",
    type: "website",
  },
  alternates: {
    canonical: "https://palm-beach-directory.vercel.app/about",
  },
};

const team = [
  {
    name: "Catherine Worthington",
    title: "Founder & CEO",
    description: "Former Worth Avenue boutique owner with 20+ years in luxury retail",
    image: "/api/placeholder/300/300"
  },
  {
    name: "James Patterson",
    title: "Director of Partnerships",
    description: "Expert in luxury brand relationships and exclusive offer curation",
    image: "/api/placeholder/300/300"
  },
  {
    name: "Sofia Rodriguez",
    title: "Head of Concierge Services",
    description: "Former Four Seasons concierge specializing in luxury experiences",
    image: "/api/placeholder/300/300"
  }
];

const press = [
  {
    publication: "Worth Magazine",
    headline: "The Digital Guide Transforming Palm Beach Shopping",
    date: "December 2024",
    quote: "A sophisticated platform that captures the essence of Worth Avenue's luxury experience."
  },
  {
    publication: "Palm Beach Daily News",
    headline: "Local Directory Connects Shoppers with Exclusive Offers",
    date: "November 2024",
    quote: "An invaluable resource for both locals and visitors seeking the finest retail experiences."
  },
  {
    publication: "Florida Trend",
    headline: "Digital Innovation Meets Timeless Luxury",
    date: "October 2024",
    quote: "Setting the standard for how luxury retail directories should operate."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6 animate-fade-in">
            About Palm Beach
            <span className="block text-gold">Luxury Guide</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your premier digital concierge for discovering the finest boutiques, exclusive offers, and unparalleled shopping experiences in Palm Beach.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Founded in 2025, Palm Beach Luxury Guide was born from a simple observation: the world&apos;s most sophisticated shoppers deserve a digital experience that matches the elegance of Worth Avenue itself.
                </p>
                <p>
                  Our founder, Catherine Worthington, spent two decades as a boutique owner on Worth Avenue before recognizing the need for a curated platform that could bridge the gap between luxury retailers and discerning customers.
                </p>
                <p>
                  Today, we partner with over 50 premium boutiques to offer exclusive welcome offers, insider access to events, and personalized shopping experiences that honor Palm Beach&apos;s tradition of exceptional service.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="h-96 bg-gradient-luxury rounded-2xl flex items-center justify-center shadow-luxury">
                <span className="text-white text-3xl font-display">Worth Avenue Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 bg-sand/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-luxury text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">✨</span>
                </div>
                <CardTitle className="text-luxury">Curated Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We carefully select only the finest boutiques that meet our standards for quality, service, and luxury experience.
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-coral text-2xl">🤝</span>
                </div>
                <CardTitle className="text-luxury">Exclusive Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our relationships with boutique owners enable us to offer exclusive welcome offers and VIP experiences unavailable elsewhere.
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-sage text-2xl">💎</span>
                </div>
                <CardTitle className="text-luxury">Personal Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every interaction reflects the personalized attention and sophisticated service Palm Beach is renowned for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-luxury text-center">
                <CardHeader>
                  <div className="w-32 h-32 bg-gradient-to-br from-sand/30 to-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-navy/60 text-lg font-display">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <CardTitle className="text-luxury">{member.name}</CardTitle>
                  <CardDescription className="text-gold font-medium">{member.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-16 px-4 bg-sand/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">In the Press</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {press.map((article, index) => (
              <Card key={index} className="card-luxury">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-luxury text-lg">{article.publication}</CardTitle>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>
                  <CardDescription className="font-medium text-navy">
                    {article.headline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-600 italic">
                    &ldquo;{article.quote}&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-display font-semibold text-navy mb-6">Get in Touch</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-navy">General Inquiries</h4>
                  <p>hello@palmbeachluxe.com</p>
                  <p>(561) 555-LUXE</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Business Partnerships</h4>
                  <p>partners@palmbeachluxe.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Concierge Services</h4>
                  <p>concierge@palmbeachluxe.com</p>
                  <p>(561) 555-VIP1</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Office</h4>
                  <p>Worth Avenue Plaza<br />Palm Beach, FL 33480</p>
                </div>
              </div>
            </div>

            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury">Send us a Message</CardTitle>
                <CardDescription>
                  We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Catherine" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="catherine@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Partnership Inquiry" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      id="message" 
                      className="w-full h-24 px-3 py-2 text-sm ring-offset-background border border-input rounded-md resize-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button className="btn-luxury w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Discover Palm Beach&apos;s Finest?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of discerning shoppers who trust us for their luxury shopping experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stores">
              <Button className="bg-gold hover:bg-gold/90 text-navy text-lg px-8 py-4">
                Explore Stores
              </Button>
            </Link>
            <Link href="/offers">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy text-lg px-8 py-4">
                View Exclusive Offers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}