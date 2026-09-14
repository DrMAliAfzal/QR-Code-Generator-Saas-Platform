import re

with open('src/components/qr/QRGenerator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """    if (count >= 5) {
      alert(`You have reached your weekly limit of 5 free downloads for this QR type. Please upgrade to Pro or try again next week!`);
      return;
    }"""

new_block = """    if (count >= 5) {
      const timeRemaining = (usage.week_start + SEVEN_DAYS) - Date.now();
      const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const timeString = daysLeft > 0 ? `${daysLeft} days and ${hoursLeft} hours` : `${hoursLeft} hours`;
      
      const wantsPro = window.confirm(`You have reached your free weekly limit of 5 downloads for this tool.\n\n⏱️ Your limit will reset in ${timeString}.\n🚀 Want unlimited downloads? You can shift to our Pro plan today!\n\nClick OK to view our Premium Plans.`);
      
      if (wantsPro) {
        window.location.href = '/pricing';
      }
      return;
    }"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('src/components/qr/QRGenerator.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Logic updated successfully.")
else:
    print("Could not find the old block.")
