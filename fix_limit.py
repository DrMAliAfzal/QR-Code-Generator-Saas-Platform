import re

with open('src/components/qr/QRGenerator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_func = """  const handleDownload = () => {
    if (!qrCodeStyling) return;
    qrCodeStyling.download({ name: 'Smart-QR-Studio', extension: 'png' });
  };"""

new_func = """  const handleDownload = () => {
    if (!qrCodeStyling) return;
    
    // Check free limit
    const limitKey = 'smart_qr_usage';
    let usage = { week_start: Date.now(), counts: {} as Record<string, number> };
    try {
      const stored = localStorage.getItem(limitKey);
      if (stored) {
        usage = JSON.parse(stored);
      }
    } catch (e) {}

    // Reset if 7 days passed
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - usage.week_start > SEVEN_DAYS) {
      usage = { week_start: Date.now(), counts: {} };
    }

    const count = usage.counts[activeTab] || 0;
    if (count >= 5) {
      alert(`You have reached your weekly limit of 5 free downloads for this QR type. Please upgrade to Pro or try again next week!`);
      return;
    }

    // Increment count
    usage.counts[activeTab] = count + 1;
    localStorage.setItem(limitKey, JSON.stringify(usage));

    qrCodeStyling.download({ name: 'Smart-QR-Studio', extension: 'png' });
  };"""

if old_func in content:
    content = content.replace(old_func, new_func)
    with open('src/components/qr/QRGenerator.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Function replaced successfully.")
else:
    print("Old function not found. Trying regex.")
    pattern = re.compile(r"const handleDownload = \(\) => \{.*?qrCodeStyling\.download\(\{ name: 'Smart-QR-Studio', extension: 'png' \}\);\s*\}", re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(new_func, content)
        with open('src/components/qr/QRGenerator.tsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Function replaced with regex successfully.")
    else:
        print("Could not find the function to replace.")

