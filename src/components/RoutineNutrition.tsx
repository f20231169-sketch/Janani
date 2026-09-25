import React, { useState } from 'react';
import { NutrientItem, VitaminScheduleItem, MealEntry } from '../types';
import { NUTRIENTS_DATA, VITAMIN_SCHEDULE, INITIAL_MEALS } from '../data/mockData';
import { Droplets, Check, Plus, AlertCircle, Utensils, Sparkles, X } from 'lucide-react';

interface RoutineNutritionProps {
  waterIntakeMl: number;
  setWaterIntakeMl: React.Dispatch<React.SetStateAction<number>>;
  onAskMaushiNutrition: (nutrient: string) => void;
}

export const RoutineNutrition: React.FC<RoutineNutritionProps> = ({
  waterIntakeMl,
  setWaterIntakeMl,
  onAskMaushiNutrition,
}) => {
  const [nutrients, setNutrients] = useState<NutrientItem[]>(NUTRIENTS_DATA);
  const [vitamins, setVitamins] = useState<VitaminScheduleItem[]>(VITAMIN_SCHEDULE);
  const [meals, setMeals] = useState<MealEntry[]>(INITIAL_MEALS);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMealType, setNewMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Snack');
  const [newMealTitle, setNewMealTitle] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('200');

  const handleToggleVitamin = (id: string) => {
    setVitamins((prev) =>
      prev.map((v) => (v.id === id ? { ...v, taken: !v.taken } : v))
    );
  };

  const handleAddCup = () => {
    setWaterIntakeMl((prev) => Math.min(3500, prev + 250));
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealTitle.trim()) return;

    const newMeal: MealEntry = {
      id: `meal-${Date.now()}`,
      type: newMealType,
      title: newMealTitle,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: parseInt(newMealCalories, 10) || 200,
      nutrients: ['Balanced Trimester 2 Micronutrients'],
    };

    setMeals((prev) => [newMeal, ...prev]);
    setNewMealTitle('');
    setShowAddMealModal(false);
  };

  const glassesCount = Math.floor(waterIntakeMl / 250);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[#7D6F72]">
              <span>Maternal Nutrition</span>
              <span aria-hidden="true">·</span>
              <span>Week 16 Protocol</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2426] mt-0.5">
              Daily Nutrition & Routine
            </h1>
            <p className="text-xs text-[#7D6F72] mt-0.5 leading-snug">
              Targeted micronutrient tracking for fetal organ and skeletal development.
            </p>
          </div>

          <button
            onClick={() => setShowAddMealModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF8C94] text-white hover:bg-[#FF737D] active:scale-95 transition-all text-xs font-bold shadow-maternal-primary self-start sm:self-center shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Meal</span>
          </button>
        </div>
      </div>

      {/* 2. Hydration Section */}
      <div className="bg-gradient-to-r from-white via-white to-[#E2F8EE]/40 rounded-3xl p-4 sm:p-6 border border-[#A8E6CF]/50 shadow-maternal-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-[#E2F8EE] flex items-center justify-center text-[#2E7D5E] shrink-0">
              <Droplets className="w-5 h-5 text-[#2E7D5E]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D5E]">
                Amniotic Fluid Reservoir
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#2D2426] mt-0.5 flex flex-wrap items-baseline gap-1">
                <span>{(waterIntakeMl / 1000).toFixed(2)} L</span>
                <span className="text-xs font-normal text-[#7D6F72]">/ 3.00 L Target</span>
              </h2>
              <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-tight">
                {glassesCount} of 12 glasses logged • Keeps placental exchange optimal
              </p>
            </div>
          </div>

          <button
            onClick={handleAddCup}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#A8E6CF] text-[#1D5E44] hover:bg-[#97D8C0] active:scale-95 transition-all text-xs font-bold shadow-xs whitespace-nowrap self-start sm:self-center shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+250ml Glass</span>
          </button>
        </div>

        {/* 12 Glasses visual tracker */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 sm:gap-2 mt-4 pt-3.5 border-t border-[#7D6F72]/10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-7 sm:h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                i < glassesCount
                  ? 'bg-[#A8E6CF] text-[#1D5E44] font-bold shadow-2xs'
                  : 'bg-[#FFF9F6] border border-[#7D6F72]/15 text-[#7D6F72]'
              }`}
              title={`Glass ${i + 1} (250ml)`}
            >
              💧
            </div>
          ))}
        </div>
      </div>

      {/* 3. Micronutrients Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#2D2426]">
            Essential Micronutrients Stack
          </h2>
          <span className="text-xs text-[#7D6F72]">RDA for 2nd Trimester</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {nutrients.map((n) => {
            const percentage = Math.min(100, Math.round((n.current / n.target) * 100));
            const isMet = percentage >= 100;
            return (
              <div
                key={n.id}
                className="bg-white rounded-2xl p-4 border border-[#7D6F72]/10 shadow-maternal-card flex flex-col justify-between hover:border-[#FF8C94]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D2426]">{n.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isMet ? 'bg-[#E2F8EE] text-[#2E7D5E]' : 'bg-[#FFF9F6] text-[#7D6F72] border border-[#7D6F72]/10'
                      }`}
                    >
                      {percentage}%
                    </span>
                  </div>

                  <div className="my-2 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#2D2426] tabular-nums">
                      {n.current}
                    </span>
                    <span className="text-xs text-[#7D6F72]">
                      / {n.target} {n.unit}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#FFF9F6] h-1.5 rounded-full overflow-hidden border border-[#7D6F72]/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: n.color || '#FF8C94',
                      }}
                    />
                  </div>

                  <p className="text-[11px] text-[#7D6F72] mt-2.5 line-clamp-2 leading-relaxed">
                    {n.importance}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#7D6F72]/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#7D6F72] truncate max-w-[170px]">
                    Foods: {n.sources.slice(0, 2).join(', ')}
                  </span>
                  <button
                    onClick={() => onAskMaushiNutrition(n.name)}
                    className="text-[10px] font-bold text-[#FF8C94] hover:underline flex items-center gap-0.5 shrink-0"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Food ideas</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Daily Prenatal Supplements Stack */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between pb-3 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8C94]">
              Prescribed Stack
            </span>
            <h2 className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5">
              Prenatal Vitamin Checklist
            </h2>
          </div>
          <span className="text-[11px] text-[#7D6F72] bg-[#FFF9F6] px-2 py-0.5 rounded-full border border-[#7D6F72]/10">
            {vitamins.filter((v) => v.taken).length} of {vitamins.length} taken
          </span>
        </div>

        <div className="divide-y divide-[#7D6F72]/10 mt-1">
          {vitamins.map((vit) => (
            <div key={vit.id} className="py-3 flex items-center justify-between gap-2.5">
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <button
                  onClick={() => handleToggleVitamin(vit.id)}
                  className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all shrink-0 ${
                    vit.taken
                      ? 'bg-[#A8E6CF] text-[#1D5E44]'
                      : 'border-2 border-[#7D6F72]/30 hover:border-[#FF8C94]'
                  }`}
                  aria-label={`Mark ${vit.name} as ${vit.taken ? 'untaken' : 'taken'}`}
                >
                  {vit.taken && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-[#2D2426]">{vit.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#FFF9F6] border border-[#7D6F72]/10 text-[#7D6F72]">
                      {vit.dosage}
                    </span>
                    <span className="text-[9px] font-semibold text-[#FF8C94]">
                      {vit.timing}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-snug">{vit.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Meals Log */}
      <div className="bg-white rounded-3xl p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D6F72]">
              Dietary Intake
            </span>
            <h2 className="text-base font-bold text-[#2D2426] mt-0.5">
              Today's Logged Meals
            </h2>
          </div>
          <button
            onClick={() => setShowAddMealModal(true)}
            className="text-xs font-bold text-[#FF8C94] hover:underline"
          >
            + Add Another
          </button>
        </div>

        <div className="divide-y divide-[#7D6F72]/10 mt-2">
          {meals.map((m) => (
            <div key={m.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFE5E8]/60 flex items-center justify-center text-[#FF8C94] shrink-0 mt-0.5">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2D2426]">{m.title}</span>
                    <span className="text-[10px] text-[#7D6F72]">({m.type})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#7D6F72]">
                    <span>{m.time}</span>
                    <span aria-hidden="true">·</span>
                    <span>{m.calories} kcal</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#2E7D5E] font-medium">{m.nutrients.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#7D6F72]/10 relative">
            <button
              onClick={() => setShowAddMealModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#7D6F72] hover:bg-[#FFF9F6]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-[#2D2426]">Log Maternal Meal</h3>
            <p className="text-xs text-[#7D6F72] mt-0.5">
              Record meals to update your daily micronutrient calculations.
            </p>

            <form onSubmit={handleAddMeal} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#2D2426] mb-1">Meal Type</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setNewMealType(t)}
                      className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                        newMealType === t
                          ? 'bg-[#FF8C94] text-white border-[#FF8C94]'
                          : 'bg-[#FFF9F6] border-[#7D6F72]/15 text-[#7D6F72]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2D2426] mb-1">Meal Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ragi Dosa with Coconut Chutney & Almonds"
                  value={newMealTitle}
                  onChange={(e) => setNewMealTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#7D6F72]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF8C94]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2D2426] mb-1">Estimated Calories (kcal)</label>
                <input
                  type="number"
                  value={newMealCalories}
                  onChange={(e) => setNewMealCalories(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#7D6F72]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF8C94]/40"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMealModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-[#7D6F72] hover:bg-[#FFF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FF8C94] text-white text-xs font-bold shadow-maternal-primary hover:bg-[#FF737D]"
                >
                  Save to Routine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
