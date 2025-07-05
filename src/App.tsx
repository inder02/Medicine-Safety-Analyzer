import React, { useState } from 'react';
import { Search, Camera, Upload, AlertTriangle, Shield, Info, ChevronRight, Heart, Brain, LucideKey as Kidney, User, History, LogOut, LogIn, Crown, Stethoscope } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';
import { useLanguage } from './contexts/LanguageContext';
import { useHistory } from './hooks/useHistory';
import CameraScanner from './components/CameraScanner';
import SearchMedicine from './components/SearchMedicine';
import UploadPhoto from './components/UploadPhoto';
import MedicineAnalysis from './components/MedicineAnalysis';
import AuthForm from './components/AuthForm';
import HistoryView from './components/HistoryView';
import SubscriptionPlans from './components/SubscriptionPlans';
import DoctorsList from './components/DoctorsList';
import ConsultationBooking from './components/ConsultationBooking';
import LanguageSelector from './components/LanguageSelector';
import BoltBadge from './components/BoltBadge';
import { ViewType, Medicine, Doctor, Consultation } from './types';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { user, logout } = useAuth();
  const { addToHistory } = useHistory();

  const handleMedicineSelected = (medicine: Medicine, searchType?: 'camera' | 'search' | 'upload', searchQuery?: string) => {
    setSelectedMedicine(medicine);
    setCurrentView('analysis');
    
    // Add to history
    if (searchType) {
      addToHistory(medicine, searchType, searchQuery);
    }
  };

  const handleDoctorSelected = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView('consultations');
  };

  const handleBookingComplete = (consultation: Consultation) => {
    // In a real app, this would save to backend
    console.log('Consultation booked:', consultation);
    setCurrentView('home');
    // Show success message
  };

  const handlePlanSelected = (plan: 'monthly' | 'yearly') => {
    // In a real app, this would update user subscription
    console.log('Plan selected:', plan);
    setCurrentView('doctors');
  };

  const renderView = () => {
    switch (currentView) {
      case 'camera':
        return <CameraScanner onMedicineFound={(medicine) => handleMedicineSelected(medicine, 'camera')} onBack={() => setCurrentView('home')} />;
      case 'search':
        return <SearchMedicine onMedicineSelected={(medicine, query) => handleMedicineSelected(medicine, 'search', query)} onBack={() => setCurrentView('home')} />;
      case 'upload':
        return <UploadPhoto onMedicineFound={(medicine) => handleMedicineSelected(medicine, 'upload')} onBack={() => setCurrentView('home')} />;
      case 'analysis':
        return selectedMedicine ? (
          <MedicineAnalysis medicine={selectedMedicine} onBack={() => setCurrentView('home')} />
        ) : null;
      case 'auth':
        return <AuthForm onBack={() => setCurrentView('home')} />;
      case 'history':
        return <HistoryView onBack={() => setCurrentView('home')} onMedicineSelected={(medicine) => handleMedicineSelected(medicine)} />;
      case 'subscription':
        return <SubscriptionPlans onBack={() => setCurrentView('home')} onPlanSelected={handlePlanSelected} />;
      case 'doctors':
        return <DoctorsList onBack={() => setCurrentView('home')} onDoctorSelected={handleDoctorSelected} />;
      case 'consultations':
        return selectedDoctor ? (
          <ConsultationBooking 
            doctor={selectedDoctor} 
            onBack={() => setCurrentView('doctors')} 
            onBookingComplete={handleBookingComplete}
          />
        ) : null;
      default:
        return <HomePage onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {renderView()}
    </div>
  );
}

interface HomePageProps {
  onViewChange: (view: ViewType) => void;
}

function HomePage({ onViewChange }: HomePageProps) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const hasActiveSubscription = user?.subscription?.status === 'active';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="min-h-[2.5rem] sm:min-h-[3rem] flex flex-col justify-center">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">MediSafe</h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight hidden sm:block">Medicine Safety Analyzer</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <LanguageSelector />
              
              {user ? (
                <div className="flex items-center space-x-1 sm:space-x-3">
                  {!hasActiveSubscription && (
                    <button
                      onClick={() => onViewChange('subscription')}
                      className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all min-h-[2.5rem]"
                    >
                      <Crown className="w-4 h-4" />
                      <span className="text-xs sm:text-sm leading-tight hidden sm:inline">Upgrade Pro</span>
                      <span className="text-xs leading-tight sm:hidden">Pro</span>
                    </button>
                  )}
                  
                  {hasActiveSubscription && (
                    <button
                      onClick={() => onViewChange('doctors')}
                      className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[2.5rem]"
                    >
                      <Stethoscope className="w-4 h-4" />
                      <span className="text-xs sm:text-sm leading-tight hidden sm:inline">Consult Doctor</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => onViewChange('history')}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors min-h-[2.5rem]"
                  >
                    <History className="w-4 h-4" />
                    <span className="text-xs sm:text-sm leading-tight hidden md:inline">{t('nav.history')}</span>
                  </button>
                  
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg min-h-[2.5rem]">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700 hidden sm:inline leading-tight">{user.name}</span>
                    {hasActiveSubscription && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[2.5rem]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline leading-tight">{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={() => onViewChange('subscription')}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all min-h-[2.5rem]"
                  >
                    <Crown className="w-4 h-4" />
                    <span className="text-xs sm:text-sm leading-tight">Consult</span>
                  </button>
                  
                  <button
                    onClick={() => onViewChange('auth')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[2.5rem]"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="leading-tight">{t('nav.login')}</span>
                  </button>
                </div>
              )}
              
              {/* Bolt.new Badge */}
              <BoltBadge variant="black" className="ml-1 sm:ml-2 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center px-4">
              {t('home.title')}
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed min-h-[2rem] sm:min-h-[3rem] flex items-center justify-center px-4">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Pro Features Banner */}
        {!hasActiveSubscription && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-12 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold">Upgrade to Pro</h3>
                </div>
                <p className="text-blue-100 mb-4">Get unlimited access to verified MBBS doctors</p>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Video consultations with licensed doctors</li>
                  <li>• Personalized health reports</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
              <button
                onClick={() => onViewChange('subscription')}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                View Plans
              </button>
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <ActionCard
            icon={<Camera className="w-8 h-8" />}
            title={t('home.scan')}
            description={t('home.scan.desc')}
            onClick={() => onViewChange('camera')}
            gradient="from-blue-500 to-blue-600"
          />
          <ActionCard
            icon={<Search className="w-8 h-8" />}
            title={t('home.search')}
            description={t('home.search.desc')}
            onClick={() => onViewChange('search')}
            gradient="from-green-500 to-green-600"
          />
          <ActionCard
            icon={<Upload className="w-8 h-8" />}
            title={t('home.upload')}
            description={t('home.upload.desc')}
            onClick={() => onViewChange('upload')}
            gradient="from-purple-500 to-purple-600"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <FeatureCard
            icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
            title={t('features.risk')}
            description={t('features.risk.desc')}
          />
          <FeatureCard
            icon={<Heart className="w-6 h-6 text-red-500" />}
            title={t('features.organ')}
            description={t('features.organ.desc')}
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6 text-blue-600" />}
            title={t('features.ai')}
            description={t('features.ai.desc')}
          />
          <FeatureCard
            icon={<Info className="w-6 h-6 text-green-600" />}
            title={t('features.easy')}
            description={t('features.easy.desc')}
          />
        </div>

        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-amber-100 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">{t('disclaimer.title')}</h3>
              <p className="text-amber-800 leading-relaxed text-sm sm:text-base">
                {t('disclaimer.text')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  gradient: string;
}

function ActionCard({ icon, title, description, onClick, gradient }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 text-left w-full"
    >
      <div className={`bg-gradient-to-r ${gradient} p-2 sm:p-3 rounded-xl w-fit mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{description}</p>
      <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base">
        Get Started <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </button>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;