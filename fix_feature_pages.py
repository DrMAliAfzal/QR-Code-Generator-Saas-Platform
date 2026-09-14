import re
import os

files_to_fix = [
    'src/app/url-qr-code/page.tsx',
    'src/app/wifi-qr-code/page.tsx',
    'src/app/vcard-qr-code/page.tsx',
    'src/app/whatsapp-qr-code/page.tsx'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (does not exist)")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add imports
    if 'import Header' not in content:
        content = content.replace('import Link from \'next/link\';', 'import Link from \'next/link\';\nimport Header from "@/components/layout/Header";\nimport Footer from "@/components/layout/Footer";')
        # Some might use double quotes
        content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Header from "@/components/layout/Header";\nimport Footer from "@/components/layout/Footer";')
    
    # Replace header
    header_pattern = re.compile(r'<header.*?</header>', re.DOTALL)
    content = header_pattern.sub('<Header />', content)
    
    # Replace footer if it exists, otherwise add it
    footer_pattern = re.compile(r'<footer.*?</footer>', re.DOTALL)
    if footer_pattern.search(content):
        content = footer_pattern.sub('<Footer />', content)
    else:
        # Assuming the structure is <div...><Header/><main>...</main></div>
        content = content.replace('</main>', '</main>\n      <Footer />')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Fixed feature pages.")
