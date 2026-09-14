with open('src/app/whatsapp-qr-code/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('defaultTab="url"', 'defaultTab="whatsapp"')
with open('src/app/whatsapp-qr-code/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/app/vcard-qr-code/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('defaultTab="url"', 'defaultTab="vcard"')
with open('src/app/vcard-qr-code/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Landing pages updated.")
