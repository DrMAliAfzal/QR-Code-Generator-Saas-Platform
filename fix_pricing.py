import re

with open('src/app/pricing/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update prices
content = content.replace('price: "$9",', 'price: "$5",')
content = content.replace('price: "$39",', 'price: "$8",')

# Fix overflow and add hover glow
# Currently: className={`relative flex flex-col ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200'}`}
# Change to: className={`relative flex flex-col overflow-visible transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)] hover:-translate-y-1 ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200 hover:border-indigo-300'}`}

old_class = r"className={`relative flex flex-col \${plan.popular \? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200'}`}"
new_class = r"className={`relative flex flex-col !overflow-visible transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.4)] hover:-translate-y-2 bg-white ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200 hover:border-indigo-300'}`}"

content = re.sub(re.escape(old_class), new_class, content)

with open('src/app/pricing/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Pricing page fixed.")
