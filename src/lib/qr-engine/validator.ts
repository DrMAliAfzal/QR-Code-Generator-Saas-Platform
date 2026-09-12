import { QrDesignOptions, generateQrBuffer } from './generator';
import { validateQrDecode } from './decoder';

export type ScanSafetyScore = {
  score: 'Excellent' | 'Warning' | 'Unsafe';
  issues: string[];
};

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

export async function evaluateScanSafety(options: QrDesignOptions): Promise<ScanSafetyScore> {
  const issues: string[] = [];
  let score: 'Excellent' | 'Warning' | 'Unsafe' = 'Excellent';

  const fgColor = options.dotsOptions?.color || '#000000';
  const bgColor = options.backgroundOptions?.color || '#ffffff';
  const contrast = getContrastRatio(fgColor, bgColor);
  
  if (contrast < 3) {
    issues.push('Contrast ratio is dangerously low. The QR code dots are too close in color to the background.');
    score = 'Unsafe';
  } else if (contrast < 4.5) {
    issues.push('Contrast ratio is slightly low. Consider using a darker dot color or a lighter background.');
    score = 'Warning';
  }

  if (options.margin !== undefined && options.margin < 5) {
    issues.push('The quiet zone (margin) is too small. Scanners require at least some white space around the QR code.');
    score = score === 'Unsafe' ? 'Unsafe' : 'Warning';
  }

  if (options.image) {
    const logoSize = options.imageOptions?.imageSize || 0.4;
    if (logoSize > 0.3) {
      issues.push(`Logo covers ${Math.round(logoSize * 100)}% of the QR code. We recommend keeping it under 30% to prevent covering critical data.`);
      score = 'Warning'; 
    }
  }

  try {
    const buffer = await generateQrBuffer(options, 'png');
    const isReadable = await validateQrDecode(buffer);
    
    if (!isReadable) {
      issues.push('The generated QR code completely fails to decode in our scanner simulation. Do not print this code.');
      score = 'Unsafe';
    }
  } catch {
    issues.push('Failed to run decode simulation on the generated image.');
    score = 'Unsafe';
  }

  return { score, issues };
}
