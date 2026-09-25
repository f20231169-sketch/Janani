import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, Globe, Sparkles, Smartphone } from 'lucide-react';

interface ExportPortfolioModalProps {
  onClose: () => void;
}

export const ExportPortfolioModal: React.FC<ExportPortfolioModalProps> = ({ onClose }) => {
  const [activeFormat, setActiveFormat] = useState<'native' | 'prompt' | 'link'>('native');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sharedUrl = window.location.origin.includes('localhost')
    ? 'https://ais-pre-jj6aaktchnle3zplhnqa7d-673820086794.asia-southeast1.run.app'
    : window.location.href;

  const portfolioPrompt = `In my 04 JANANI CARE project modal, please replace the <iframe> (which refuses to connect due to Google Cloud's X-Frame-Options: SAMEORIGIN) with a native, interactive Janani Care mobile prototype component. 

Here is what the component should include:
- iOS status bar with live FHR 146 bpm badge
- Daily Affirmation card with "Breathe with Baby" interactive 10s breathing timer
- Fetal Milestone card with week selector (14w Lemon 🍋, 15w Apple 🍎, 16w Avocado 🥑, 17w Pomegranate 🍇, 18w Bell Pepper 🫑, 20w Banana 🍌)
- Maternal vitals row with simulated Doppler sound on FHR button, Hydration (+250ml), Kicks counter, and BP
- Sisterly Mood Check-in chips
- Bottom tabs (Home, Routine, Maushi AI chat, Vault, Rewards)
Render it directly inside the mobile chassis frame in my modal.`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#7D6F72]/15 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#7D6F72]/10 flex items-center justify-between bg-[#FFF9F6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFE5E8] flex items-center justify-center text-[#B35860]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#2D2426]">
                Embed Prototype in Your Portfolio
              </h2>
              <p className="text-xs text-[#7D6F72] mt-0.5">
                How to display Janani Care inside your portfolio modal without iframe connection errors
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7D6F72] hover:text-[#2D2426] hover:bg-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Notice about X-Frame-Options */}
        <div className="bg-[#FFF4E5] px-6 py-2.5 border-b border-[#FFE0B2] flex items-center gap-2 text-xs text-[#8A4800]">
          <span className="font-bold">⚠️ Why the iFrame refused to connect:</span>
          <span>Google AI Studio &amp; Cloud Run preview URLs enforce security headers (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">X-Frame-Options: SAMEORIGIN</code>) that prevent other domains from embedding them.</span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#7D6F72]/10 bg-[#FFF9F6]/50">
          <button
            onClick={() => setActiveFormat('native')}
            className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
              activeFormat === 'native'
                ? 'border-[#FF8C94] text-[#B35860]'
                : 'border-transparent text-[#7D6F72] hover:text-[#2D2426]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>AI Studio Portfolio Prompt (Recommended)</span>
          </button>

          <button
            onClick={() => setActiveFormat('prompt')}
            className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
              activeFormat === 'prompt'
                ? 'border-[#FF8C94] text-[#B35860]'
                : 'border-transparent text-[#7D6F72] hover:text-[#2D2426]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Native Component Code</span>
          </button>

          <button
            onClick={() => setActiveFormat('link')}
            className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs font-bold transition-all ${
              activeFormat === 'link'
                ? 'border-[#FF8C94] text-[#B35860]'
                : 'border-transparent text-[#7D6F72] hover:text-[#2D2426]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Direct Link Button</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeFormat === 'native' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#E2F8EE] border border-[#A8E6CF] text-xs text-[#1D5E44] space-y-2">
                <h3 className="font-extrabold text-sm flex items-center gap-1.5 text-[#134934]">
                  <span>✅ The 1-Minute Fix:</span>
                </h3>
                <p className="leading-relaxed">
                  Since your portfolio website is <strong>also built with Google AI Studio</strong>, you don’t need an external iframe! You can tell your Portfolio’s AI to embed the interactive prototype <strong>natively as a React component</strong> inside the phone bezel you already designed.
                </p>
                <ol className="list-decimal pl-4 space-y-1.5 text-[11px] leading-relaxed font-medium">
                  <li>Open your <strong>Portfolio Website</strong> in Google AI Studio.</li>
                  <li>Copy the prompt below and paste it into your Portfolio AI chat.</li>
                  <li>AI Studio will immediately replace the grey broken iframe with the live, functioning Janani Care phone app!</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#2D2426]">
                    Copy this prompt into your Portfolio's AI Studio:
                  </span>
                  <button
                    onClick={() => handleCopy(portfolioPrompt, 'prompt')}
                    className="flex items-center gap-1 text-xs font-bold text-[#B35860] hover:text-[#FF8C94]"
                  >
                    {copiedKey === 'prompt' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied Prompt!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 bg-[#FFF9F6] border border-[#7D6F72]/20 rounded-2xl text-xs text-[#2D2426] font-mono leading-relaxed select-all">
                  {portfolioPrompt}
                </div>
              </div>
            </div>
          )}

          {activeFormat === 'prompt' && (
            <div className="space-y-3">
              <p className="text-xs text-[#7D6F72]">
                We generated a self-contained component in this repository at <code className="bg-[#FFF9F6] px-1 py-0.5 rounded border border-[#7D6F72]/20 font-bold text-[#2D2426]">src/components/JananiCareMobileApp.tsx</code>. It has all Doppler sounds, fruit milestones, affirmations, and quests packaged with zero external API dependencies.
              </p>
              <div className="p-4 rounded-2xl bg-[#1E1B1D] text-[#E0D7D9] text-xs font-mono">
                <span className="text-[#A8E6CF]">// Inside your portfolio modal:</span><br />
                <span className="text-[#FF8C94]">import</span> &#123; JananiCareMobileApp &#125; <span className="text-[#FF8C94]">from</span> <span className="text-amber-300">'./components/JananiCareMobileApp'</span>;<br /><br />
                <span className="text-white/60">&lt;div className="w-[390px] h-[844px] rounded-[48px] overflow-hidden"&gt;</span><br />
                &nbsp;&nbsp;<span className="text-[#A8E6CF]">&lt;JananiCareMobileApp /&gt;</span><br />
                <span className="text-white/60">&lt;/div&gt;</span>
              </div>
            </div>
          )}

          {activeFormat === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2D2426] block mb-1">
                  Direct Live Link (Opens in Full View):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={sharedUrl}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#7D6F72]/20 text-xs text-[#2D2426] font-mono select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(sharedUrl, 'url')}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#FF8C94] text-white hover:bg-[#FF737D] text-xs font-bold transition-all shadow-2xs"
                  >
                    {copiedKey === 'url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'url' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={sharedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-[#7D6F72]/20 text-[#7D6F72] hover:text-[#2D2426] transition-colors"
                    title="Open live in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-[#FFF9F6] border-t border-[#7D6F72]/10 flex items-center justify-between">
          <span className="text-[11px] text-[#7D6F72]">
            Runs natively inside your portfolio • Fast, secure &amp; zero iframe errors
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#2D2426] text-white text-xs font-bold hover:bg-black transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
