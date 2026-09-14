import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
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

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

