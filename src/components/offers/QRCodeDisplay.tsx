"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Store } from "lucide-react";

interface QRCodeDisplayProps {
  qrData: string;
  offerTitle: string;
  storeName: string;
  redemptionCode: string;
}

export default function QRCodeDisplay({ 
  qrData, 
  offerTitle, 
  storeName, 
  redemptionCode 
}: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, you'd use a QR code library like 'qrcode' or 'react-qr-code'
    // For demo purposes, we'll create a visual placeholder
    if (qrRef.current) {
      // Clear previous content
      qrRef.current.innerHTML = '';
      
      // Create QR code placeholder (in production, use actual QR library)
      const qrSize = 200;
      const canvas = document.createElement('canvas');
      canvas.width = qrSize;
      canvas.height = qrSize;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create a simple QR-code-like pattern for demo
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, qrSize, qrSize);
        
        ctx.fillStyle = '#000000';
        const cellSize = 10;
        
        // Create a pattern that looks like a QR code
        for (let y = 0; y < qrSize; y += cellSize) {
          for (let x = 0; x < qrSize; x += cellSize) {
            // Use hash of position and qrData to determine if cell should be filled
            const hash = (x + y + qrData.length) % 3;
            if (hash === 0) {
              ctx.fillRect(x, y, cellSize, cellSize);
            }
          }
        }
        
        // Add corner markers
        ctx.fillRect(0, 0, 60, 60);
        ctx.fillRect(qrSize - 60, 0, 60, 60);
        ctx.fillRect(0, qrSize - 60, 60, 60);
        
        // Add white squares in corners
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(10, 10, 40, 40);
        ctx.fillRect(qrSize - 50, 10, 40, 40);
        ctx.fillRect(10, qrSize - 50, 40, 40);
        
        // Add small black squares in corner centers
        ctx.fillStyle = '#000000';
        ctx.fillRect(20, 20, 20, 20);
        ctx.fillRect(qrSize - 40, 20, 20, 20);
        ctx.fillRect(20, qrSize - 40, 20, 20);
        
        qrRef.current.appendChild(canvas);
      }
    }
  }, [qrData]);

  return (
    <Card className="border-2 border-dashed border-gold/30 bg-gold/5">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30 mb-2">
            QR Code Ready
          </Badge>
          <h3 className="font-semibold text-navy text-lg mb-1">Digital Pass</h3>
          <p className="text-sm text-gray-600">{offerTitle}</p>
        </div>
        
        {/* QR Code */}
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4 inline-block">
          <div ref={qrRef} className="flex justify-center" />
        </div>
        
        {/* Instructions */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Smartphone className="w-4 h-4 text-coral" />
            <span>Show this QR code at checkout</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Store className="w-4 h-4 text-sage" />
            <span>Valid at {storeName}</span>
          </div>
        </div>
        
        {/* Redemption Code */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Backup Code</p>
          <p className="font-mono font-bold text-navy">{redemptionCode}</p>
          <p className="text-xs text-gray-500 mt-1">
            If QR code doesn&apos;t work, staff can enter this code manually
          </p>
        </div>
        
        {/* Security Note */}
        <div className="mt-4 text-xs text-gray-500">
          <p>🔒 This QR code is unique to your account and expires when used</p>
        </div>
      </CardContent>
    </Card>
  );
}