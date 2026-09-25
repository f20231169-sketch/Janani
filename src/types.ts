export type TabType = 'home' | 'routine' | 'ai' | 'consults' | 'rewards';

export type ViewMode = 'mobile' | 'desktop';

export interface VitalsState {
  fetalHeartRate: number; // bpm
  maternalBP: { sys: number; dia: number };
  waterIntakeMl: number;
  waterTargetMl: number;
  kickCount: number;
  lastKickTime: string;
  weightKg: number;
}

export interface NutrientItem {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  sources: string[];
  importance: string;
}

export interface VitaminScheduleItem {
  id: string;
  name: string;
  dosage: string;
  timing: 'Morning' | 'Afternoon' | 'Evening';
  taken: boolean;
  instructions: string;
}

export interface MealEntry {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  title: string;
  time: string;
  calories: number;
  nutrients: string[];
}

export interface ClinicalRecord {
  id: string;
  title: string;
  category: 'Blood Work' | 'Ultrasound / Scan' | 'Endocrine' | 'Screening';
  date: string;
  doctor: string;
  hospital: string;
  status: 'Normal' | 'Optimal' | 'Pending Review';
  summary: string;
  parameters: {
    name: string;
    value: string;
    reference: string;
    isNormal: boolean;
  }[];
  fileSize: string;
}

export interface PrescriptionItem {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  timing: string;
  purpose: string;
  duration: string;
  status: 'Active' | 'Completed';
}

export interface QuestItem {
  id: string;
  title: string;
  description: string;
  hoursReward: number;
  completed: boolean;
  category: 'Hydration' | 'Mindfulness' | 'Nutrition' | 'Tracking' | 'Wellness';
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  hoursCost: number;
  category: 'Consult' | 'Masterclass' | 'Care Kit' | 'Audio Series';
  badge: string;
  unlocked: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'maushi';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  isVoiceAudio?: boolean;
}
