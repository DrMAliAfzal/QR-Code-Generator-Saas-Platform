import re
import os

files_to_fix = [
    'src/app/pricing/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/blog/[slug]/page.tsx',
    'src/app/privacy-policy/page.tsx',
    'src/app/terms-of-service/page.tsx'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (does not exist)")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add imports
    if 'import Header' not in content:
        content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Header from "@/components/layout/Header";\nimport Footer from "@/components/layout/Footer";')
    
    # Replace header
    header_pattern = re.compile(r'<header.*?</header>', re.DOTALL)
    content = header_pattern.sub('<Header />', content)
    
    # Replace footer
    footer_pattern = re.compile(r'<footer.*?</footer>', re.DOTALL)
    content = footer_pattern.sub('<Footer />', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Fixed files.")
