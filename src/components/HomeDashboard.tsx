import React, { useState } from 'react';
import { VitalsState, TabType } from '../types';
import { BABY_DEVELOPMENT_BY_WEEK } from '../data/mockData';
import { JananiBrandCard } from './JananiBrandCard';
import { DailyAffirmationCard } from './DailyAffirmationCard';
import {
  Heart,
  Activity,
  Droplets,
  Footprints,
  Video,
  Sparkles,
  ChevronRight,
  Plus,
  Smile,
  Volume2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface HomeDashboardProps {
  vitals: VitalsState;
  setVitals: React.Dispatch<React.SetStateAction<VitalsState>>;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  setActiveTab: (tab: TabType) => void;
  onOpenVideoConsult: () => void;
  onOpenSymptomInquiry: (symptom: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  vitals,
  setVitals,
  selectedWeek,
  setSelectedWeek,
  setActiveTab,
  onOpenVideoConsult,
  onOpenSymptomInquiry,
}) => {
  const [isPlayingHeartbeat, setIsPlayingHeartbeat] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodAdvice, setMoodAdvice] = useState<string | null>(null);

  const weekData = BABY_DEVELOPMENT_BY_WEEK[selectedWeek] || BABY_DEVELOPMENT_BY_WEEK[16];

  const handleAddWater = () => {
    setVitals((prev) => ({
      ...prev,
      waterIntakeMl: Math.min(prev.waterTargetMl, prev.waterIntakeMl + 250),
    }));
  };

  const handleAddKick = () => {
    setVitals((prev) => ({
      ...prev,
      kickCount: prev.kickCount + 1,
      lastKickTime: 'Just now',
    }));
  };

  const handlePlayHeartbeat = () => {
    setIsPlayingHeartbeat(true);
    // Web Audio API simulated fetal Doppler sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playLubDub = (delay: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, audioCtx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + delay + 0.08);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + delay + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.09);
      };

      // Play 6 rapid rhythmic beats (~146 bpm)
      for (let i = 0; i < 6; i++) {
        playLubDub(i * 0.41);
        playLubDub(i * 0.41 + 0.12);
      }
      setTimeout(() => setIsPlayingHeartbeat(false), 2600);
    } catch {
      setTimeout(() => setIsPlayingHeartbeat(false), 2000);
    }
  };

  const handleSelectMood = (mood: string) => {
    setSelectedMood(mood);
    if (mood === 'Calm & Glowing') {
      setMoodAdvice('Wonderful, Ananya! Your calm heart rate directly soothes your baby. Take a slow 5-minute stroll in the fresh evening air.');
    } else if (mood === 'Mild Back Ache') {
      setMoodAdvice('Very common at week 16 as relaxin loosens your sacroiliac joint. Try a warm water bottle and sleep with a pillow between knees.');
    } else if (mood === 'Evening Heartburn') {
      setMoodAdvice('Progesterone relaxes the esophageal valve. Sip warm water with a pinch of saunf (fennel) and remain upright for 45 mins.');
    } else {
      setMoodAdvice('Rest is medicine right now, Ananya. Put your feet up on a soft bolster for 20 minutes to improve blood return.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Greeting & Maternal Stage */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[#7D6F72]">
            <span>Second Trimester</span>
            <span aria-hidden="true">·</span>
            <span>Day 112 of 280</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#FF8C94] font-bold">Week 16</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2426] mt-0.5">
            Hi, Ananya!
          </h1>
          <p className="text-xs text-[#7D6F72] mt-0.5">
            Your baby is active and listening to your voice today.
          </p>
        </div>

        {/* Quick Maushi AI Launcher */}
        <button
          onClick={() => setActiveTab('ai')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#E2D4F9] text-[#54436B] hover:bg-[#D4C0F5] active:scale-95 transition-all text-xs font-bold shadow-xs whitespace-nowrap self-start sm:self-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#54436B]" />
          <span>Ask Maushi AI</span>
        </button>
      </div>

      {/* Daily Pregnancy Affirmation Card (Emotional Support for current week) */}
      <DailyAffirmationCard selectedWeek={selectedWeek} />

      {/* Featured Janani Care Brand Card (From Uploaded Design) */}
      <div className="transform hover:scale-[1.01] transition-transform duration-300">
        <JananiBrandCard />
      </div>

      {/* 2. Baby Milestone & Interactive Week Scrubber */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#7D6F72]/10 shadow-maternal-card relative overflow-hidden">
        {/* Soft background pastel bloom */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FFE5E8]/40 via-[#F8F4FE]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8C94]">
              Fetal Growth Milestone
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#2D2426] mt-0.5">
              Week {selectedWeek}: Size of a {weekData.sizeComparison} {weekData.emoji}
            </h2>
          </div>

          {/* Week Selector Chips */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {[14, 15, 16, 17, 18, 20].map((wk) => (
              <button
                key={wk}
                onClick={() => setSelectedWeek(wk)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedWeek === wk
                    ? 'bg-[#2D2426] text-white shadow-xs'
                    : 'bg-[#FFF9F6] text-[#7D6F72] hover:text-[#2D2426] border border-[#7D6F72]/10'
                }`}
              >
                Wk {wk}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
          {/* Baby Size Visual Card */}
          <div className="sm:col-span-4 bg-gradient-to-b from-[#FFF9F6] to-[#FFE5E8]/30 rounded-2xl p-4 border border-[#FF8C94]/20 flex flex-col items-center justify-center text-center">
            <div
              className="w-16 h-16 rounded-full bg-white shadow-xs flex items-center justify-center text-3xl mb-2 border transition-all duration-300"
              style={{ borderColor: `${weekData.accentColor || '#FF8C94'}55` }}
            >
              <span className="transform hover:scale-110 transition-transform select-none" role="img" aria-label={weekData.sizeComparison}>
                {weekData.emoji || '🥑'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#2D2426]">
                {weekData.sizeComparison}
              </span>
              <span className="text-[11px] text-[#7D6F72]">({weekData.emoji})</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1 text-[11px] font-medium text-[#7D6F72]">
              <span>~{weekData.lengthCm} cm</span>
              <span aria-hidden="true">·</span>
              <span>~{weekData.weightG} g</span>
            </div>
          </div>

          {/* Developmental Explanation */}
          <div className="sm:col-span-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#2D2426]">
                {weekData.milestoneTitle}
              </h3>
              <p className="text-xs text-[#7D6F72] mt-1 leading-relaxed">
                {weekData.milestoneDescription}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-[#7D6F72]/10">
              <span className="text-[10px] font-bold text-[#2D2426] uppercase tracking-wider block mb-1">
                Sisterly Tips for Week {selectedWeek}:
              </span>
              <div className="space-y-1">
                {weekData.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#7D6F72] leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A8E6CF] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Ob-Gyn Teleconsultation Spotlight */}
      <div className="bg-gradient-to-r from-white via-white to-[#E2D4F9]/20 rounded-3xl p-4 sm:p-5 border border-[#E2D4F9]/60 shadow-maternal-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94] shrink-0">
              <span className="material-symbols-outlined text-[24px]">stethoscope</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#F4FBF8] text-[#2E7D5E] border border-[#A8E6CF]/40 text-[9px] font-bold uppercase tracking-wider">
                  Confirmed Today
                </span>
                <span className="text-[11px] font-semibold text-[#7D6F72]">4:30 PM (IST)</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5 leading-snug">
                16-Week Anatomy &amp; Quad Marker Review
              </h3>
              <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-tight">
                Dr. Radhika Sharma (MD, FRCOG) • Apollo Cradle
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-center shrink-0">
            <button
              onClick={onOpenVideoConsult}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#FF8C94] text-white hover:bg-[#FF737D] shadow-maternal-primary active:scale-95 transition-all text-xs font-bold"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Call</span>
            </button>
            <button
              onClick={() => setActiveTab('consults')}
              className="px-2.5 py-2 rounded-full text-xs font-medium text-[#7D6F72] hover:bg-[#FFE5E8]/40 transition-colors"
            >
              Vault
            </button>
          </div>
        </div>
      </div>

      {/* 4. Live Maternal Vitals Row */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {/* Fetal Heart Rate */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#7D6F72]/10 shadow-maternal-card flex flex-col justify-between min-h-[102px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D6F72]">FHR</span>
            <button
              onClick={handlePlayHeartbeat}
              className={`p-1 rounded-full transition-colors ${
                isPlayingHeartbeat ? 'bg-[#FFE5E8] text-[#FF8C94]' : 'text-[#7D6F72] hover:bg-[#FFF9F6]'
              }`}
              title="Simulate fetal Doppler sound"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="my-1 flex items-baseline flex-wrap gap-x-1 gap-y-0.5">
            <span className="text-xl font-black text-[#2D2426] tabular-nums leading-none">
              {vitals.fetalHeartRate}
            </span>
            <span className="text-[11px] font-medium text-[#7D6F72]">bpm</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#2E7D5E] font-medium truncate">
            <Heart className={`w-3 h-3 text-[#FF8C94] fill-current shrink-0 ${isPlayingHeartbeat ? 'animate-ping' : ''}`} />
            <span className="truncate">Optimal Normal</span>
          </div>
        </div>

        {/* Maternal Blood Pressure */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#7D6F72]/10 shadow-maternal-card flex flex-col justify-between min-h-[102px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D6F72]">BP Pulse</span>
            <Activity className="w-3.5 h-3.5 text-[#A8E6CF]" />
          </div>
          <div className="my-1 flex items-baseline flex-wrap gap-x-1 gap-y-0.5">
            <span className="text-lg font-black text-[#2D2426] tabular-nums leading-none">
              {vitals.maternalBP.sys}/{vitals.maternalBP.dia}
            </span>
            <span className="text-[10px] font-medium text-[#7D6F72]">mmHg</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#2E7D5E] font-medium truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF] shrink-0" />
            <span className="truncate">Normotensive</span>
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#7D6F72]/10 shadow-maternal-card flex flex-col justify-between min-h-[102px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D6F72]">Hydration</span>
            <button
              onClick={handleAddWater}
              className="p-1 rounded-full bg-[#E2F8EE] text-[#2E7D5E] hover:bg-[#A8E6CF]/40 active:scale-90 transition-all"
              title="Add 250ml water"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="my-1 flex items-baseline flex-wrap gap-x-1 gap-y-0.5">
            <span className="text-xl font-black text-[#2D2426] tabular-nums leading-none">
              {(vitals.waterIntakeMl / 1000).toFixed(1)}
            </span>
            <span className="text-[11px] font-medium text-[#7D6F72]">/ 3.0L</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-[#FFF9F6] h-1.5 rounded-full overflow-hidden border border-[#7D6F72]/10">
            <div
              className="bg-[#A8E6CF] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (vitals.waterIntakeMl / vitals.waterTargetMl) * 100)}%` }}
            />
          </div>
        </div>

        {/* Kick Counter */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#7D6F72]/10 shadow-maternal-card flex flex-col justify-between min-h-[102px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D6F72]">Kicks</span>
            <button
              onClick={handleAddKick}
              className="p-1 rounded-full bg-[#FFE5E8] text-[#FF8C94] hover:bg-[#FF8C94]/30 active:scale-90 transition-all"
              title="Record a fetal kick"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="my-1 flex items-baseline flex-wrap gap-x-1 gap-y-0.5">
            <span className="text-xl font-black text-[#2D2426] tabular-nums leading-none">
              {vitals.kickCount}
            </span>
            <span className="text-[11px] font-medium text-[#7D6F72]">flutters</span>
          </div>
          <span className="text-[10px] text-[#7D6F72] truncate block">{vitals.lastKickTime}</span>
        </div>
      </div>

      {/* 5. Sisterly Mood & Symptom Check-in */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D6F72]">
              Sisterly Check-in
            </span>
            <h3 className="text-sm font-bold text-[#2D2426]">
              How are you feeling this afternoon, Ananya?
            </h3>
          </div>
          <Smile className="w-4 h-4 text-[#FF8C94]" />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {['Calm & Glowing', 'Mild Back Ache', 'Evening Heartburn', 'Tired & Sleepy'].map((mood) => (
            <button
              key={mood}
              onClick={() => handleSelectMood(mood)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedMood === mood
                  ? 'bg-[#FF8C94] text-white shadow-xs font-bold'
                  : 'bg-[#FFF9F6] text-[#7D6F72] hover:text-[#2D2426] border border-[#7D6F72]/10'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {moodAdvice && (
          <div className="mt-3.5 p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#FF8C94]/20 text-xs text-[#2D2426] leading-relaxed flex items-start justify-between gap-3 animate-in fade-in">
            <p>{moodAdvice}</p>
            <button
              onClick={() => onOpenSymptomInquiry(selectedMood || 'symptom')}
              className="text-[#FF8C94] hover:underline font-bold whitespace-nowrap text-xs shrink-0"
            >
              Ask Maushi →
            </button>
          </div>
        )}
      </div>

      {/* 6. Quick Routing Grid (Routine, Clinical Vault, Baby Hours) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('routine')}
          className="p-4 rounded-2xl bg-white border border-[#7D6F72]/10 shadow-xs hover:shadow-md transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#E2F8EE] flex items-center justify-center text-[#2E7D5E] mb-2.5">
            <span className="material-symbols-outlined text-[20px]">nutrition</span>
          </div>
          <h4 className="text-xs font-bold text-[#2D2426] group-hover:text-[#FF8C94] transition-colors">
            Routine & Nutrients
          </h4>
          <p className="text-[11px] text-[#7D6F72] mt-0.5">
            Folate, Iron & 2.2L Hydration logged
          </p>
        </button>

        <button
          onClick={() => setActiveTab('consults')}
          className="p-4 rounded-2xl bg-white border border-[#7D6F72]/10 shadow-xs hover:shadow-md transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#FFE5E8] flex items-center justify-center text-[#B35860] mb-2.5">
            <span className="material-symbols-outlined text-[20px]">folder_shared</span>
          </div>
          <h4 className="text-xs font-bold text-[#2D2426] group-hover:text-[#FF8C94] transition-colors">
            Clinical Vault
          </h4>
          <p className="text-[11px] text-[#7D6F72] mt-0.5">
            4 Normal Lab Scans & Prescriptions
          </p>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className="p-4 rounded-2xl bg-white border border-[#7D6F72]/10 shadow-xs hover:shadow-md transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F8F4FE] flex items-center justify-center text-[#54436B] mb-2.5">
            <span className="material-symbols-outlined text-[20px]">stars</span>
          </div>
          <h4 className="text-xs font-bold text-[#2D2426] group-hover:text-[#FF8C94] transition-colors">
            Baby Hours & Quests
          </h4>
          <p className="text-[11px] text-[#7D6F72] mt-0.5">
            3 Quests Done • 120 hrs balance
          </p>
        </button>
      </div>
    </div>
  );
};
