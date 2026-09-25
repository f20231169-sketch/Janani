import React, { useState } from 'react';
import {
  Heart,
  Activity,
  Droplets,
  Plus,
  Volume2,
  VolumeX,
  Sparkles,
  Smile,
  CheckCircle2,
  Video,
  Wind,
  RefreshCw,
  FileText,
  Calendar,
  Eye,
  Star,
  Flame,
  Check,
  Home,
  Utensils,
  Stethoscope,
  Award,
  Mic,
  Send,
  User,
  Bell,
} from 'lucide-react';

// ==========================================
// 1. DATA & PROTOCOLS
// ==========================================
interface WeekData {
  sizeComparison: string;
  emoji: string;
  accentColor: string;
  weightG: number;
  lengthCm: number;
  milestoneTitle: string;
  milestoneDescription: string;
  tips: string[];
  affirmation: string;
  affirmationFocus: string;
}

const WEEKS_DATA: Record<number, WeekData> = {
  14: {
    sizeComparison: 'Lemon',
    emoji: '🍋',
    accentColor: '#FDE047',
    weightG: 45,
    lengthCm: 8.7,
    milestoneTitle: 'Entering Second Trimester',
    milestoneDescription: 'Thyroid is producing hormones and your baby can make gentle sucking motions.',
    tips: ['Morning sickness often eases now', 'Start gentle pelvic floor exercises', 'Hydrate consistently'],
    affirmation: 'My body is strong, adaptable, and blossoming with gentle maternal energy as I step into my second trimester.',
    affirmationFocus: 'Renewed Energy & Vitality',
  },
  15: {
    sizeComparison: 'Apple',
    emoji: '🍎',
    accentColor: '#F87171',
    weightG: 70,
    lengthCm: 10.1,
    milestoneTitle: 'Skin & Skeleton Forming',
    milestoneDescription: 'Baby’s bones are ossifying and delicate light-sensing eyes are taking form.',
    tips: ['Incorporate iron-rich meals', 'Wear supportive footwear', 'Schedule dental checkup'],
    affirmation: 'I trust my body’s natural maternal wisdom to nurture, protect, and build strong foundations for my little one.',
    affirmationFocus: 'Trust & Inner Strength',
  },
  16: {
    sizeComparison: 'Avocado',
    emoji: '🥑',
    accentColor: '#4ADE80',
    weightG: 100,
    lengthCm: 11.6,
    milestoneTitle: 'Tastebuds & Tiny Facial Muscles',
    milestoneDescription: 'Tiny facial expressions have begun! Baby can squint, frown, and hear maternal vocal vibrations.',
    tips: [
      'Sing and talk to your baby; acoustic sound reaches the amniotic sac now',
      'Sleep comfortably on your left side to maximize uterine blood flow',
      'Track calcium and magnesium to prevent night-time leg cramps',
    ],
    affirmation: 'Every breath I take sends warmth and peace to my baby. Together, we are safe, cherished, and deeply connected.',
    affirmationFocus: 'Deep Maternal Bonding',
  },
  17: {
    sizeComparison: 'Pomegranate',
    emoji: '🍇',
    accentColor: '#E11D48',
    weightG: 140,
    lengthCm: 13.0,
    milestoneTitle: 'Fat Tissue & Umbilical Cord Thickening',
    milestoneDescription: 'Protective adipose tissue is forming to keep your baby warm after delivery.',
    tips: ['Keep moisturized for growing belly skin', 'Keep small nutrient-dense snacks handy'],
    affirmation: 'I celebrate the miraculous transformation within me today. I am creating a quiet, loving sanctuary.',
    affirmationFocus: 'Nourishment & Growth',
  },
  18: {
    sizeComparison: 'Bell Pepper',
    emoji: '🫑',
    accentColor: '#22C55E',
    weightG: 190,
    lengthCm: 14.2,
    milestoneTitle: 'First Flutter Kicks (Quickening)',
    milestoneDescription: 'The myelin sheath is insulating baby’s nerves, and first quickening flutter sensations occur.',
    tips: ['Prepare for your mid-pregnancy Anatomy scan (Week 18-20)', 'Practice diaphragmatic breathing'],
    affirmation: 'With every gentle flutter, I feel the miracle of life within me. I am patient with my body and joyful in this journey.',
    affirmationFocus: 'Listening to Baby’s Flutters',
  },
  20: {
    sizeComparison: 'Banana',
    emoji: '🍌',
    accentColor: '#FBBF24',
    weightG: 300,
    lengthCm: 16.4,
    milestoneTitle: 'Halfway Mark & Anatomy Scan',
    milestoneDescription: 'Congratulations on reaching the halfway mark! Baby swallows amniotic fluid and produces vernix caseosa.',
    tips: ['Review Level II USG scan results with Dr. Radhika Sharma', 'Celebrate the halfway journey'],
    affirmation: 'We have reached our halfway milestone together. I honor my body, my baby, and the loving mother I already am.',
    affirmationFocus: 'Milestone Celebration & Peace',
  },
};

type Tab = 'home' | 'routine' | 'ai' | 'vault' | 'rewards';

/**
 * Self-Contained Janani Care Interactive Prototype
 * Designed for direct embedding into Portfolio modals without cross-origin iframe restrictions.
 */
export const JananiCareMobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedWeek, setSelectedWeek] = useState<number>(16);

  // Vitals State
  const [fhr] = useState<number>(146);
  const [waterMl, setWaterMl] = useState<number>(2250);
  const [kicks, setKicks] = useState<number>(6);
  const [lastKickTime, setLastKickTime] = useState<string>('2:40 PM');
  const [isPlayingHeartbeat, setIsPlayingHeartbeat] = useState<boolean>(false);

  // Mood & Affirmation State
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodAdvice, setMoodAdvice] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  // Gamification & Quests
  const [babyHours, setBabyHours] = useState<number>(120);
  const [quests, setQuests] = useState([
    { id: 'q1', title: 'Hydration Anchor (2.5L)', category: 'Vitals', reward: 15, done: true },
    { id: 'q2', title: 'Prenatal Calcium & Iron', category: 'Nutrition', reward: 20, done: true },
    { id: 'q3', title: '10-Min Evening Stroll', category: 'Movement', reward: 25, done: true },
    { id: 'q4', title: 'Log 5 Baby Flutters', category: 'Bonding', reward: 30, done: false },
  ]);

  // AI Chat Simulation State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'maushi'; text: string }>>([
    {
      sender: 'maushi',
      text: 'Namaste Ananya! I am Maushi AI, your maternal companion. How is your body feeling at week 16 today?',
    },
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const weekData = WEEKS_DATA[selectedWeek] || WEEKS_DATA[16];

  // Doppler sound simulation via Web Audio API
  const handlePlayHeartbeat = () => {
    setIsPlayingHeartbeat(true);
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
      setMoodAdvice('Wonderful, Ananya! Your calm heart rate directly soothes your baby. Take a slow 5-minute stroll.');
    } else if (mood === 'Mild Back Ache') {
      setMoodAdvice('Very common at week 16 as relaxin loosens your pelvic ligaments. Try resting with a knee pillow.');
    } else if (mood === 'Evening Heartburn') {
      setMoodAdvice('Progesterone relaxes the esophageal valve. Sip warm water with fennel and remain upright for 45 mins.');
    } else {
      setMoodAdvice('Rest is essential medicine right now. Put your feet up on a soft bolster for 20 minutes.');
    }
  };

  const handleToggleBreathing = () => {
    if (isBreathing) {
      setIsBreathing(false);
      return;
    }
    setIsBreathing(true);
    setBreathPhase('Inhale');
    setTimeout(() => setBreathPhase('Hold'), 3500);
    setTimeout(() => setBreathPhase('Exhale'), 5500);
    setTimeout(() => {
      setIsBreathing(false);
      setBreathPhase('Inhale');
    }, 9500);
  };

  const handleSendChat = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { sender: 'user', text }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `At week ${selectedWeek}, your baby is growing rapidly! Keep hydrated and take regular resting pauses.`;
      if (text.toLowerCase().includes('kick') || text.toLowerCase().includes('flutter')) {
        reply = 'Around weeks 16-20, fetal quickening feels like gentle butterfly wings or bubbly flutters! Resting on your left side after a meal makes them easier to notice.';
      } else if (text.toLowerCase().includes('water') || text.toLowerCase().includes('hydration')) {
        reply = 'Targeting 2.5L to 3.0L daily ensures adequate amniotic fluid levels and eases maternal kidney workload.';
      } else if (text.toLowerCase().includes('back') || text.toLowerCase().includes('pain')) {
        reply = 'Pelvic aches are very standard as your center of gravity shifts. Gentle prenatal cat-cow stretches and supportive footwear make a huge difference!';
      }
      setChatMessages((prev) => [...prev, { sender: 'maushi', text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  const handleToggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextDone = !q.done;
          setBabyHours((h) => (nextDone ? h + q.reward : Math.max(0, h - q.reward)));
          return { ...q, done: nextDone };
        }
        return q;
      })
    );
  };

  return (
    <div className="w-full h-full bg-[#FFF9F6] text-[#2D2426] flex flex-col font-sans overflow-hidden select-none">
      {/* Top iOS Status Bar */}
      <div className="pt-2 px-5 pb-1 bg-[#FFF9F6] flex items-center justify-between text-[11px] font-bold text-[#2D2426] shrink-0 border-b border-[#7D6F72]/5">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black text-white text-[10px]">
          <Heart className="w-2.5 h-2.5 text-[#FF8C94] fill-current animate-pulse" />
          <span>FHR {fhr} bpm</span>
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* App Header Bar */}
      <div className="px-4 py-2 bg-white/80 backdrop-blur-md border-b border-[#7D6F72]/10 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFE5E8] to-[#F8F4FE] border border-[#FF8C94]/30 flex items-center justify-center font-serif font-black text-[#2D2426] text-sm">
            J
          </div>
          <div>
            <div className="flex items-center gap-1 leading-none">
              <span className="text-sm font-extrabold text-[#2D2426]">Janani</span>
              <span className="text-[9px] font-black tracking-widest text-[#B35860] uppercase bg-[#FFE5E8] px-1 rounded">
                CARE
              </span>
            </div>
            <span className="text-[10px] text-[#7D6F72] leading-none">Week {selectedWeek} • Day 112</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFE5E8] text-[#B35860] text-[11px] font-bold">
            <Star className="w-3 h-3 fill-current" />
            <span>{babyHours}h</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94]">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 pb-20 no-scrollbar">
        {/* ======================= HOME TAB ======================= */}
        {activeTab === 'home' && (
          <>
            {/* Greeting */}
            <div className="bg-white/90 p-4 rounded-2xl border border-[#7D6F72]/10 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#FF8C94] uppercase tracking-wider">
                  Second Trimester
                </span>
                <h1 className="text-lg font-extrabold text-[#2D2426]">Hi, Ananya!</h1>
                <p className="text-[11px] text-[#7D6F72]">Baby is active and hearing your voice.</p>
              </div>
              <button
                onClick={() => setActiveTab('ai')}
                className="px-3 py-1.5 rounded-full bg-[#E2D4F9] text-[#54436B] text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-[#54436B]" />
                <span>Ask AI</span>
              </button>
            </div>

            {/* Daily Affirmation Card */}
            <div className="relative bg-gradient-to-br from-[#FFF5F6] via-white to-[#F8F4FE] rounded-2xl p-4 border border-[#FF8C94]/25 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-[#7D6F72]/10">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#FF8C94] fill-current" />
                  <span className="text-[10px] font-extrabold text-[#B35860] uppercase tracking-wider">
                    Daily Affirmation • Wk {selectedWeek}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-[#54436B] bg-[#F8F4FE] px-2 py-0.5 rounded-md border border-[#E2D4F9]/60">
                  {weekData.affirmationFocus}
                </span>
              </div>

              <p className="text-xs text-[#2D2426] font-medium leading-relaxed italic my-2.5">
                “{weekData.affirmation}”
              </p>

              {isBreathing && (
                <div className="mb-2 p-2 rounded-xl bg-[#E2F8EE] border border-[#A8E6CF] text-xs text-[#1D5E44] flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Wind className="w-3.5 h-3.5 animate-spin" />
                    <span className="font-bold">{breathPhase}... Breathing with baby</span>
                  </div>
                  <button onClick={() => setIsBreathing(false)} className="text-[10px] underline">
                    Done
                  </button>
                </div>
              )}

              <button
                onClick={handleToggleBreathing}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#54436B] text-[11px] font-bold border border-[#7D6F72]/15 shadow-2xs active:scale-95"
              >
                <Wind className="w-3 h-3 text-[#FF8C94]" />
                <span>{isBreathing ? 'Pause Breathing' : 'Breathe with Baby'}</span>
              </button>
            </div>

            {/* Milestone Card with Dynamic Fruits */}
            <div className="bg-white rounded-2xl p-4 border border-[#7D6F72]/10 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#7D6F72]/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8C94]">
                    Fetal Growth
                  </span>
                  <h2 className="text-sm font-bold text-[#2D2426]">
                    Week {selectedWeek}: Size of a {weekData.sizeComparison} {weekData.emoji}
                  </h2>
                </div>

                {/* Week Chips */}
                <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                  {[14, 15, 16, 17, 18, 20].map((wk) => (
                    <button
                      key={wk}
                      onClick={() => setSelectedWeek(wk)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                        selectedWeek === wk
                          ? 'bg-[#2D2426] text-white'
                          : 'bg-[#FFF9F6] text-[#7D6F72] border border-[#7D6F72]/10'
                      }`}
                    >
                      {wk}w
                    </button>
                  ))}
                </div>
              </div>

              {/* Fruit Visual & Details */}
              <div className="flex items-center gap-3.5 mt-3">
                <div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#FFF9F6] to-white border-2 flex items-center justify-center text-3xl shrink-0 shadow-2xs"
                  style={{ borderColor: weekData.accentColor }}
                >
                  <span>{weekData.emoji}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold text-[#2D2426] leading-tight">
                    {weekData.milestoneTitle}
                  </h3>
                  <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-snug">
                    {weekData.milestoneDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold text-[#7D6F72]">
                    <span>~{weekData.lengthCm} cm</span>
                    <span>•</span>
                    <span>~{weekData.weightG} g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maternal Vitals Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Fetal Heart Rate */}
              <div className="bg-white rounded-2xl p-3 border border-[#7D6F72]/10 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#7D6F72]">FHR</span>
                  <button
                    onClick={handlePlayHeartbeat}
                    className={`p-1 rounded-full ${
                      isPlayingHeartbeat ? 'bg-[#FFE5E8] text-[#FF8C94]' : 'text-[#7D6F72]'
                    }`}
                    title="Play Doppler audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="my-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-[#2D2426] tabular-nums leading-none">
                    {fhr}
                  </span>
                  <span className="text-[10px] text-[#7D6F72]">bpm</span>
                </div>
                <span className="text-[9px] text-[#2E7D5E] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />
                  Optimal Normal
                </span>
              </div>

              {/* Hydration */}
              <div className="bg-white rounded-2xl p-3 border border-[#7D6F72]/10 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#7D6F72]">Hydration</span>
                  <button
                    onClick={() => setWaterMl((m) => Math.min(3000, m + 250))}
                    className="p-1 rounded-full bg-[#E2F8EE] text-[#2E7D5E]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="my-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-[#2D2426] tabular-nums leading-none">
                    {(waterMl / 1000).toFixed(1)}
                  </span>
                  <span className="text-[10px] text-[#7D6F72]">/ 3.0L</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#A8E6CF] h-full rounded-full transition-all"
                    style={{ width: `${(waterMl / 3000) * 100}%` }}
                  />
                </div>
              </div>

              {/* Flutters / Kicks */}
              <div className="bg-white rounded-2xl p-3 border border-[#7D6F72]/10 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#7D6F72]">Kicks</span>
                  <button
                    onClick={() => {
                      setKicks((k) => k + 1);
                      setLastKickTime('Just now');
                    }}
                    className="p-1 rounded-full bg-[#FFE5E8] text-[#FF8C94]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="my-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-[#2D2426] tabular-nums leading-none">
                    {kicks}
                  </span>
                  <span className="text-[10px] text-[#7D6F72]">flutters</span>
                </div>
                <span className="text-[9px] text-[#7D6F72]">Last: {lastKickTime}</span>
              </div>

              {/* Blood Pressure */}
              <div className="bg-white rounded-2xl p-3 border border-[#7D6F72]/10 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#7D6F72]">BP Pulse</span>
                  <Activity className="w-3.5 h-3.5 text-[#A8E6CF]" />
                </div>
                <div className="my-1 flex items-baseline gap-1">
                  <span className="text-base font-black text-[#2D2426] tabular-nums leading-none">
                    118/76
                  </span>
                  <span className="text-[9px] text-[#7D6F72]">mmHg</span>
                </div>
                <span className="text-[9px] text-[#2E7D5E] font-bold">Normotensive</span>
              </div>
            </div>

            {/* Sisterly Mood Check */}
            <div className="bg-white rounded-2xl p-4 border border-[#7D6F72]/10 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#2D2426]">Afternoon Check-in</span>
                <Smile className="w-4 h-4 text-[#FF8C94]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Calm & Glowing', 'Mild Back Ache', 'Evening Heartburn', 'Tired'].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => handleSelectMood(mood)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      selectedMood === mood
                        ? 'bg-[#FF8C94] text-white font-bold'
                        : 'bg-[#FFF9F6] text-[#7D6F72] border border-[#7D6F72]/10'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
              {moodAdvice && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FF8C94]/20 text-[11px] text-[#2D2426] leading-relaxed">
                  {moodAdvice}
                </div>
              )}
            </div>
          </>
        )}

        {/* ======================= ROUTINE TAB ======================= */}
        {activeTab === 'routine' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-[#7D6F72]/10 shadow-xs">
              <span className="text-[10px] font-bold text-[#FF8C94] uppercase tracking-wider">
                Week {selectedWeek} Protocol
              </span>
              <h2 className="text-base font-bold text-[#2D2426]">Prenatal Vitamin Checklist</h2>
              <div className="divide-y divide-[#7D6F72]/10 mt-2">
                {[
                  { name: 'Folinal Plus (Folate 5mg)', time: 'Morning after breakfast', done: true },
                  { name: 'Fefol-Z (Iron & Zinc)', time: 'Mid-afternoon with lemon water', done: true },
                  { name: 'Shelcal-XT (Calcium & D3)', time: 'Bedtime with warm milk', done: false },
                ].map((v, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#2D2426]">{v.name}</span>
                      <p className="text-[10px] text-[#7D6F72]">{v.time}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.done ? 'bg-[#E2F8EE] text-[#2E7D5E]' : 'bg-[#FFF9F6] text-[#7D6F72] border'
                      }`}
                    >
                      {v.done ? 'Taken' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= MAUSHI AI TAB ======================= */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-2xl border border-[#7D6F72]/10 shadow-xs flex flex-col h-[480px] overflow-hidden">
            <div className="p-3 bg-gradient-to-r from-[#FFF5F6] to-[#F8F4FE] border-b border-[#7D6F72]/10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E2D4F9] text-[#54436B] flex items-center justify-center font-bold text-xs">
                ✨
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#2D2426]">Maushi AI Voice & Chat</h3>
                <span className="text-[10px] text-[#2E7D5E] font-medium">Online • Maternal Guidance</span>
              </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#2D2426] text-white rounded-br-xs'
                        : 'bg-[#FFF9F6] text-[#2D2426] border border-[#7D6F72]/10 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-[10px] text-[#7D6F72] italic">Maushi is typing sisterly advice...</div>
              )}
            </div>

            <div className="p-2 border-t border-[#7D6F72]/10 flex items-center gap-1.5 bg-white">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat(chatInput)}
                placeholder="Ask Maushi about kicks, diet, or cramps..."
                className="flex-1 px-3 py-1.5 rounded-full bg-[#FFF9F6] border border-[#7D6F72]/15 text-xs focus:outline-none"
              />
              <button
                onClick={() => handleSendChat(chatInput)}
                className="p-2 rounded-full bg-[#FF8C94] text-white active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================= CLINICAL VAULT TAB ======================= */}
        {activeTab === 'vault' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-[#7D6F72]/10 shadow-xs">
              <span className="text-[10px] font-bold text-[#FF8C94] uppercase tracking-wider">
                Doctor Appointment
              </span>
              <h2 className="text-sm font-bold text-[#2D2426] mt-0.5">
                Dr. Radhika Sharma (MD, FRCOG)
              </h2>
              <p className="text-[11px] text-[#7D6F72]">Routine 16-Week Anatomy & Quad Marker Review</p>
              <div className="mt-3 p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FF8C94]/20 flex items-center justify-between text-xs">
                <span className="font-bold text-[#2D2426]">Today at 4:30 PM</span>
                <span className="text-[#2E7D5E] font-bold">Confirmed</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================= BABY HOURS & REWARDS TAB ======================= */}
        {activeTab === 'rewards' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-white to-[#FFE5E8]/40 rounded-2xl p-4 border border-[#FF8C94]/30 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#FF8C94]">Nurturer Tier 2</span>
                <h2 className="text-base font-bold text-[#2D2426]">Baby Hours Balance</h2>
              </div>
              <div className="text-xl font-black text-[#2D2426] flex items-center gap-1">
                <Star className="w-4 h-4 text-[#FF8C94] fill-current" />
                <span>{babyHours}h</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#7D6F72]/10 shadow-xs">
              <h3 className="text-xs font-bold text-[#2D2426] mb-2">Today’s Quests</h3>
              <div className="divide-y divide-[#7D6F72]/10">
                {quests.map((q) => (
                  <div key={q.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleQuest(q.id)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          q.done ? 'bg-[#A8E6CF] text-[#1D5E44]' : 'border border-gray-300'
                        }`}
                      >
                        {q.done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </button>
                      <span className={q.done ? 'line-through text-[#7D6F72]' : 'text-[#2D2426] font-medium'}>
                        {q.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#FF8C94]">+{q.reward}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#7D6F72]/10 py-1.5 px-3 flex items-center justify-around z-20">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2 ${
            activeTab === 'home' ? 'text-[#FF8C94] font-bold' : 'text-[#7D6F72]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('routine')}
          className={`flex flex-col items-center py-1 px-2 ${
            activeTab === 'routine' ? 'text-[#FF8C94] font-bold' : 'text-[#7D6F72]'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Routine</span>
        </button>

        {/* Center elevated Maushi AI button */}
        <button
          onClick={() => setActiveTab('ai')}
          className={`-mt-3 flex flex-col items-center p-2 rounded-full shadow-md active:scale-90 ${
            activeTab === 'ai' ? 'bg-[#E2D4F9] text-[#54436B]' : 'bg-[#F8F4FE] text-[#54436B]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[8px] font-bold mt-0.5">Maushi</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex flex-col items-center py-1 px-2 ${
            activeTab === 'vault' ? 'text-[#FF8C94] font-bold' : 'text-[#7D6F72]'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center py-1 px-2 ${
            activeTab === 'rewards' ? 'text-[#FF8C94] font-bold' : 'text-[#7D6F72]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Rewards</span>
        </button>
      </div>
    </div>
  );
};
