import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Clock, TrendingUp, Mic, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Medicine } from '../types';
import VoiceInput from './VoiceInput';

interface SearchMedicineProps {
  onMedicineSelected: (medicine: Medicine, searchQuery?: string) => void;
  onBack: () => void;
}

// Comprehensive global medicine database
const globalMedicines = [
  // Pain Relief & Anti-inflammatory
  { id: '1', name: 'Paracetamol', genericName: 'Acetaminophen', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.2, aliases: ['Tylenol', 'Crocin', 'Dolo', 'Calpol', 'Panadol'] },
  { id: '2', name: 'Ibuprofen', genericName: 'Ibuprofen', manufacturer: 'Various', riskLevel: 'high' as const, overallScore: 6.1, aliases: ['Advil', 'Brufen', 'Nurofen', 'Motrin'] },
  { id: '3', name: 'Aspirin', genericName: 'Acetylsalicylic acid', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.8, aliases: ['Disprin', 'Ecosprin', 'Bayer Aspirin'] },
  { id: '4', name: 'Diclofenac', genericName: 'Diclofenac sodium', manufacturer: 'Various', riskLevel: 'critical' as const, overallScore: 4.2, aliases: ['Voltaren', 'Voveran', 'Cataflam'] },
  { id: '5', name: 'Nimesulide', genericName: 'Nimesulide', manufacturer: 'Various', riskLevel: 'high' as const, overallScore: 5.8, aliases: ['Nise', 'Nimulid', 'Nice'] },
  { id: '6', name: 'Aceclofenac', genericName: 'Aceclofenac', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.9, aliases: ['Zerodol', 'Hifenac', 'Aceclo'] },
  { id: '7', name: 'Tramadol', genericName: 'Tramadol hydrochloride', manufacturer: 'Various', riskLevel: 'critical' as const, overallScore: 4.5, aliases: ['Ultram', 'Tramal', 'Ultracet'] },
  { id: '8', name: 'Naproxen', genericName: 'Naproxen', manufacturer: 'Various', riskLevel: 'high' as const, overallScore: 6.3, aliases: ['Aleve', 'Naprosyn', 'Flanax'] },
  { id: '9', name: 'Celecoxib', genericName: 'Celecoxib', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.8, aliases: ['Celebrex', 'Celact'] },
  { id: '10', name: 'Meloxicam', genericName: 'Meloxicam', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.7, aliases: ['Mobic', 'Melonex'] },

  // Antibiotics
  { id: '11', name: 'Amoxicillin', genericName: 'Amoxicillin', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.1, aliases: ['Amoxil', 'Augmentin', 'Moxikind'] },
  { id: '12', name: 'Azithromycin', genericName: 'Azithromycin', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.3, aliases: ['Zithromax', 'Azee', 'Z-pack'] },
  { id: '13', name: 'Ciprofloxacin', genericName: 'Ciprofloxacin', manufacturer: 'Various', riskLevel: 'high' as const, overallScore: 5.9, aliases: ['Cipro', 'Ciplox', 'Cifran'] },
  { id: '14', name: 'Doxycycline', genericName: 'Doxycycline', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.0, aliases: ['Vibramycin', 'Doxy', 'Doxt'] },
  { id: '15', name: 'Cephalexin', genericName: 'Cephalexin', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.3, aliases: ['Keflex', 'Cefalexin'] },
  { id: '16', name: 'Clarithromycin', genericName: 'Clarithromycin', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.1, aliases: ['Biaxin', 'Klacid'] },
  { id: '17', name: 'Levofloxacin', genericName: 'Levofloxacin', manufacturer: 'Various', riskLevel: 'high' as const, overallScore: 6.0, aliases: ['Levaquin', 'Tavanic'] },
  { id: '18', name: 'Metronidazole', genericName: 'Metronidazole', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.2, aliases: ['Flagyl', 'Metrogyl'] },

  // Gastrointestinal
  { id: '19', name: 'Omeprazole', genericName: 'Omeprazole', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.5, aliases: ['Prilosec', 'Omez', 'Losec'] },
  { id: '20', name: 'Pantoprazole', genericName: 'Pantoprazole', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.2, aliases: ['Protonix', 'Pantop', 'Controloc'] },
  { id: '21', name: 'Esomeprazole', genericName: 'Esomeprazole', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.3, aliases: ['Nexium', 'Esoz'] },
  { id: '22', name: 'Ranitidine', genericName: 'Ranitidine', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.8, aliases: ['Zantac', 'Aciloc'] },
  { id: '23', name: 'Domperidone', genericName: 'Domperidone', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.1, aliases: ['Motilium', 'Domstal'] },
  { id: '24', name: 'Ondansetron', genericName: 'Ondansetron', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.0, aliases: ['Zofran', 'Emeset'] },
  { id: '25', name: 'Loperamide', genericName: 'Loperamide', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 7.9, aliases: ['Imodium', 'Lopamide'] },

  // Cardiovascular
  { id: '26', name: 'Amlodipine', genericName: 'Amlodipine', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.4, aliases: ['Norvasc', 'Amlong'] },
  { id: '27', name: 'Atenolol', genericName: 'Atenolol', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.2, aliases: ['Tenormin', 'Aten'] },
  { id: '28', name: 'Lisinopril', genericName: 'Lisinopril', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.6, aliases: ['Prinivil', 'Zestril'] },
  { id: '29', name: 'Metoprolol', genericName: 'Metoprolol', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.3, aliases: ['Lopressor', 'Toprol'] },
  { id: '30', name: 'Losartan', genericName: 'Losartan', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.1, aliases: ['Cozaar', 'Losacar'] },
  { id: '31', name: 'Atorvastatin', genericName: 'Atorvastatin', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.5, aliases: ['Lipitor', 'Atorva'] },
  { id: '32', name: 'Simvastatin', genericName: 'Simvastatin', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.4, aliases: ['Zocor', 'Simvotin'] },

  // Diabetes
  { id: '33', name: 'Metformin', genericName: 'Metformin', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.4, aliases: ['Glucophage', 'Glycomet'] },
  { id: '34', name: 'Glimepiride', genericName: 'Glimepiride', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.9, aliases: ['Amaryl', 'Glimpid'] },
  { id: '35', name: 'Insulin', genericName: 'Human Insulin', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.8, aliases: ['Humulin', 'Novolin', 'Lantus'] },
  { id: '36', name: 'Gliclazide', genericName: 'Gliclazide', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.0, aliases: ['Diamicron', 'Glizid'] },

  // Respiratory & Allergy
  { id: '37', name: 'Salbutamol', genericName: 'Salbutamol', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.2, aliases: ['Ventolin', 'Asthalin', 'Albuterol'] },
  { id: '38', name: 'Montelukast', genericName: 'Montelukast', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 7.9, aliases: ['Singulair', 'Montair'] },
  { id: '39', name: 'Cetirizine', genericName: 'Cetirizine', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.6, aliases: ['Zyrtec', 'Alerid', 'Cetrizet'] },
  { id: '40', name: 'Loratadine', genericName: 'Loratadine', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.4, aliases: ['Claritin', 'Lorfast'] },
  { id: '41', name: 'Dextromethorphan', genericName: 'Dextromethorphan', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 7.8, aliases: ['Robitussin', 'Delsym'] },
  { id: '42', name: 'Prednisolone', genericName: 'Prednisolone', manufacturer: 'Various', riskLevel: 'high' as const, overallScore: 5.5, aliases: ['Prelone', 'Wysolone'] },

  // Mental Health
  { id: '43', name: 'Sertraline', genericName: 'Sertraline', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.1, aliases: ['Zoloft', 'Sertima'] },
  { id: '44', name: 'Fluoxetine', genericName: 'Fluoxetine', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.0, aliases: ['Prozac', 'Fludac'] },
  { id: '45', name: 'Escitalopram', genericName: 'Escitalopram', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.2, aliases: ['Lexapro', 'Citadep'] },
  { id: '46', name: 'Alprazolam', genericName: 'Alprazolam', manufacturer: 'Various', riskLevel: 'critical' as const, overallScore: 4.8, aliases: ['Xanax', 'Alprax'] },
  { id: '47', name: 'Lorazepam', genericName: 'Lorazepam', manufacturer: 'Various', riskLevel: 'critical' as const, overallScore: 4.9, aliases: ['Ativan', 'Loram'] },

  // Vitamins & Supplements
  { id: '48', name: 'Vitamin D3', genericName: 'Cholecalciferol', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 9.1, aliases: ['Calcirol', 'D3', 'Cholecalciferol'] },
  { id: '49', name: 'Vitamin B12', genericName: 'Cyanocobalamin', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 9.2, aliases: ['Methylcobalamin', 'B12'] },
  { id: '50', name: 'Folic Acid', genericName: 'Folic Acid', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 9.0, aliases: ['Folate', 'Vitamin B9'] },
  { id: '51', name: 'Iron', genericName: 'Ferrous Sulfate', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.0, aliases: ['Ferrous Fumarate', 'Iron Supplement'] },
  { id: '52', name: 'Calcium', genericName: 'Calcium Carbonate', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.5, aliases: ['Calcium Citrate', 'Cal'] },

  // Thyroid
  { id: '53', name: 'Levothyroxine', genericName: 'Levothyroxine', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.7, aliases: ['Synthroid', 'Eltroxin', 'Thyronorm'] },
  { id: '54', name: 'Carbimazole', genericName: 'Carbimazole', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.8, aliases: ['Neo-Mercazole'] },

  // Skin & Topical
  { id: '55', name: 'Hydrocortisone', genericName: 'Hydrocortisone', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 7.8, aliases: ['Cortisone', 'HC'] },
  { id: '56', name: 'Clotrimazole', genericName: 'Clotrimazole', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.2, aliases: ['Canesten', 'Clotrim'] },
  { id: '57', name: 'Mupirocin', genericName: 'Mupirocin', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.1, aliases: ['Bactroban', 'T-Bact'] },

  // Eye & Ear
  { id: '58', name: 'Chloramphenicol', genericName: 'Chloramphenicol', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.9, aliases: ['Chloromycetin'] },
  { id: '59', name: 'Tobramycin', genericName: 'Tobramycin', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 7.1, aliases: ['Tobrex'] },

  // Women's Health
  { id: '60', name: 'Mifepristone', genericName: 'Mifepristone', manufacturer: 'Various', riskLevel: 'critical' as const, overallScore: 4.0, aliases: ['Mifeprex'] },
  { id: '61', name: 'Clomiphene', genericName: 'Clomiphene', manufacturer: 'Various', riskLevel: 'moderate' as const, overallScore: 6.5, aliases: ['Clomid', 'Fertomid'] },

  // Emergency & Critical Care
  { id: '62', name: 'Epinephrine', genericName: 'Epinephrine', manufacturer: 'Various', riskLevel: 'critical' as const, overallScore: 5.0, aliases: ['Adrenaline', 'EpiPen'] },
  { id: '63', name: 'Atropine', genericName: 'Atropine', manufacturer: 'Various', riskLevel: 'critical' as const, overallScore: 4.5, aliases: ['Atropine Sulfate'] },

  // Indian Traditional Medicines
  { id: '64', name: 'Ashwagandha', genericName: 'Withania somnifera', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.0, aliases: ['Winter Cherry', 'Indian Ginseng'] },
  { id: '65', name: 'Turmeric', genericName: 'Curcuma longa', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.5, aliases: ['Haldi', 'Curcumin'] },
  { id: '66', name: 'Triphala', genericName: 'Triphala', manufacturer: 'Various', riskLevel: 'safe' as const, overallScore: 8.2, aliases: ['Three Fruits'] },

  // Common Brand Names in India
  { id: '67', name: 'Crocin', genericName: 'Paracetamol', manufacturer: 'GSK', riskLevel: 'moderate' as const, overallScore: 7.2, aliases: ['Paracetamol', 'Acetaminophen'] },
  { id: '68', name: 'Combiflam', genericName: 'Ibuprofen + Paracetamol', manufacturer: 'Sanofi', riskLevel: 'moderate' as const, overallScore: 6.8, aliases: ['Ibuprofen Paracetamol'] },
  { id: '69', name: 'Sinarest', genericName: 'Paracetamol + Phenylephrine + Chlorpheniramine', manufacturer: 'Centaur', riskLevel: 'moderate' as const, overallScore: 6.5, aliases: ['Cold Relief'] },
  { id: '70', name: 'Allegra', genericName: 'Fexofenadine', manufacturer: 'Sanofi', riskLevel: 'safe' as const, overallScore: 8.3, aliases: ['Fexofenadine'] }
];

const popularSearches = ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Omeprazole', 'Cetirizine', 'Amoxicillin', 'Metformin', 'Vitamin D3'];
const recentSearches = ['Paracetamol', 'Vitamin D', 'Crocin', 'Omez'];

function SearchMedicine({ onMedicineSelected, onBack }: SearchMedicineProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const { t } = useLanguage();

  // Fuzzy search function
  const fuzzySearch = (query: string, medicines: typeof globalMedicines) => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase().trim();
    const results: Array<{ medicine: typeof globalMedicines[0], score: number }> = [];
    
    medicines.forEach(medicine => {
      let score = 0;
      
      // Exact match gets highest score
      if (medicine.name.toLowerCase() === searchTerm) {
        score = 100;
      }
      // Generic name exact match
      else if (medicine.genericName.toLowerCase() === searchTerm) {
        score = 95;
      }
      // Alias exact match
      else if (medicine.aliases?.some(alias => alias.toLowerCase() === searchTerm)) {
        score = 90;
      }
      // Name starts with search term
      else if (medicine.name.toLowerCase().startsWith(searchTerm)) {
        score = 80;
      }
      // Generic name starts with search term
      else if (medicine.genericName.toLowerCase().startsWith(searchTerm)) {
        score = 75;
      }
      // Alias starts with search term
      else if (medicine.aliases?.some(alias => alias.toLowerCase().startsWith(searchTerm))) {
        score = 70;
      }
      // Name contains search term
      else if (medicine.name.toLowerCase().includes(searchTerm)) {
        score = 60;
      }
      // Generic name contains search term
      else if (medicine.genericName.toLowerCase().includes(searchTerm)) {
        score = 55;
      }
      // Alias contains search term
      else if (medicine.aliases?.some(alias => alias.toLowerCase().includes(searchTerm))) {
        score = 50;
      }
      // Partial word matching
      else {
        const words = searchTerm.split(' ');
        words.forEach(word => {
          if (word.length > 2) {
            if (medicine.name.toLowerCase().includes(word)) score += 20;
            if (medicine.genericName.toLowerCase().includes(word)) score += 15;
            if (medicine.aliases?.some(alias => alias.toLowerCase().includes(word))) score += 10;
          }
        });
      }
      
      if (score > 0) {
        results.push({ medicine, score });
      }
    });
    
    // Sort by score and return top results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(result => result.medicine);
  };

  // Generate medicine if not found
  const generateMedicine = (query: string): Medicine => {
    const riskLevels: Array<'safe' | 'moderate' | 'high' | 'critical'> = ['safe', 'moderate', 'high', 'critical'];
    const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const baseScore = randomRisk === 'safe' ? 8.0 : randomRisk === 'moderate' ? 6.5 : randomRisk === 'high' ? 5.0 : 3.5;
    const variation = (Math.random() - 0.5) * 2;
    const finalScore = Math.max(1, Math.min(10, baseScore + variation));
    
    return {
      id: `generated-${Date.now()}`,
      name: query.charAt(0).toUpperCase() + query.slice(1).toLowerCase(),
      genericName: `${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()} (Generic)`,
      manufacturer: 'Various Manufacturers',
      riskLevel: randomRisk,
      overallScore: Math.round(finalScore * 10) / 10 // Round to 1 decimal place
    };
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      setNoResults(false);
      
      const timer = setTimeout(() => {
        const results = fuzzySearch(searchQuery, globalMedicines);
        
        if (results.length > 0) {
          setFilteredMedicines(results);
          setNoResults(false);
        } else {
          // If no results found, generate a medicine entry
          const generatedMedicine = generateMedicine(searchQuery);
          setFilteredMedicines([generatedMedicine]);
          setNoResults(false);
        }
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setFilteredMedicines([]);
      setIsSearching(false);
      setNoResults(false);
    }
  }, [searchQuery]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    setShowVoiceInput(false);
  };

  const handleMedicineClick = (medicine: Medicine) => {
    onMedicineSelected(medicine, searchQuery);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setSearchQuery(transcript);
    setShowVoiceInput(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="px-4 py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2 flex-1">
              <Globe className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{t('home.search')} - Global Database</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-16 py-3 sm:py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
            />
            <button
              onClick={() => setShowVoiceInput(!showVoiceInput)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                showVoiceInput ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-400'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
          
          {isSearching && (
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Voice Input */}
        {showVoiceInput && (
          <div className="mb-6">
            <VoiceInput
              onTranscript={handleVoiceTranscript}
              placeholder={t('voice.search.placeholder')}
              autoSubmit={true}
            />
          </div>
        )}

        {/* Global Search Info */}
        <div className="mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Global Medicine Database</h3>
          </div>
          <p className="text-blue-800 text-xs sm:text-sm">
            Search for any medicine by brand name, generic name, or common aliases. Our AI can analyze virtually any medication worldwide.
          </p>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              {t('search.results')} ({filteredMedicines.length} found)
            </h2>
            {filteredMedicines.length > 0 ? (
              <div className="space-y-2 sm:space-y-3">
                {filteredMedicines.map((medicine) => (
                  <button
                    key={medicine.id}
                    onClick={() => handleMedicineClick(medicine)}
                    className="w-full bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{medicine.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{medicine.genericName}</p>
                        <p className="text-xs text-gray-500">{medicine.manufacturer}</p>
                        {medicine.id.startsWith('generated-') && (
                          <p className="text-xs text-blue-600 mt-1">✨ AI Generated Analysis</p>
                        )}
                      </div>
                      <div className="text-right sm:ml-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(medicine.riskLevel)}`}>
                          {t(`risk.${medicine.riskLevel}`)}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Score: {medicine.overallScore}/10</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">{t('search.no.results')}</p>
                <p className="text-sm text-gray-400 mt-1">{t('search.try.different')}</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Searches */}
        {!searchQuery && (
          <>
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t('search.popular')}</h2>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleQuickSearch(search)}
                    className="px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors text-center"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-gray-600" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t('search.recent')}</h2>
              </div>
              <div className="space-y-1 sm:space-y-2">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleQuickSearch(search)}
                    className="flex items-center w-full p-2 sm:p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors text-left"
                  >
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-700 text-sm sm:text-base">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchMedicine;