import React, { useState } from 'react';
import { TabType } from '../types';
import { Bell, Sparkles, User, Info } from 'lucide-react';

interface MobileTopBarProps {
  babyHours: number;
  onOpenProfile: () => void;
  onOpenBrandModal: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  babyHours,
  onOpenProfile,
  onOpenBrandModal,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  return (
    <div className="sticky top-0 z-30 w-full bg-[#FFF9F6]/95 backdrop-blur-md px-4 pt-2 pb-2.5 border-b border-[#7D6F72]/10 flex items-center justify-between gap-2">
      {/* Brand Identity Button (opens the Janani Care brand card) */}
      <button
        onClick={onOpenBrandModal}
        className="flex items-center gap-2.5 text-left group focus:outline-none"
        title="View Janani Care Brand & Philosophy"
      >
        <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FFE5E8] to-white border border-[#FF8C94]/30 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          <span className="font-serif font-black text-[#2D2426] text-base leading-none">J</span>
          <span className="absolute bottom-1 w-3.5 h-0.5 bg-[#FF8C94] rounded-full" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold tracking-tight text-[#2D2426] leading-none">
              Janani
            </span>
            <span className="text-[9px] font-extrabold tracking-[0.18em] text-[#B35860] uppercase bg-[#FFE5E8] px-1.5 py-0.5 rounded-full">
              CARE
            </span>
          </div>
          <span className="text-[10px] font-medium text-[#7D6F72] leading-none mt-1">
            Week 16 • Day 112
          </span>
        </div>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Baby Hours Quick Pill */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFE5E8]/80 border border-[#FF8C94]/25 text-[#B35860] text-xs font-bold shadow-2xs">
          <span className="material-symbols-outlined text-[15px] text-[#FF8C94]">stars</span>
          <span className="tabular-nums">{babyHours}h</span>
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-[#7D6F72] hover:text-[#2D2426] hover:bg-white/80 transition-colors focus:outline-none active:scale-90"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF8C94] ring-2 ring-[#FFF9F6]" />
          )}
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#FF8C94]/30 hover:ring-[#FF8C94] transition-all bg-[#FFE5E8] flex items-center justify-center shrink-0 active:scale-95"
          aria-label="Patient Profile"
        >
          <img
            src="/assets/ananya_avatar.jpg"
            alt="Ananya Sharma"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <User className="w-4 h-4 text-[#FF8C94]" />
        </button>
      </div>
    </div>
  );
};
