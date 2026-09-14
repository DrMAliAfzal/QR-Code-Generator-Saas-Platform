with open('src/components/qr/QRGenerator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add states
state_str = "const [safetyIssues, setSafetyIssues] = useState<string[]>([]);"
new_states = """const [safetyIssues, setSafetyIssues] = useState<string[]>([]);
  
  // WhatsApp State
  const [waPhone, setWaPhone] = useState('');
  const [waText, setWaText] = useState('');
  
  // vCard State
  const [vcName, setVcName] = useState('');
  const [vcPhone, setVcPhone] = useState('');
  const [vcEmail, setVcEmail] = useState('');
  const [vcOrg, setVcOrg] = useState('');
  const [vcTitle, setVcTitle] = useState('');
  const [vcUrl, setVcUrl] = useState('');
"""
content = content.replace(state_str, new_states)

# 2. Add switch cases
switch_str = "case 'wifi': return formatWifi(wifiSsid, wifiPass);"
new_switch = """case 'wifi': return formatWifi(wifiSsid, wifiPass);
      case 'whatsapp': return formatWhatsApp(waPhone, waText);
      case 'vcard': return formatVCard({ name: vcName, phone: vcPhone, email: vcEmail, org: vcOrg, title: vcTitle, url: vcUrl });"""
content = content.replace(switch_str, new_switch)

# 3. Add TabsTrigger
tab_str = """<TabsTrigger value="wifi" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Wi-Fi</TabsTrigger>"""
new_tabs = tab_str + """
                      <TabsTrigger value="whatsapp" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">WhatsApp</TabsTrigger>
                      <TabsTrigger value="vcard" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">vCard</TabsTrigger>"""
content = content.replace(tab_str, new_tabs)

# 4. Add TabsContent blocks
wifi_block = """                      {activeTab === 'wifi' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Network Name (SSID)</Label>
                            <Input value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="MyWiFi" />
                          </div>
                          <div className="space-y-2">
                            <Label>Password</Label>
                            <Input value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} type="password" />
                          </div>
                        </div>
                      )}"""
new_blocks = wifi_block + """
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
                      )}"""
content = content.replace(wifi_block, new_blocks)

# Also need to import formatWhatsApp, formatVCard from payload-formatters
# Wait, they are already imported! "import { formatWifi, formatVCard, formatWhatsApp } from '@/lib/qr-engine/payload-formatters';"

with open('src/components/qr/QRGenerator.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("QR Generator updated.")
