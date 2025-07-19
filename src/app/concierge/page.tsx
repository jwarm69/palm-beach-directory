import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concierge Services | Personal Shopping & VIP Experiences",
  description: "Premium concierge services for discerning shoppers. Personal shopping, private appointments, transportation, and exclusive access to Palm Beach's finest boutiques.",
  keywords: "Palm Beach concierge, personal shopping, VIP services, luxury shopping assistant, private appointments",
  openGraph: {
    title: "Palm Beach Luxury Concierge Services",
    description: "Personalized shopping experiences and VIP services in Palm Beach",
    type: "website",
  },
  alternates: {
    canonical: "https://palm-beach-directory.vercel.app/concierge",
  },
};

const services = [
  {
    title: "Personal Shopping",
    icon: "👜",
    description: "Dedicated stylist to curate your perfect wardrobe",
    features: [
      "One-on-one styling consultation",
      "Wardrobe assessment and planning",
      "Pre-selected pieces based on preferences",
      "Private fitting appointments",
      "Styling for special occasions"
    ],
    pricing: "From $200/hour",
    duration: "2-4 hours",
    bookingNotice: "24 hours"
  },
  {
    title: "VIP Shopping Experience",
    icon: "⭐",
    description: "After-hours exclusive access to multiple boutiques",
    features: [
      "Private store access outside regular hours",
      "Champagne and refreshments",
      "Personal shopping assistant",
      "Complimentary alterations",
      "Valet parking included"
    ],
    pricing: "From $500/experience",
    duration: "3-5 hours",
    bookingNotice: "48 hours"
  },
  {
    title: "Special Occasion Styling",
    icon: "✨",
    description: "Complete styling for galas, weddings, and events",
    features: [
      "Outfit planning consultation",
      "Accessories coordination",
      "Hair and makeup recommendations",
      "Final fitting and adjustments",
      "Day-of styling assistance"
    ],
    pricing: "From $350/session",
    duration: "Full day available",
    bookingNotice: "1 week"
  },
  {
    title: "Gift Concierge",
    icon: "🎁",
    description: "Expertly curated gifts for any occasion",
    features: [
      "Personalized gift recommendations",
      "Budget-conscious options",
      "Beautiful gift wrapping",
      "Personal message cards",
      "Delivery coordination"
    ],
    pricing: "From $100/consultation",
    duration: "1-2 hours",
    bookingNotice: "Same day available"
  },
  {
    title: "Wardrobe Consulting",
    icon: "👗",
    description: "Comprehensive closet organization and planning",
    features: [
      "Closet audit and organization",
      "Seasonal wardrobe planning",
      "Color and style analysis",
      "Shopping lists and recommendations",
      "Ongoing style support"
    ],
    pricing: "From $400/consultation",
    duration: "Half or full day",
    bookingNotice: "3 days"
  },
  {
    title: "Luxury Transportation",
    icon: "🚗",
    description: "Premium transportation between boutiques",
    features: [
      "Luxury vehicle with professional driver",
      "Shopping bag handling",
      "Multiple stop coordination",
      "Complimentary refreshments",
      "Flexible scheduling"
    ],
    pricing: "From $150/hour",
    duration: "Minimum 2 hours",
    bookingNotice: "24 hours"
  }
];

const testimonials = [
  {
    name: "Catherine M.",
    location: "New York",
    service: "VIP Shopping Experience",
    quote: "The most exceptional shopping experience I've ever had. Every detail was perfect, from the private boutique access to the personalized service.",
    rating: 5
  },
  {
    name: "James H.",
    location: "London",
    service: "Personal Shopping",
    quote: "My stylist understood my needs perfectly and helped me find pieces I never would have discovered on my own. Highly recommend!",
    rating: 5
  },
  {
    name: "Sofia L.",
    location: "Miami",
    service: "Special Occasion Styling",
    quote: "Made my charity gala appearance effortless. The attention to detail and professional expertise exceeded my expectations.",
    rating: 5
  }
];

const packages = [
  {
    name: "Essential",
    price: "$200",
    duration: "2 hours",
    description: "Perfect for focused shopping needs",
    features: [
      "Personal shopping consultation",
      "2 boutique visits",
      "Style recommendations",
      "Basic alterations coordination"
    ],
    popular: false
  },
  {
    name: "Premium",
    price: "$500",
    duration: "Half day",
    description: "Comprehensive shopping experience",
    features: [
      "Extended personal shopping",
      "4-5 boutique visits",
      "Wardrobe planning",
      "Complimentary refreshments",
      "Priority alterations",
      "Shopping bag assistance"
    ],
    popular: true
  },
  {
    name: "Luxury",
    price: "$1,000",
    duration: "Full day",
    description: "Ultimate VIP treatment",
    features: [
      "Full-day personal stylist",
      "Unlimited boutique access",
      "Private appointments",
      "Luxury transportation",
      "Champagne service",
      "Concierge support",
      "Same-day alterations"
    ],
    popular: false
  }
];

export default function ConciergePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6 animate-fade-in">
            Concierge
            <span className="block text-gold">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Elevate your shopping experience with our personalized concierge services. From personal styling to VIP access, we ensure every detail exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-luxury text-lg px-8 py-4">
              Book Consultation
            </Button>
            <Button variant="outline" className="btn-gold text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-luxury group hover:scale-105 transition-transform duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <CardTitle className="text-luxury text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-gold mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-sand/20 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pricing:</span>
                      <span className="font-semibold text-navy">{service.pricing}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-navy">{service.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Booking:</span>
                      <span className="text-navy">{service.bookingNotice}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 btn-gold">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-sand/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-navy mb-4">
              Service Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our curated packages designed to meet different shopping needs and preferences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`card-luxury relative ${pkg.popular ? 'ring-2 ring-gold scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-luxury text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-display font-bold text-navy">{pkg.price}</div>
                  <CardDescription className="text-gold font-medium">{pkg.duration}</CardDescription>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <svg className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'btn-luxury' : 'btn-gold'}`}>
                    Choose {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="font-display font-semibold text-navy mb-2">Consultation</h3>
              <p className="text-gray-600 text-sm">
                Initial conversation to understand your style, preferences, and specific needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-navy text-2xl font-bold">2</span>
              </div>
              <h3 className="font-display font-semibold text-navy mb-2">Planning</h3>
              <p className="text-gray-600 text-sm">
                Curated itinerary with pre-selected boutiques and appointments tailored to you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="font-display font-semibold text-navy mb-2">Experience</h3>
              <p className="text-gray-600 text-sm">
                Enjoy your personalized shopping experience with dedicated concierge support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="font-display font-semibold text-navy mb-2">Follow-up</h3>
              <p className="text-gray-600 text-sm">
                Alterations coordination and ongoing style support as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-sand/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy text-center mb-12">
            Client Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-luxury">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-4 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-sand/20 pt-4">
                    <div className="font-semibold text-navy">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-sm text-gold">{testimonial.service}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-navy mb-4">
              Book Your Experience
            </h2>
            <p className="text-xl text-gray-600">
              Ready to elevate your shopping experience? Get in touch with our concierge team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-display font-semibold text-navy mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-navy">Phone</div>
                    <div className="text-gray-600">(561) 555-LUXE</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-navy">Email</div>
                    <div className="text-gray-600">concierge@palmbeachluxe.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-navy">Hours</div>
                    <div className="text-gray-600">Mon-Sat: 9AM-7PM<br />Sun: 11AM-5PM</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury">Request Consultation</CardTitle>
                <CardDescription>
                  Tell us about your needs and we&apos;ll create the perfect experience for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Jane" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Smith" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  
                  <div>
                    <Label htmlFor="service">Preferred Service</Label>
                    <select 
                      id="service" 
                      className="w-full px-3 py-2 border border-input rounded-md bg-white focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="">Select a service</option>
                      <option value="personal-shopping">Personal Shopping</option>
                      <option value="vip-experience">VIP Shopping Experience</option>
                      <option value="special-occasion">Special Occasion Styling</option>
                      <option value="gift-concierge">Gift Concierge</option>
                      <option value="wardrobe-consulting">Wardrobe Consulting</option>
                      <option value="transportation">Luxury Transportation</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <select 
                      id="budget" 
                      className="w-full px-3 py-2 border border-input rounded-md bg-white focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="over-5000">Over $5,000</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Special Requests</Label>
                    <textarea 
                      id="message" 
                      className="w-full h-24 px-3 py-2 text-sm ring-offset-background border border-input rounded-md resize-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Tell us about your specific needs, preferences, or any special occasions..."
                    />
                  </div>
                  
                  <Button className="btn-luxury w-full">Request Consultation</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}