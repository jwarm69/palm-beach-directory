import { Metadata } from "next";
import DigitalWallet from "@/components/offers/DigitalWallet";

export const metadata: Metadata = {
  title: "My Digital Wallet | Claimed Offers & QR Codes | Palm Beach Directory",
  description: "View and manage your claimed offers with digital QR codes for easy redemption at Palm Beach's luxury boutiques.",
  keywords: "digital wallet, claimed offers, QR codes, Palm Beach offers, luxury shopping",
};

export default function MyOffersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
            My Digital Wallet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your claimed offers with QR codes ready for redemption at Palm Beach&apos;s finest boutiques.
          </p>
        </div>
        
        <DigitalWallet />
      </div>
    </div>
  );
}