import React from 'react';
import { X, Sparkles, Heart, Shield, Award } from 'lucide-react';
import { JananiBrandCard } from './JananiBrandCard';

interface BrandModalProps {
  onClose: () => void;
  onExploreApp: () => void;
}

export const BrandModal: React.FC<BrandModalProps> = ({ onClose, onExploreApp }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FFF9F6] rounded-[36px] w-full max-w-md overflow-hidden shadow-2xl border border-[#7D6F72]/15 relative max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-[#7D6F72] hover:text-[#2D2426] hover:bg-white shadow-xs transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Exact Brand Card as uploaded */}
          <div className="pt-2">
            <JananiBrandCard />
          </div>

          {/* Pillars of Janani Care */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7D6F72] px-1">
              Core Maternal Pillars
            </h3>

            <div className="p-3.5 rounded-2xl bg-white border border-[#7D6F72]/10 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94] shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D2426]">Empathetic Sisterly Care</h4>
                <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-relaxed">
                  Soothing maternal guidance through warmth, reassurance, and cultural comfort traditions rather than sterile surveillance.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#7D6F72]/10 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E2F8EE] flex items-center justify-center text-[#2E7D5E] shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D2426]">Clinical Precision &amp; Vault</h4>
                <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-relaxed">
                  Direct telemetry with Dr. Radhika Sharma, encrypted diagnostic laboratory reports, and strict trimester milestones.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#7D6F72]/10 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F8F4FE] flex items-center justify-center text-[#54436B] shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D2426]">Maushi AI Voice Intelligence</h4>
                <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-relaxed">
                  Natural maternal voice companion trained on obstetric care protocols, symptom relief, and pregnancy nutrition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="p-4 bg-white/90 border-t border-[#7D6F72]/10 text-center">
          <button
            onClick={() => {
              onClose();
              onExploreApp();
            }}
            className="w-full py-3 rounded-full bg-[#FF8C94] text-white text-xs font-bold hover:bg-[#FF737D] shadow-maternal-primary active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Continue in Janani Care Prototype</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
