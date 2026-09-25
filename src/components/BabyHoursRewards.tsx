import React, { useState } from 'react';
import { QuestItem, RewardItem } from '../types';
import { INITIAL_QUESTS, REWARDS_STORE } from '../data/mockData';
import { Award, Check, Sparkles, Flame, Gift, Star, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BabyHoursRewardsProps {
  babyHours: number;
  setBabyHours: React.Dispatch<React.SetStateAction<number>>;
  onRedeemConsult: () => void;
}

export const BabyHoursRewards: React.FC<BabyHoursRewardsProps> = ({
  babyHours,
  setBabyHours,
  onRedeemConsult,
}) => {
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);
  const [rewards, setRewards] = useState<RewardItem[]>(REWARDS_STORE);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [redeemSuccessCode, setRedeemSuccessCode] = useState<string | null>(null);

  const handleToggleQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const nextCompleted = !q.completed;
          if (nextCompleted) {
            // Reward hours
            setBabyHours((h) => h + q.hoursReward);
            // Trigger confetti
            try {
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#FF8C94', '#A8E6CF', '#E2D4F9', '#FFD3B6'],
              });
            } catch {}
          } else {
            setBabyHours((h) => Math.max(0, h - q.hoursReward));
          }
          return { ...q, completed: nextCompleted };
        }
        return q;
      })
    );
  };

  const handleRedeemClick = (reward: RewardItem) => {
    setSelectedReward(reward);
    setRedeemSuccessCode(null);
  };

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    if (babyHours < selectedReward.hoursCost && !selectedReward.unlocked) {
      alert('You need more Baby Hours to redeem this reward! Complete daily wellness quests to earn more.');
      return;
    }

    if (!selectedReward.unlocked) {
      setBabyHours((h) => h - selectedReward.hoursCost);
    }

    const voucherCode = `JANANI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setRedeemSuccessCode(voucherCode);

    setRewards((prev) =>
      prev.map((r) => (r.id === selectedReward.id ? { ...r, unlocked: true } : r))
    );

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF8C94', '#A8E6CF', '#E2D4F9'],
      });
    } catch {}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-white via-white to-[#FFE5E8]/40 rounded-3xl p-4 sm:p-6 border border-[#FF8C94]/30 shadow-maternal-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[28px]">stars</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8C94]">
                  Gamified Care
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E2F8EE] text-[#2E7D5E] text-[10px] font-bold">
                  Tier 2 Nurturer
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#2D2426] mt-0.5">
                Baby Hours Balance
              </h1>
              <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-snug">
                Earn hours by logging hydration, nutrition & kicks.
              </p>
            </div>
          </div>

          <div className="bg-white/95 py-2 px-3.5 rounded-2xl border border-[#FF8C94]/25 flex items-center gap-2 shadow-xs self-start sm:self-center">
            <Star className="w-4 h-4 text-[#FF8C94] fill-[#FF8C94] shrink-0" />
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#2D2426] tabular-nums leading-none">
                {babyHours}
              </span>
              <span className="text-[11px] font-bold text-[#7D6F72]">hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 5-Day Logging Streak */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex flex-wrap items-center justify-between gap-1 pb-3 border-b border-[#7D6F72]/10">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#FF8C94] shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-[#2D2426]">5-Day Logging Streak</h2>
          </div>
          <span className="text-[11px] font-semibold text-[#2E7D5E] bg-[#E2F8EE] px-2 py-0.5 rounded-full">
            Active • +25h Bonus
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-3.5 text-center">
          {[
            { day: 'Mon', completed: true, label: 'Day 1' },
            { day: 'Tue', completed: true, label: 'Day 2' },
            { day: 'Wed', completed: true, label: 'Day 3' },
            { day: 'Thu', completed: true, label: 'Day 4' },
            { day: 'Fri', completed: true, label: 'Today' },
            { day: 'Sat', completed: false, label: 'Day 6' },
            { day: 'Sun', completed: false, label: 'Day 7' },
          ].map((d, i) => (
            <div
              key={i}
              className={`py-2 px-0.5 sm:px-1 rounded-xl flex flex-col items-center justify-between min-h-[64px] border transition-all ${
                d.label === 'Today'
                  ? 'bg-[#E2F8EE] border-[#A8E6CF] text-[#1D5E44] ring-2 ring-[#A8E6CF]/50'
                  : d.completed
                  ? 'bg-[#E2F8EE]/60 border-[#A8E6CF] text-[#1D5E44]'
                  : 'bg-[#FFF9F6] border-[#7D6F72]/10 text-[#7D6F72]'
              }`}
            >
              <span className="text-[10px] font-bold leading-none">{d.day}</span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center my-1 ${
                  d.completed ? 'bg-[#A8E6CF] text-[#1D5E44]' : 'bg-white border border-[#7D6F72]/20'
                }`}
              >
                {d.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className={`text-[8px] leading-none font-semibold truncate ${d.label === 'Today' ? 'text-[#1D5E44] font-extrabold' : ''}`}>
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Today's Daily Quests */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between pb-3 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8C94]">
              Daily Goals
            </span>
            <h2 className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5">
              Today's Quests
            </h2>
          </div>
          <span className="text-[11px] text-[#7D6F72] bg-[#FFF9F6] px-2 py-0.5 rounded-full border border-[#7D6F72]/10">
            {quests.filter((q) => q.completed).length}/{quests.length} done
          </span>
        </div>

        <div className="divide-y divide-[#7D6F72]/10 mt-1">
          {quests.map((q) => (
            <div key={q.id} className="py-3 flex items-center justify-between gap-2.5">
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <button
                  onClick={() => handleToggleQuest(q.id)}
                  className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all shrink-0 ${
                    q.completed
                      ? 'bg-[#A8E6CF] text-[#1D5E44]'
                      : 'border-2 border-[#7D6F72]/30 hover:border-[#FF8C94]'
                  }`}
                  aria-label={`Toggle quest ${q.title}`}
                >
                  {q.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-xs font-bold leading-tight ${
                        q.completed ? 'line-through text-[#7D6F72]' : 'text-[#2D2426]'
                      }`}
                    >
                      {q.title}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#FFF9F6] border border-[#7D6F72]/10 text-[#7D6F72]">
                      {q.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-snug">{q.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[#FF8C94] shrink-0">
                <span className="material-symbols-outlined text-[15px]">stars</span>
                <span>+{q.hoursReward}h</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Redeem & Maternal Rewards Store */}
      <div className="bg-white rounded-3xl p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D6F72]">
              Sisterly Store
            </span>
            <h2 className="text-base font-bold text-[#2D2426] mt-0.5">
              Redeem & Maternal Care
            </h2>
          </div>
          <span className="text-xs text-[#FF8C94] font-bold">Balance: {babyHours} hrs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {rewards.map((r) => {
            const canAfford = babyHours >= r.hoursCost || r.unlocked;
            return (
              <div
                key={r.id}
                className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10 flex flex-col justify-between hover:border-[#FF8C94]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#7D6F72]/10 text-[#2D2426]">
                      {r.badge}
                    </span>
                    <span className="text-xs font-bold text-[#FF8C94] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#FF8C94]" />
                      <span>{r.hoursCost} hrs</span>
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#2D2426] mt-2.5">{r.title}</h3>
                  <p className="text-xs text-[#7D6F72] mt-1 leading-relaxed">{r.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#7D6F72]/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#7D6F72]">{r.category}</span>
                  <button
                    onClick={() => handleRedeemClick(r)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      r.unlocked
                        ? 'bg-[#E2F8EE] text-[#2E7D5E] border border-[#A8E6CF]'
                        : canAfford
                        ? 'bg-[#FF8C94] text-white hover:bg-[#FF737D] shadow-xs active:scale-95'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {r.unlocked ? 'Unlocked / View' : canAfford ? 'Redeem Now' : 'Need More Hours'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reward Redemption Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#7D6F72]/10 relative">
            <button
              onClick={() => setSelectedReward(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#7D6F72] hover:bg-[#FFF9F6]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94] mb-3">
              <Gift className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-[#2D2426]">{selectedReward.title}</h3>
            <p className="text-xs text-[#7D6F72] mt-1 leading-relaxed">
              {selectedReward.description}
            </p>

            {redeemSuccessCode ? (
              <div className="mt-5 p-4 rounded-2xl bg-[#E2F8EE] border border-[#A8E6CF] text-center">
                <CheckCircle2 className="w-8 h-8 text-[#2E7D5E] mx-auto mb-1.5" />
                <h4 className="text-sm font-bold text-[#1D5E44]">Redemption Confirmed!</h4>
                <p className="text-xs text-[#2E7D5E] mt-0.5">
                  Your voucher code has been registered with Apollo Cradle / Cloudnine concierge:
                </p>
                <div className="mt-2.5 py-2 px-4 bg-white rounded-xl border border-[#A8E6CF] text-base font-mono font-bold text-[#1D5E44] tracking-wider">
                  {redeemSuccessCode}
                </div>
                <button
                  onClick={() => {
                    setSelectedReward(null);
                    if (selectedReward.id === 'rew-1') onRedeemConsult();
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-[#1D5E44] text-white text-xs font-bold"
                >
                  {selectedReward.id === 'rew-1' ? 'Proceed to Teleconsult' : 'Done'}
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF9F6] border border-[#7D6F72]/10 text-xs text-[#2D2426] mb-4">
                  <span>Reward Cost:</span>
                  <span className="font-bold text-[#FF8C94]">{selectedReward.hoursCost} Hours</span>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedReward(null)}
                    className="px-4 py-2 rounded-full text-xs font-medium text-[#7D6F72] hover:bg-[#FFF9F6]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRedeem}
                    className="px-5 py-2 rounded-full bg-[#FF8C94] text-white text-xs font-bold shadow-maternal-primary hover:bg-[#FF737D]"
                  >
                    {selectedReward.unlocked ? 'View Voucher' : `Confirm (${selectedReward.hoursCost} hrs)`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
