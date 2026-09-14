with open('tests/e2e.spec.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("toContain('limit of 5 free downloads')", "toContain('limit of 5 downloads')")

with open('tests/e2e.spec.ts', 'w', encoding='utf-8') as f:
    f.write(content)
