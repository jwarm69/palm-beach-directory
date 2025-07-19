import { Metadata } from "next";
import OffersClient from "./OffersClient";

export const metadata: Metadata = {
  title: "Irresistible Luxury Offers | Flash Deals & Exclusive Discounts | Palm Beach",
  description: "Don't miss out! Flash deals, countdown timers, and exclusive luxury offers from Palm Beach's finest boutiques. Limited quantities available - claim yours now!",
  keywords: "Palm Beach flash deals, luxury offers, countdown timers, exclusive discounts, limited time offers, Worth Avenue deals, luxury shopping deals",
  openGraph: {
    title: "🔥 Flash Deals & Exclusive Luxury Offers | Palm Beach Shopping",
    description: "Limited time offers with countdown timers! Don't miss these exclusive deals from luxury boutiques.",
    type: "website",
  },
  alternates: {
    canonical: "https://palm-beach-directory.vercel.app/offers",
  },
};

export default function OffersPage() {
  return <OffersClient />;
}