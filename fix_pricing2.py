with open('src/app/pricing/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_str = "className={`relative flex flex-col ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200'}`}"
new_str = "className={`relative flex flex-col !overflow-visible transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.4)] hover:-translate-y-2 bg-white ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200 hover:border-indigo-300'}`}"

content = content.replace(old_str, new_str)

with open('src/app/pricing/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
