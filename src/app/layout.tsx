import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { OrganizationSchema } from "@/components/StructuredData";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";

export const metadata: Metadata = {
  title: "Palm Beach Luxury Guide - Discover Worth Avenue's Finest",
  description: "Your definitive guide to Palm Beach's premier shopping destinations. Explore luxury boutiques, exclusive offers, and hidden gems along Worth Avenue and beyond.",
  keywords: "Palm Beach shopping, Worth Avenue, luxury boutiques, Palm Beach stores, exclusive offers",
  authors: [{ name: "Palm Beach Luxury Guide" }],
  creator: "Palm Beach Luxury Guide",
  publisher: "Palm Beach Luxury Guide",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://palm-beach-directory.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Palm Beach Luxury Guide - Worth Avenue Shopping Directory",
    description: "Discover Worth Avenue's finest boutiques and exclusive welcome offers",
    url: "https://palm-beach-directory.vercel.app",
    siteName: "Palm Beach Luxury Guide",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Palm Beach Luxury Shopping Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Beach Luxury Guide",
    description: "Discover Worth Avenue's finest boutiques and exclusive welcome offers",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1B2951",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <BookingProvider>
            <OrganizationSchema
              name="Palm Beach Luxury Guide"
              description="Your definitive guide to Palm Beach's premier shopping destinations"
              url="https://palm-beach-directory.vercel.app"
              logo="https://palm-beach-directory.vercel.app/logo.png"
            />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
