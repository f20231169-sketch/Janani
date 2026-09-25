import React from 'react';
import { X, User, Heart, Shield, Phone, MapPin, Calendar } from 'lucide-react';

interface ProfileModalProps {
  onClose: () => void;
  babyHours: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, babyHours }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#7D6F72]/10 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#7D6F72] hover:bg-[#FFF9F6]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with avatar */}
        <div className="p-6 bg-gradient-to-b from-[#FFE5E8]/40 to-white text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-md bg-[#FFE5E8] mb-3">
            <img
              src="/assets/ananya_avatar.jpg"
              alt="Ananya Sharma"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-bold text-[#2D2426]">Ananya Sharma</h3>
          <p className="text-xs text-[#7D6F72]">Age: 28 • First-time Mother (G1P0)</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2F8EE] text-[#2E7D5E] text-[10px] font-bold mt-2">
            <span>Gestational Week 16 (Day 112)</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 pt-0 space-y-3.5 text-xs text-[#2D2426]">
          <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#7D6F72]">Blood Group</span>
              <span className="font-bold text-[#FF8C94]">O Positive (O+ve)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7D6F72]">Hospital UHID</span>
              <span className="font-mono font-semibold">CLN-2026-88194</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7D6F72]">Estimated Due Date</span>
              <span className="font-bold">October 28, 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#7D6F72]">Baby Hours Balance</span>
              <span className="font-bold text-[#FF8C94]">{babyHours} hrs</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8F4FE] border border-[#E2D4F9]/60 space-y-2">
            <div className="flex items-center gap-2 text-[#54436B] font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>Primary Obstetrician</span>
            </div>
            <p className="text-xs font-semibold">Dr. Radhika Sharma (MD, DGO, FRCOG)</p>
            <p className="text-[11px] text-[#7D6F72]">Cloudnine Speciality Maternity & Apollo Cradle</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10 space-y-2">
            <div className="flex items-center gap-2 text-[#FF8C94] font-bold text-xs">
              <Phone className="w-3.5 h-3.5" />
              <span>Emergency Support Contacts</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#7D6F72]">Partner (Rohit):</span>
              <span className="font-semibold">+91 98201 44521</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#7D6F72]">Maternity Helpline:</span>
              <span className="font-semibold">1800-419-1234</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#FFF9F6] border-t border-[#7D6F72]/10 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#2D2426] text-white text-xs font-bold hover:bg-black transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
