import React, { useState } from 'react';
import { Heart, Sparkles, Wind, RefreshCw, Check } from 'lucide-react';
import { BABY_DEVELOPMENT_BY_WEEK } from '../data/mockData';

interface DailyAffirmationCardProps {
  selectedWeek: number;
}

const WEEKLY_ADDITIONAL_AFFIRMATIONS: Record<number, string[]> = {
  14: [
    'My body is strong, adaptable, and blossoming with gentle maternal energy as I step into my second trimester.',
    'I welcome this period of comfort, vitality, and quiet connection with my baby.',
    'Every day brings my baby closer to me, surrounded by tenderness and peace.',
  ],
  15: [
    'I trust my body’s natural maternal wisdom to nurture, protect, and build strong foundations for my little one.',
    'My baby and I are working together in harmonious, miraculous rhythm.',
    'I am worthy of peaceful rest, wholesome nourishment, and loving care today.',
  ],
  16: [
    'Every breath I take sends warmth and peace to my baby. Together, we are safe, cherished, and deeply connected.',
    'My baby hears the soothing cadence of my voice and feels the warmth of my love.',
    'I release all doubts and embrace the joy of creating a safe, loving haven.',
  ],
  17: [
    'I celebrate the miraculous transformation within me today. I am creating a quiet, loving sanctuary.',
    'My body knows exactly what to do, and I support it with gentle kindness.',
    'I nurture myself so that I can nurture my baby with abundance and grace.',
  ],
  18: [
    'With every gentle flutter, I feel the miracle of life within me. I am patient with my body and joyful in this journey.',
    'Each tiny movement is a reminder of our sacred, unbreakable bond.',
    'I fill our shared space with calm thoughts, steady breaths, and endless love.',
  ],
  20: [
    'We have reached our halfway milestone together. I honor my body, my baby, and the loving mother I already am.',
    'I am grateful for every milestone passed and excited for every discovery ahead.',
    'Strength, grace, and maternal love flow through me effortlessly today.',
  ],
};

export const DailyAffirmationCard: React.FC<DailyAffirmationCardProps> = ({ selectedWeek }) => {
  const weekData = BABY_DEVELOPMENT_BY_WEEK[selectedWeek] || BABY_DEVELOPMENT_BY_WEEK[16];
  const affirmationsList = WEEKLY_ADDITIONAL_AFFIRMATIONS[selectedWeek] || [weekData.affirmation];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [isFavorited, setIsFavorited] = useState(false);

  const currentAffirmation = affirmationsList[currentIndex % affirmationsList.length] || weekData.affirmation;

  const handleNextAffirmation = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmationsList.length);
  };

  const handleToggleBreathing = () => {
    if (isBreathing) {
      setIsBreathing(false);
      return;
    }
    setIsBreathing(true);
    setBreathPhase('Inhale');

    // Run a calming 8-second breathing sequence (4s Inhale, 2s Hold, 4s Exhale)
    const t1 = setTimeout(() => setBreathPhase('Hold'), 3500);
    const t2 = setTimeout(() => setBreathPhase('Exhale'), 5500);
    const t3 = setTimeout(() => {
      setIsBreathing(false);
      setBreathPhase('Inhale');
    }, 9500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-[#FFF5F6] via-white to-[#F8F4FE] rounded-3xl p-4 sm:p-5 border border-[#FF8C94]/25 shadow-maternal-card overflow-hidden transition-all duration-300">
      {/* Decorative Pastel Ambient Glows */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FFE5E8]/60 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#E2D4F9]/40 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-2.5 border-b border-[#7D6F72]/10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94] shrink-0 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-[#FF8C94]" />
          </div>
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B35860]">
              Daily Affirmation
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FFE5E8] text-[#B35860] font-bold">
              Week {selectedWeek}
            </span>
          </div>
        </div>

        {/* Favorite / Liked Toggle */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`p-1.5 rounded-full transition-all active:scale-90 ${
            isFavorited
              ? 'bg-[#FFE5E8] text-[#FF8C94]'
              : 'text-[#7D6F72] hover:text-[#FF8C94] hover:bg-white/80'
          }`}
          title={isFavorited ? 'Saved to your heart' : 'Save affirmation'}
          aria-label="Save affirmation"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Affirmation Content Body */}
      <div className="relative z-10 my-3">
        <div className="flex items-start gap-2">
          <span className="text-2xl font-serif text-[#FF8C94]/60 select-none leading-none -mt-1">
            “
          </span>
          <p className="text-xs sm:text-sm text-[#2D2426] font-medium leading-relaxed italic flex-1">
            {currentAffirmation}
          </p>
          <span className="text-2xl font-serif text-[#FF8C94]/60 select-none leading-none self-end -mb-2">
            ”
          </span>
        </div>

        {/* Emotional Support Focus */}
        <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-[#7D6F72]">
          <Sparkles className="w-3 h-3 text-[#FF8C94] shrink-0" />
          <span>Focus for Week {selectedWeek}:</span>
          <span className="font-bold text-[#54436B] bg-[#F8F4FE] px-2 py-0.5 rounded-md border border-[#E2D4F9]/60">
            {weekData.affirmationFocus}
          </span>
        </div>
      </div>

      {/* Interactive Breath with Baby Mode */}
      {isBreathing && (
        <div className="relative z-10 mb-3 p-3 rounded-2xl bg-white/90 border border-[#A8E6CF]/60 flex items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E2F8EE] flex items-center justify-center text-[#2E7D5E] relative">
              <span className="absolute inset-0 rounded-full bg-[#A8E6CF]/50 animate-ping" />
              <Wind className="w-4 h-4 relative z-10" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1D5E44]">
                {breathPhase === 'Inhale' && 'Slow Inhale... Breathe in calm'}
                {breathPhase === 'Hold' && 'Gentle Hold... Feeling baby’s warmth'}
                {breathPhase === 'Exhale' && 'Slow Exhale... Releasing all tension'}
              </div>
              <span className="text-[10px] text-[#7D6F72]">Synchronizing steady maternal heart rhythm</span>
            </div>
          </div>
          <button
            onClick={() => setIsBreathing(false)}
            className="text-[10px] font-semibold text-[#7D6F72] hover:text-[#2D2426] px-2 py-1 rounded-md bg-[#FFF9F6]"
          >
            Done
          </button>
        </div>
      )}

      {/* Action Footer Bar */}
      <div className="relative z-10 pt-2 border-t border-[#7D6F72]/10 flex items-center justify-between gap-2">
        <button
          onClick={handleToggleBreathing}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            isBreathing
              ? 'bg-[#E2F8EE] text-[#1D5E44] border border-[#A8E6CF]'
              : 'bg-white/80 text-[#54436B] hover:bg-white border border-[#7D6F72]/15 shadow-2xs'
          }`}
          title="Take a gentle 10-second breath with your baby"
        >
          <Wind className="w-3.5 h-3.5 text-[#FF8C94]" />
          <span>{isBreathing ? 'Breathing with Baby' : 'Breathe with Baby'}</span>
        </button>

        {affirmationsList.length > 1 && (
          <button
            onClick={handleNextAffirmation}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium text-[#7D6F72] hover:text-[#2D2426] hover:bg-white/80 transition-colors"
            title="Read another affirmation for this week"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Another Thought</span>
          </button>
        )}
      </div>
    </div>
  );
};
