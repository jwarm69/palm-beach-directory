"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  QrCode, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Copy, 
  ExternalLink,
  Gift,
  TrendingUp,
  CalendarDays
} from "lucide-react";
import { useOfferRedemption } from "@/contexts/OfferRedemptionContext";
import QRCodeDisplay from "./QRCodeDisplay";

export default function DigitalWallet() {
  const { 
    getActiveOffers, 
    getRedeemedOffers, 
    getTotalSavings
  } = useOfferRedemption();
  
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = getActiveOffers();
  const redeemedOffers = getRedeemedOffers();
  const totalSavings = getTotalSavings();

  const copyRedemptionCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7;
  };

  return (
    <div className="space-y-6">
      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-luxury">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-gold" />
            </div>
            <div className="text-2xl font-bold text-navy">{activeOffers.length}</div>
            <div className="text-sm text-gray-600">Active Offers</div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-navy">{redeemedOffers.length}</div>
            <div className="text-sm text-gray-600">Offers Used</div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-sage" />
            </div>
            <div className="text-2xl font-bold text-navy">${totalSavings}</div>
            <div className="text-sm text-gray-600">Total Saved</div>
          </CardContent>
        </Card>
      </div>

      {/* Offers Tabs */}
      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-luxury">My Digital Wallet</CardTitle>
          <CardDescription>
            Your claimed offers with QR codes for easy redemption
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">
                Active Offers ({activeOffers.length})
              </TabsTrigger>
              <TabsTrigger value="redeemed">
                Redeemed ({redeemedOffers.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-6">
              {activeOffers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Offers</h3>
                  <p className="text-gray-600 mb-6">Claim some exclusive offers to get started!</p>
                  <Button className="btn-luxury">
                    Browse Offers
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOffers.map((offer) => (
                    <Card key={offer.id} className="border border-gold/20 hover:border-gold/40 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Offer Info */}
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-navy mb-1">
                                  {offer.offerTitle}
                                </h3>
                                <p className="text-gray-600 flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {offer.storeName}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2 items-end">
                                <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30">
                                  {offer.offerValue}
                                </Badge>
                                {isExpiringSoon(offer.expiresAt) && (
                                  <Badge variant="destructive" className="text-xs">
                                    Expires Soon
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                <span>Expires {formatDate(offer.expiresAt)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Claimed {formatDate(offer.claimedAt)}</span>
                              </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Redemption Code</p>
                                  <p className="text-lg font-mono font-bold text-navy">{offer.redemptionCode}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyRedemptionCode(offer.redemptionCode)}
                                  className="flex items-center gap-2"
                                >
                                  {copiedCode === offer.redemptionCode ? (
                                    <>
                                      <CheckCircle className="w-4 h-4" />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
                                className="flex items-center gap-2"
                              >
                                <QrCode className="w-4 h-4" />
                                {selectedOffer === offer.id ? 'Hide QR Code' : 'Show QR Code'}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => window.open(`/stores/${offer.storeSlug}`, '_blank')}
                                className="flex items-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Store Info
                              </Button>
                            </div>
                          </div>

                          {/* QR Code */}
                          {selectedOffer === offer.id && (
                            <div className="lg:w-64">
                              <QRCodeDisplay 
                                qrData={offer.qrCodeData}
                                offerTitle={offer.offerTitle}
                                storeName={offer.storeName}
                                redemptionCode={offer.redemptionCode}
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="redeemed" className="mt-6">
              {redeemedOffers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Redeemed Offers Yet</h3>
                  <p className="text-gray-600">Your redeemed offers and savings will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {redeemedOffers.map((offer) => (
                    <Card key={offer.id} className="border border-green-200 bg-green-50/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <h3 className="text-lg font-semibold text-navy">
                                {offer.offerTitle}
                              </h3>
                            </div>
                            <p className="text-gray-600 flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4" />
                              {offer.storeName}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Redeemed: {formatDateTime(offer.redeemedAt!)}</span>
                              {offer.savingsAmount && (
                                <span className="font-semibold text-green-600">
                                  Saved: ${offer.savingsAmount}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              {offer.offerValue}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Redeemed
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}