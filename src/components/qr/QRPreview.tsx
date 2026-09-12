"use client";
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "../ui/button";

export default function QRPreview({ data, fgColor = "#000000", bgColor = "#ffffff", logoImg }: { data: string, fgColor?: string, bgColor?: string, logoImg?: string }) {
  const qrRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [qrCodeStyling, setQrCodeStyling] = useState<any>(null);

  useEffect(() => {
    import("qr-code-styling").then((module) => {
      const QRCodeStyling = module.default;
      const qr = new QRCodeStyling({
        width: 1000,
        height: 1000,
        data: data,
        margin: 10,
        qrOptions: { errorCorrectionLevel: 'H' },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 5 },
        dotsOptions: { color: fgColor, type: 'square' },
        backgroundOptions: { color: bgColor },
        image: logoImg,
      });
      
      setQrCodeStyling(qr);

      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qr.append(qrRef.current);
      }
    });
  }, [data, fgColor, bgColor, logoImg]);

  const handleDownload = () => {
    if (qrCodeStyling) {
      qrCodeStyling.download({ name: 'saved-qr-code', extension: 'png' });
    }
  };

  return (
    <div className="relative group w-full h-full">
      <div ref={qrRef} className="w-full h-full [&>canvas]:!w-full [&>canvas]:!h-full [&>svg]:!w-full [&>svg]:!h-full rounded-md overflow-hidden bg-white border"></div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
        <Button variant="secondary" size="icon" onClick={handleDownload} title="Download HD QR Code">
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

