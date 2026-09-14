import re

with open('src/components/qr/QRGenerator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

injection = """
                      {activeTab === 'whatsapp' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>WhatsApp Number (with country code)</Label>
                            <Input value={waPhone} onChange={(e) => setWaPhone(e.target.value)} placeholder="+1234567890" />
                          </div>
                          <div className="space-y-2">
                            <Label>Pre-filled Message (Optional)</Label>
                            <Input value={waText} onChange={(e) => setWaText(e.target.value)} placeholder="Hello! I'm interested..." />
                          </div>
                        </div>
                      )}
                      {activeTab === 'vcard' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Full Name</Label>
                              <Input value={vcName} onChange={(e) => setVcName(e.target.value)} placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input value={vcEmail} onChange={(e) => setVcEmail(e.target.value)} placeholder="john@example.com" type="email" />
                            </div>
                            <div className="space-y-2">
                              <Label>Phone Number</Label>
                              <Input value={vcPhone} onChange={(e) => setVcPhone(e.target.value)} placeholder="+1234567890" />
                            </div>
                            <div className="space-y-2">
                              <Label>Organization / Company</Label>
                              <Input value={vcOrg} onChange={(e) => setVcOrg(e.target.value)} placeholder="Acme Corp" />
                            </div>
                            <div className="space-y-2">
                              <Label>Job Title</Label>
                              <Input value={vcTitle} onChange={(e) => setVcTitle(e.target.value)} placeholder="CEO" />
                            </div>
                            <div className="space-y-2">
                              <Label>Website URL</Label>
                              <Input value={vcUrl} onChange={(e) => setVcUrl(e.target.value)} placeholder="https://..." />
                            </div>
                          </div>
                        </div>
                      )}
"""

# Find the end of the wifi block.
# We'll use regex to find {activeTab === 'wifi' && (...)}
pattern = re.compile(r"(\{activeTab === 'wifi' && \(\s*<div.*?</div>\s*\)\})", re.DOTALL)
match = pattern.search(content)

if match:
    content = content[:match.end()] + injection + content[match.end():]
    with open('src/components/qr/QRGenerator.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected successfully.")
else:
    print("Could not find match.")
