export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
  overallScore: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferredLanguage: string;
  createdAt: string;
  subscription?: Subscription;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'monthly' | 'yearly';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  consultationsUsed: number;
  consultationsLimit: number;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialization: string[];
  experience: number;
  languages: string[];
  rating: number;
  totalConsultations: number;
  avatar: string;
  about: string;
  availability: DoctorAvailability[];
  consultationFee: number;
  isVerified: boolean;
}

export interface DoctorAvailability {
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
}

export interface Consultation {
  id: string;
  userId: string;
  doctorId: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  prescription?: string;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  userId: string;
  medicine: Medicine;
  searchType: 'camera' | 'search' | 'upload';
  searchQuery?: string;
  timestamp: string;
  notes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, language: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export type ViewType = 'home' | 'camera' | 'search' | 'upload' | 'analysis' | 'auth' | 'history' | 'profile' | 'subscription' | 'doctors' | 'consultations';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}