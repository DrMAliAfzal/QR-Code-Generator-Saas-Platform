import QRGenerator from '@/components/qr/QRGenerator';

export const metadata = {
  title: 'Create Dynamic QR Code | Simple QR Code Generator',
};

export default function CreateDynamicQrPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Dynamic QR Code</h1>
        <p className="text-slate-500">Dynamic QR codes can be edited anytime and tracked in your dashboard.</p>
      </div>
      <QRGenerator isDynamic={true} />
    </div>
  );
}
