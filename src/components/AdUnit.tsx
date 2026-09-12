'use client';
import { useEffect } from 'react';

export default function AdUnit({ slotId }: { slotId: string }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center items-center w-full min-h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
      {/* Placeholder for AdSense script insertion */}
      <span>AdSense Placeholder ({slotId})</span>
      <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={slotId}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
