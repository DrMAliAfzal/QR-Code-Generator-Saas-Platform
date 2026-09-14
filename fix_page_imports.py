import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'import Header' not in content:
    content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport Header from '@/components/layout/Header';\nimport Footer from '@/components/layout/Footer';")

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
