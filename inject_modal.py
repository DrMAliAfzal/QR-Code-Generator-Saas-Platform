import re

with open('src/components/qr/QRGenerator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add imports
import_str = "import { Badge } from \"@/components/ui/badge\";"
new_import = "import { Badge } from \"@/components/ui/badge\";\nimport { Crown, X } from 'lucide-react';"
if "lucide-react" not in content:
    content = content.replace(import_str, new_import)

# 2. Add states
state_str = "const [isSaving, setIsSaving] = useState(false);"
new_state = "const [isSaving, setIsSaving] = useState(false);\n  const [showLimitModal, setShowLimitModal] = useState(false);\n  const [limitTime, setLimitTime] = useState('');"
if "showLimitModal" not in content:
    content = content.replace(state_str, new_state)

# 3. Update handleDownload logic
old_logic = """      const wantsPro = window.confirm(`You have reached your free weekly limit of 5 downloads for this tool.\n\n⏱️ Your limit will reset in ${timeString}.\n🚀 Want unlimited downloads? You can shift to our Pro plan today!\n\nClick OK to view our Premium Plans.`);
      
      if (wantsPro) {
        window.location.href = '/pricing';
      }
      return;"""
new_logic = """      setLimitTime(timeString);
      setShowLimitModal(true);
      return;"""
content = content.replace(old_logic, new_logic)

# 4. Inject Modal JSX
# The component ends with:
#             </Alert>
#           </div>
#         </div>
#       </div>
#     );
# }

modal_jsx = """
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowLimitModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Crown className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-2">Limit Reached</h3>
            <p className="text-slate-600 text-center mb-6">
              You have reached your free weekly limit of 5 downloads for this tool.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-8 text-center">
              <span className="block text-sm font-medium text-slate-500 mb-1">Limit resets in</span>
              <span className="block text-lg font-bold text-indigo-600">{limitTime}</span>
            </div>
            <div className="space-y-3">
              <Button onClick={() => window.location.href = '/pricing'} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg py-6 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all">
                View Premium Plans
              </Button>
              <Button onClick={() => setShowLimitModal(false)} variant="ghost" className="w-full text-slate-500 hover:text-slate-700">
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
"""

pattern = re.compile(r"(</Alert>\s*</div>\s*</div>\s*)(</div>\s*\);)", re.DOTALL)
match = pattern.search(content)
if match:
    content = content[:match.end(1)] + modal_jsx + content[match.end(1):]
    with open('src/components/qr/QRGenerator.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Modal injected successfully.")
else:
    print("Could not find the end of the component.")
