import React, { useState } from 'react';
import { TabType, VitalsState, ClinicalRecord } from './types';
import { INITIAL_VITALS } from './data/mockData';
import { MobileTopBar } from './components/MobileTopBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeDashboard } from './components/HomeDashboard';
import { RoutineNutrition } from './components/RoutineNutrition';
import { MaushiAICompanion } from './components/MaushiAICompanion';
import { ConsultVault } from './components/ConsultVault';
import { BabyHoursRewards } from './components/BabyHoursRewards';
import { VideoConsultModal } from './components/VideoConsultModal';
import { ReportViewerModal } from './components/ReportViewerModal';
import { ProfileModal } from './components/ProfileModal';
import { BrandModal } from './components/BrandModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ExportPortfolioModal } from './components/ExportPortfolioModal';
import {
  Smartphone,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Wifi,
  Battery,
  Signal,
  Heart,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isFramed, setIsFramed] = useState<boolean>(true);
  const [vitals, setVitals] = useState<VitalsState>(INITIAL_VITALS);
  const [selectedWeek, setSelectedWeek] = useState<number>(16);
  const [babyHours, setBabyHours] = useState<number>(120);

  // Dynamic Island states
  const [islandExpanded, setIslandExpanded] = useState<boolean>(false);

  // Modals
  const [maushiPrompt, setMaushiPrompt] = useState<string | undefined>(undefined);
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);
  const [showVideoConsult, setShowVideoConsult] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showBrandModal, setShowBrandModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const handleResetPrototype = () => {
    setVitals(INITIAL_VITALS);
    setSelectedWeek(16);
    setBabyHours(120);
    setActiveTab('home');
  };

  const handleOpenSymptomInquiry = (symptom: string) => {
    setMaushiPrompt(`Maushi, I am experiencing ${symptom} today at week 16. What soothing remedies can you recommend?`);
    setActiveTab('ai');
  };

  const handleAskMaushiNutrition = (nutrient: string) => {
    setMaushiPrompt(`Maushi, what are the best pregnancy-safe recipes and foods rich in ${nutrient} for my 16th week?`);
    setActiveTab('ai');
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeDashboard
            vitals={vitals}
            setVitals={setVitals}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            setActiveTab={setActiveTab}
            onOpenVideoConsult={() => setShowVideoConsult(true)}
            onOpenSymptomInquiry={handleOpenSymptomInquiry}
          />
        );
      case 'routine':
        return (
          <RoutineNutrition
            waterIntakeMl={vitals.waterIntakeMl}
            setWaterIntakeMl={(val) =>
              setVitals((prev) => ({
                ...prev,
                waterIntakeMl: typeof val === 'function' ? val(prev.waterIntakeMl) : val,
              }))
            }
            onAskMaushiNutrition={handleAskMaushiNutrition}
          />
        );
      case 'ai':
        return (
          <MaushiAICompanion
            initialPrompt={maushiPrompt}
            onClearInitialPrompt={() => setMaushiPrompt(undefined)}
          />
        );
      case 'consults':
        return (
          <ConsultVault
            onOpenVideoConsult={() => setShowVideoConsult(true)}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
          />
        );
      case 'rewards':
        return (
          <BabyHoursRewards
            babyHours={babyHours}
            setBabyHours={setBabyHours}
            onRedeemConsult={() => setShowVideoConsult(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EE] text-[#2D2426] flex flex-col antialiased selection:bg-[#FF8C94]/25">
      {/* Prototype Control Header (Toolbar for reviewing the mobile app prototype) */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-[#7D6F72]/10 py-2 px-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Info */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowBrandModal(true)}
              className="flex items-center gap-2 group text-left focus:outline-none"
              title="Click to view the Janani Care uploaded brand identity card"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFE5E8] to-[#F8F4FE] border border-[#FF8C94]/30 flex items-center justify-center text-[#2D2426] font-serif font-black text-sm group-hover:scale-105 transition-transform shadow-2xs">
                J
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-sm font-black text-[#2D2426]">Janani</span>
                  <span className="text-[10px] font-extrabold tracking-widest text-[#B35860] uppercase">CARE</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FFE5E8] text-[#B35860] font-bold">
                    Mobile Prototype
                  </span>
                </div>
                <span className="text-[10px] text-[#7D6F72]">
                  Empathetic Clinical &amp; Restorative Pregnancy Companion
                </span>
              </div>
            </button>
          </div>

          {/* Prototype Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Export to Portfolio Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2D2426] text-white hover:bg-black text-xs font-bold transition-all shadow-2xs active:scale-95"
              title="Export this prototype to your Google AI Studio portfolio website"
            >
              <Share2 className="w-3.5 h-3.5 text-[#FF8C94]" />
              <span className="hidden sm:inline">Export to Portfolio</span>
              <span className="sm:hidden">Export</span>
            </button>

            {/* View Uploaded Brand Artwork Button */}
            <button
              onClick={() => setShowBrandModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFE5E8] border border-[#FF8C94]/25 text-[#B35860] hover:bg-[#FF8C94]/20 text-xs font-bold transition-all shadow-2xs"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Brand Artwork</span>
            </button>

            {/* Frame / Fullscreen Switcher */}
            <button
              onClick={() => setIsFramed(!isFramed)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#7D6F72]/20 hover:bg-gray-50 text-[#2D2426] text-xs font-semibold transition-all shadow-2xs"
              title={isFramed ? 'Switch to Fullscreen Mobile View' : 'Switch to Smartphone Device Frame'}
            >
              {isFramed ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#7D6F72]" />
                  <span className="hidden sm:inline">Fill Screen</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#FF8C94]" />
                  <span className="hidden sm:inline">Phone Frame</span>
                </>
              )}
            </button>

            {/* Reset Prototype Data */}
            <button
              onClick={handleResetPrototype}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white border border-[#7D6F72]/20 hover:bg-gray-50 text-[#7D6F72] text-xs font-medium transition-all shadow-2xs"
              title="Reset Prototype Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Prototype Body */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-6 sm:py-8">
        {isFramed ? (
          /* ==========================================================
             REALISTIC SMARTPHONE DEVICE FRAME (iPhone 16 Pro Chassis)
             ========================================================== */
          <div className="relative w-full max-w-[405px] h-[min(844px,calc(100dvh-64px))] bg-[#1C1A1E] rounded-[48px] p-[10px] shadow-[0_25px_70px_-15px_rgba(45,36,38,0.35),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between select-none">
            {/* Outer Titanium Edge Details */}
            <div className="absolute -left-[3px] top-[110px] w-[3px] h-[24px] bg-[#3A3538] rounded-l-sm" /> {/* Action Button */}
            <div className="absolute -left-[3px] top-[148px] w-[3px] h-[48px] bg-[#3A3538] rounded-l-sm" /> {/* Vol Up */}
            <div className="absolute -left-[3px] top-[206px] w-[3px] h-[48px] bg-[#3A3538] rounded-l-sm" /> {/* Vol Down */}
            <div className="absolute -right-[3px] top-[160px] w-[3px] h-[72px] bg-[#3A3538] rounded-r-sm" /> {/* Power Button */}

            {/* Inner Screen Display (Bezel boundary) */}
            <div className="relative w-full h-full bg-[#FFF9F6] rounded-[38px] overflow-hidden flex flex-col shadow-inner border border-[#2D2426]/10">
              
              {/* iOS Mobile Status Bar & Dynamic Island */}
              <div className="relative z-30 pt-2.5 px-5 pb-1.5 bg-[#FFF9F6] flex items-center justify-between text-[11px] font-bold text-[#2D2426] shrink-0">
                {/* Time */}
                <span className="w-12 tracking-tight">9:41</span>

                {/* Interactive Dynamic Island */}
                <div
                  onClick={() => setIslandExpanded(!islandExpanded)}
                  className={`bg-black text-white rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
                    islandExpanded
                      ? 'w-48 h-7 px-3 gap-2'
                      : 'w-24 h-5 px-2'
                  }`}
                  title="Interactive Dynamic Island - Tap to expand"
                >
                  {islandExpanded ? (
                    <div className="flex items-center justify-between w-full text-[10px]">
                      <div className="flex items-center gap-1.5 text-[#A8E6CF]">
                        <Heart className="w-3 h-3 fill-current animate-pulse" />
                        <span>FHR 146 bpm</span>
                      </div>
                      <span className="text-white/60 text-[9px]">Week 16</span>
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#333] mx-auto" />
                  )}
                </div>

                {/* Cellular & Battery Icons */}
                <div className="flex items-center justify-end gap-1.5 w-12 text-[#2D2426]">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Mobile App Bar */}
              <MobileTopBar
                babyHours={babyHours}
                onOpenProfile={() => setShowProfile(true)}
                onOpenBrandModal={() => setShowBrandModal(true)}
                onOpenNotifications={() => setShowNotifications(true)}
              />

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto px-3.5 sm:px-4 pt-3 pb-10 space-y-4 no-scrollbar">
                {renderActiveScreen()}
              </div>

              {/* Bottom Mobile Tab Bar */}
              <div className="shrink-0 bg-white/95 backdrop-blur-md">
                <BottomNavBar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {/* Home Indicator Bar */}
                <div className="py-1 bg-white/95">
                  <div className="w-32 h-1 bg-[#2D2426]/25 rounded-full mx-auto" />
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ==========================================================
             FULLSCREEN FLUID MOBILE VIEWPORT
             ========================================================== */
          <div className="w-full max-w-md min-h-screen bg-[#FFF9F6] shadow-xl border-x border-[#7D6F72]/15 flex flex-col">
            {/* Status Bar */}
            <div className="pt-2 px-4 pb-1 bg-[#FFF9F6] flex items-center justify-between text-[11px] font-bold text-[#2D2426]">
              <span>9:41</span>
              <span className="text-[10px] text-[#7D6F72] font-semibold">Janani Care Mobile</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Mobile Top Bar */}
            <MobileTopBar
              babyHours={babyHours}
              onOpenProfile={() => setShowProfile(true)}
              onOpenBrandModal={() => setShowBrandModal(true)}
              onOpenNotifications={() => setShowNotifications(true)}
            />

            {/* Content Area */}
            <div className="flex-1 p-3.5 sm:p-4 pb-28 space-y-4">
              {renderActiveScreen()}
            </div>

            {/* Bottom Tab Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto">
              <BottomNavBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <div className="py-1 bg-white">
                <div className="w-32 h-1 bg-[#2D2426]/25 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================================
          INTERACTIVE PROTOTYPE MODALS & BOTTOM SHEETS
          ========================================================== */}
      {/* 1. Uploaded Brand Identity Modal */}
      {showBrandModal && (
        <BrandModal
          onClose={() => setShowBrandModal(false)}
          onExploreApp={() => setShowBrandModal(false)}
        />
      )}

      {/* 2. Notifications Bottom Sheet Drawer */}
      {showNotifications && (
        <NotificationsDrawer
          onClose={() => setShowNotifications(false)}
          onSelectAction={(tab) => {
            setActiveTab(tab);
            setShowNotifications(false);
          }}
        />
      )}

      {/* 3. Live Ob-Gyn Video Consult Simulator */}
      {showVideoConsult && (
        <VideoConsultModal onClose={() => setShowVideoConsult(false)} />
      )}

      {/* 4. Diagnostic Report Viewer */}
      {selectedRecord && (
        <ReportViewerModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

      {/* 5. Patient Profile & Emergency Support */}
      {showProfile && (
        <ProfileModal
          babyHours={babyHours}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* 6. Export to Portfolio Modal */}
      {showExportModal && (
        <ExportPortfolioModal onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
}
