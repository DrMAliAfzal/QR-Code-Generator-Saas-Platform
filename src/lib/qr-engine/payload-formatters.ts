export function formatWifi(ssid: string, password?: string, encryption: 'WPA' | 'WEP' | 'nopass' = 'WPA', hidden: boolean = false) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const enc = encryption;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hid = hidden;
  return "WIFI:T:${encryption};S:${ssid};P:${password || ''};H:${hidden ? 'true' : 'false'};;";
}

export function formatVCard(data: { name: string, phone?: string, email?: string, org?: string, title?: string, url?: string }) {
  const parts = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    "N:${data.name}",
    "FN:${data.name}"
  ];
  if (data.org) parts.push("ORG:${data.org}");
  if (data.title) parts.push("TITLE:${data.title}");
  if (data.phone) parts.push("TEL:${data.phone}");
  if (data.email) parts.push("EMAIL:${data.email}");
  if (data.url) parts.push("URL:${data.url}");
  parts.push('END:VCARD');
  return parts.join('\n');
}

export function formatWhatsApp(phone: string, text?: string) {
  const cleanPhone = phone.replace(/\D/g, '');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _c = cleanPhone;
  if (text) {
    return "https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}";
  }
  return "https://wa.me/${cleanPhone}";
}
