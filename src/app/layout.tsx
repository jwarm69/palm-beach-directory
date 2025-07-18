import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Palm Beach Luxury Guide - Discover Worth Avenue's Finest",
  description: "Your definitive guide to Palm Beach's premier shopping destinations. Explore luxury boutiques, exclusive offers, and hidden gems along Worth Avenue and beyond.",
  keywords: "Palm Beach shopping, Worth Avenue, luxury boutiques, Palm Beach stores, exclusive offers",
  openGraph: {
    title: "Palm Beach Luxury Guide",
    description: "Discover Worth Avenue's finest boutiques and exclusive welcome offers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
