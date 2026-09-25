import React from 'react';
import { TabType } from '../types';
import { Home, Utensils, Sparkles, Stethoscope, Award } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  className?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-white/95 backdrop-blur-xl border-t border-[#7D6F72]/10 py-2 px-3 shadow-[0_-4px_24px_rgba(220,160,165,0.08)] select-none ${className}`}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
            activeTab === 'home'
              ? 'text-[#FF8C94] font-bold'
              : 'text-[#7D6F72] hover:text-[#2D2426]'
          }`}
          aria-label="Home Dashboard"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Routine Tab */}
        <button
          onClick={() => setActiveTab('routine')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
            activeTab === 'routine'
              ? 'text-[#FF8C94] font-bold'
              : 'text-[#7D6F72] hover:text-[#2D2426]'
          }`}
          aria-label="Routine & Nutrition"
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Routine</span>
        </button>

        {/* Maushi AI - Elevated Center Companion Button */}
        <button
          onClick={() => setActiveTab('ai')}
          className={`relative -top-3 flex flex-col items-center py-2 px-3.5 rounded-full transition-all shadow-md active:scale-90 ${
            activeTab === 'ai'
              ? 'bg-[#E2D4F9] text-[#54436B] ring-4 ring-[#FFF9F6] shadow-[0_4px_16px_rgba(226,212,249,0.8)] font-bold'
              : 'bg-[#F8F4FE] text-[#54436B] border border-[#E2D4F9] hover:bg-[#E2D4F9]/60'
          }`}
          aria-label="Ask Maushi AI Companion"
        >
          <Sparkles className="w-5 h-5 text-[#54436B]" />
          <span className="text-[10px] font-bold mt-0.5 whitespace-nowrap">Maushi AI</span>
        </button>

        {/* Clinical Vault Tab */}
        <button
          onClick={() => setActiveTab('consults')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
            activeTab === 'consults'
              ? 'text-[#FF8C94] font-bold'
              : 'text-[#7D6F72] hover:text-[#2D2426]'
          }`}
          aria-label="Clinical Records Vault"
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Vault</span>
        </button>

        {/* Baby Hours & Rewards Tab */}
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
            activeTab === 'rewards'
              ? 'text-[#FF8C94] font-bold'
              : 'text-[#7D6F72] hover:text-[#2D2426]'
          }`}
          aria-label="Baby Hours & Quests"
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Rewards</span>
        </button>
      </div>
    </div>
  );
};
