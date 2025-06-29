import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Heart, Brain, LucideKey as Kidney, Clover as Liver, Shield, Info, ChevronDown, ChevronUp, Star, TrendingDown, Leaf, Sun, Moon, Clock, Droplets } from 'lucide-react';
import VoiceOutput from './VoiceOutput';
import { useLanguage } from '../contexts/LanguageContext';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
  overallScore: number;
}

interface MedicineAnalysisProps {
  medicine: Medicine;
  onBack: () => void;
}

interface OrganRisk {
  organ: string;
  icon: React.ReactNode;
  risk: 'low' | 'moderate' | 'high' | 'critical';
  score: number;
  description: string;
  effects: string[];
}

interface Alternative {
  name: string;
  genericName: string;
  safetyScore: number;
  advantages: string[];
  commonUse: string;
}

interface AyurvedicAlternative {
  name: string;
  sanskritName: string;
  botanicalName: string;
  safetyScore: number;
  type: 'ayurvedic' | 'herbal' | 'homeopathic';
  benefits: string[];
  preparation: string;
  dosage: string;
  precautions: string[];
  bestTime: string;
  duration: string;
  rasa: string; // Taste
  virya: string; // Potency
  vipaka: string; // Post-digestive effect
}

function MedicineAnalysis({ medicine, onBack }: MedicineAnalysisProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'organs' | 'alternatives' | 'ayurvedic' | 'education'>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const { t } = useLanguage();

  // Mock data based on medicine type
  const getAnalysisData = () => {
    if (medicine.name === 'Paracetamol' || medicine.name === 'Crocin' || medicine.genericName === 'Acetaminophen') {
      return {
        organRisks: [
          {
            organ: 'Liver',
            icon: <Liver className="w-5 h-5" />,
            risk: 'high' as const,
            score: 4.2,
            description: 'High doses can cause severe liver damage',
            effects: ['Hepatotoxicity with overdose', 'Liver enzyme elevation', 'Potential liver failure in extreme cases']
          },
          {
            organ: 'Kidneys',
            icon: <Kidney className="w-5 h-5" />,
            risk: 'moderate' as const,
            score: 6.8,
            description: 'Long-term use may affect kidney function',
            effects: ['Chronic kidney disease risk', 'Reduced kidney function', 'Electrolyte imbalances']
          },
          {
            organ: 'Heart',
            icon: <Heart className="w-5 h-5" />,
            risk: 'low' as const,
            score: 8.5,
            description: 'Generally safe for cardiovascular system',
            effects: ['Minimal cardiovascular effects', 'Safe for heart patients']
          }
        ],
        alternatives: [
          {
            name: 'Ibuprofen',
            genericName: 'Ibuprofen',
            safetyScore: 6.1,
            advantages: ['Better anti-inflammatory action', 'Effective for muscle pain'],
            commonUse: 'Pain and inflammation relief'
          },
          {
            name: 'Aspirin',
            genericName: 'Acetylsalicylic acid',
            safetyScore: 7.8,
            advantages: ['Cardiovascular benefits', 'Anti-platelet effects'],
            commonUse: 'Pain relief and heart protection'
          }
        ],
        ayurvedicAlternatives: [
          {
            name: 'Willow Bark',
            sanskritName: 'Vetasa Tvak',
            botanicalName: 'Salix alba',
            safetyScore: 8.5,
            type: 'herbal' as const,
            benefits: ['Natural pain relief', 'Anti-inflammatory properties', 'Fever reduction', 'Gentle on stomach'],
            preparation: 'Decoction of dried bark or standardized extract',
            dosage: '1-2 grams of dried bark powder twice daily or 120-240mg extract',
            precautions: ['Avoid if allergic to aspirin', 'Not for children under 16', 'Consult doctor if on blood thinners'],
            bestTime: 'After meals to prevent stomach irritation',
            duration: 'Maximum 7-10 days for acute pain',
            rasa: 'Kashaya (Astringent), Tikta (Bitter)',
            virya: 'Sheeta (Cold)',
            vipaka: 'Katu (Pungent)'
          },
          {
            name: 'Turmeric',
            sanskritName: 'Haridra',
            botanicalName: 'Curcuma longa',
            safetyScore: 9.2,
            type: 'ayurvedic' as const,
            benefits: ['Powerful anti-inflammatory', 'Natural pain reliever', 'Liver protective', 'Antioxidant properties'],
            preparation: 'Golden milk, turmeric paste, or curcumin supplements',
            dosage: '1-3 grams daily with black pepper for absorption',
            precautions: ['May increase bleeding risk', 'Avoid before surgery', 'Can interact with diabetes medications'],
            bestTime: 'With meals, preferably with warm milk and black pepper',
            duration: 'Safe for long-term use in culinary amounts',
            rasa: 'Tikta (Bitter), Katu (Pungent)',
            virya: 'Ushna (Hot)',
            vipaka: 'Katu (Pungent)'
          },
          {
            name: 'Ginger',
            sanskritName: 'Ardraka',
            botanicalName: 'Zingiber officinale',
            safetyScore: 8.8,
            type: 'ayurvedic' as const,
            benefits: ['Anti-inflammatory', 'Pain relief', 'Digestive aid', 'Nausea relief'],
            preparation: 'Fresh ginger tea, dried powder, or standardized extract',
            dosage: '1-4 grams daily of fresh ginger or 250mg extract',
            precautions: ['May increase bleeding', 'Avoid with gallstones', 'Can interact with blood thinners'],
            bestTime: 'Morning on empty stomach or 30 minutes before meals',
            duration: 'Safe for daily use in moderate amounts',
            rasa: 'Katu (Pungent)',
            virya: 'Ushna (Hot)',
            vipaka: 'Madhura (Sweet)'
          },
          {
            name: 'Boswellia',
            sanskritName: 'Shallaki',
            botanicalName: 'Boswellia serrata',
            safetyScore: 8.7,
            type: 'ayurvedic' as const,
            benefits: ['Joint pain relief', 'Anti-inflammatory', 'Cartilage protection', 'Respiratory support'],
            preparation: 'Standardized extract or resin powder',
            dosage: '300-500mg extract twice daily or 1-2g powder',
            precautions: ['May cause stomach upset', 'Avoid during pregnancy', 'Monitor if on anti-inflammatory drugs'],
            bestTime: 'Between meals for better absorption',
            duration: '2-3 months for chronic conditions',
            rasa: 'Tikta (Bitter), Katu (Pungent)',
            virya: 'Ushna (Hot)',
            vipaka: 'Katu (Pungent)'
          },
          {
            name: 'Ashwagandha',
            sanskritName: 'Ashwagandha',
            botanicalName: 'Withania somnifera',
            safetyScore: 8.9,
            type: 'ayurvedic' as const,
            benefits: ['Stress-related pain relief', 'Anti-inflammatory', 'Muscle recovery', 'Sleep improvement'],
            preparation: 'Root powder with warm milk or water, or standardized extract',
            dosage: '1-6 grams powder daily or 300-500mg extract',
            precautions: ['Avoid during pregnancy', 'May interact with immunosuppressants', 'Can affect thyroid medications'],
            bestTime: 'Evening with warm milk for sleep, morning for energy',
            duration: '3-6 months for optimal benefits',
            rasa: 'Tikta (Bitter), Katu (Pungent), Madhura (Sweet)',
            virya: 'Ushna (Hot)',
            vipaka: 'Madhura (Sweet)'
          }
        ]
      };
    } else if (medicine.name === 'Omeprazole' || medicine.name === 'Omez') {
      return {
        organRisks: [
          {
            organ: 'Stomach',
            icon: <Heart className="w-5 h-5" />,
            risk: 'low' as const,
            score: 8.2,
            description: 'Effective for acid reduction',
            effects: ['Reduced stomach acid', 'Healing of ulcers']
          },
          {
            organ: 'Kidneys',
            icon: <Kidney className="w-5 h-5" />,
            risk: 'moderate' as const,
            score: 7.1,
            description: 'Long-term use may affect kidney function',
            effects: ['Potential kidney disease', 'Electrolyte imbalances']
          }
        ],
        alternatives: [
          {
            name: 'Ranitidine',
            genericName: 'Ranitidine',
            safetyScore: 6.8,
            advantages: ['Different mechanism', 'Shorter duration'],
            commonUse: 'Acid reflux treatment'
          }
        ],
        ayurvedicAlternatives: [
          {
            name: 'Licorice Root',
            sanskritName: 'Yashtimadhu',
            botanicalName: 'Glycyrrhiza glabra',
            safetyScore: 8.4,
            type: 'ayurvedic' as const,
            benefits: ['Soothes stomach lining', 'Reduces acid production', 'Heals ulcers', 'Anti-inflammatory'],
            preparation: 'Decoction, powder, or DGL (deglycyrrhizinated) supplements',
            dosage: '1-2 grams powder twice daily or 380mg DGL before meals',
            precautions: ['Avoid with high blood pressure', 'Can cause potassium loss', 'Limit use to 6 weeks'],
            bestTime: '30 minutes before meals',
            duration: 'Maximum 6 weeks continuous use',
            rasa: 'Madhura (Sweet)',
            virya: 'Sheeta (Cold)',
            vipaka: 'Madhura (Sweet)'
          },
          {
            name: 'Aloe Vera',
            sanskritName: 'Kumari',
            botanicalName: 'Aloe barbadensis',
            safetyScore: 8.1,
            type: 'ayurvedic' as const,
            benefits: ['Soothes digestive tract', 'Reduces inflammation', 'Promotes healing', 'Cooling effect'],
            preparation: 'Fresh gel or juice (inner leaf only)',
            dosage: '1-2 tablespoons of gel twice daily',
            precautions: ['Use only inner gel', 'Avoid latex part', 'May cause diarrhea in excess'],
            bestTime: 'Empty stomach, 30 minutes before meals',
            duration: '2-4 weeks for acute conditions',
            rasa: 'Tikta (Bitter), Madhura (Sweet)',
            virya: 'Sheeta (Cold)',
            vipaka: 'Madhura (Sweet)'
          },
          {
            name: 'Amla',
            sanskritName: 'Amalaki',
            botanicalName: 'Phyllanthus emblica',
            safetyScore: 9.1,
            type: 'ayurvedic' as const,
            benefits: ['Natural antacid', 'Vitamin C rich', 'Digestive tonic', 'Liver protective'],
            preparation: 'Fresh juice, powder, or dried fruit',
            dosage: '1-2 teaspoons powder twice daily or 20ml fresh juice',
            precautions: ['Generally safe', 'May enhance iron absorption', 'Avoid with kidney stones'],
            bestTime: 'Morning on empty stomach',
            duration: 'Safe for long-term daily use',
            rasa: 'Amla (Sour), Madhura (Sweet), Tikta (Bitter), Katu (Pungent), Kashaya (Astringent)',
            virya: 'Sheeta (Cold)',
            vipaka: 'Madhura (Sweet)'
          },
          {
            name: 'Fennel Seeds',
            sanskritName: 'Shatapushpa',
            botanicalName: 'Foeniculum vulgare',
            safetyScore: 8.9,
            type: 'ayurvedic' as const,
            benefits: ['Digestive aid', 'Reduces gas', 'Soothes stomach', 'Fresh breath'],
            preparation: 'Chew seeds after meals or make tea',
            dosage: '1 teaspoon seeds after meals or 1 cup tea',
            precautions: ['Generally safe', 'Avoid in pregnancy (large amounts)', 'May interact with blood thinners'],
            bestTime: 'After meals for digestion',
            duration: 'Safe for daily use',
            rasa: 'Madhura (Sweet), Katu (Pungent)',
            virya: 'Sheeta (Cold)',
            vipaka: 'Madhura (Sweet)'
          }
        ]
      };
    }
    
    // Default data for other medicines
    return {
      organRisks: [
        {
          organ: 'Heart',
          icon: <Heart className="w-5 h-5" />,
          risk: 'moderate' as const,
          score: 6.5,
          description: 'May affect cardiovascular system',
          effects: ['Increased blood pressure', 'Heart rhythm changes']
        },
        {
          organ: 'Liver',
          icon: <Liver className="w-5 h-5" />,
          risk: 'low' as const,
          score: 8.2,
          description: 'Generally safe for liver',
          effects: ['Minimal liver impact']
        }
      ],
      alternatives: [
        {
          name: 'Natural Alternative',
          genericName: 'Herbal supplement',
          safetyScore: 9.2,
          advantages: ['Natural ingredients', 'Fewer side effects'],
          commonUse: 'Alternative treatment'
        }
      ],
      ayurvedicAlternatives: [
        {
          name: 'Triphala',
          sanskritName: 'Triphala',
          botanicalName: 'Terminalia chebula, T. bellirica, Phyllanthus emblica',
          safetyScore: 9.0,
          type: 'ayurvedic' as const,
          benefits: ['General health tonic', 'Digestive support', 'Detoxification', 'Antioxidant'],
          preparation: 'Powder mixed with warm water or honey',
          dosage: '1-2 teaspoons powder before bed',
          precautions: ['Start with small dose', 'May cause loose stools initially', 'Avoid during pregnancy'],
          bestTime: 'Before bed on empty stomach',
          duration: 'Safe for long-term use',
          rasa: 'Pancha Rasa (Five tastes except Lavana)',
          virya: 'Sheeta (Cold)',
          vipaka: 'Madhura (Sweet)'
        },
        {
          name: 'Brahmi',
          sanskritName: 'Brahmi',
          botanicalName: 'Bacopa monnieri',
          safetyScore: 8.8,
          type: 'ayurvedic' as const,
          benefits: ['Mental clarity', 'Stress reduction', 'Memory enhancement', 'Nervous system support'],
          preparation: 'Powder with ghee or honey, or standardized extract',
          dosage: '1-2 grams powder twice daily or 300mg extract',
          precautions: ['May cause drowsiness initially', 'Can interact with thyroid medications', 'Avoid with sedatives'],
          bestTime: 'Morning and evening with meals',
          duration: '3-6 months for cognitive benefits',
          rasa: 'Tikta (Bitter), Kashaya (Astringent)',
          virya: 'Sheeta (Cold)',
          vipaka: 'Madhura (Sweet)'
        }
      ]
    };
  };

  const data = getAnalysisData();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-700 bg-green-100 border-green-300';
      case 'moderate': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'high': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'critical': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getOverallRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ayurvedic': return <Leaf className="w-4 h-4 text-green-600" />;
      case 'herbal': return <Leaf className="w-4 h-4 text-emerald-600" />;
      case 'homeopathic': return <Droplets className="w-4 h-4 text-blue-600" />;
      default: return <Leaf className="w-4 h-4 text-green-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ayurvedic': return 'text-green-700 bg-green-50 border-green-200';
      case 'herbal': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'homeopathic': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-green-700 bg-green-50 border-green-200';
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Generate voice-friendly summary
  const getVoiceSummary = () => {
    const riskText = medicine.riskLevel === 'safe' ? 'safe to use' : 
                    medicine.riskLevel === 'moderate' ? 'moderately risky' :
                    medicine.riskLevel === 'high' ? 'high risk' : 'critically risky';
    
    return `${medicine.name}, also known as ${medicine.genericName}, has a safety score of ${medicine.overallScore} out of 10. This medicine is ${riskText}. It is manufactured by ${medicine.manufacturer}.`;
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return `Medicine overview: ${getVoiceSummary()} The overall safety score is based on clinical data, side effects, and organ impact analysis.`;
      case 'organs':
        return `Organ impact analysis: ${data.organRisks.map(organ => 
          `${organ.organ} has ${organ.risk} risk with score ${organ.score} out of 10. ${organ.description}`
        ).join('. ')}`;
      case 'alternatives':
        return `Alternative medicines: ${data.alternatives.map(alt => 
          `${alt.name} with safety score ${alt.safetyScore} out of 10, commonly used for ${alt.commonUse}`
        ).join('. ')}`;
      case 'ayurvedic':
        return `Ayurvedic and herbal alternatives: ${data.ayurvedicAlternatives.map(alt => 
          `${alt.name}, Sanskrit name ${alt.sanskritName}, botanical name ${alt.botanicalName}. Safety score ${alt.safetyScore} out of 10. Benefits include: ${alt.benefits.join(', ')}`
        ).join('. ')}`;
      case 'education':
        return `Educational information about ${medicine.name}: This medication works by targeting specific pathways in your body. Always take as prescribed, do not exceed recommended dose, and consult your doctor if you experience side effects.`;
      default:
        return getVoiceSummary();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-gray-900">{medicine.name}</h1>
                <p className="text-sm text-gray-600">{medicine.genericName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <VoiceOutput 
                text={getTabContent()}
                variant="button"
                size="sm"
                className="text-sm"
              />
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getOverallRiskColor(medicine.riskLevel)}`}>
                {medicine.riskLevel.charAt(0).toUpperCase() + medicine.riskLevel.slice(1)} Risk
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'overview', label: t('analysis.overview') },
              { id: 'organs', label: t('analysis.organs') },
              { id: 'alternatives', label: t('analysis.alternatives') },
              { id: 'ayurvedic', label: 'Ayurvedic & Herbal' },
              { id: 'education', label: t('analysis.education') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {medicine.overallScore}/10
                  </div>
                  <p className="text-gray-600 mb-4">{t('analysis.safety.score')}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${medicine.overallScore * 10}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t('analysis.based.on')}
                  </p>
                </div>
                <VoiceOutput 
                  text={getVoiceSummary()}
                  variant="icon"
                  size="lg"
                  className="ml-4"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{t('analysis.safety.rating')}</p>
                <p className="font-semibold text-gray-900">{medicine.riskLevel.charAt(0).toUpperCase() + medicine.riskLevel.slice(1)}</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{t('analysis.organ.impact')}</p>
                <p className="font-semibold text-gray-900">{data.organRisks.length} Systems</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{t('analysis.alternatives')}</p>
                <p className="font-semibold text-gray-900">{data.alternatives.length} Options</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <Leaf className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Natural Options</p>
                <p className="font-semibold text-gray-900">{data.ayurvedicAlternatives.length} Herbs</p>
              </div>
            </div>

            {/* Key Warnings */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">{t('analysis.safety.info')}</h3>
                    <ul className="text-amber-800 space-y-1 text-sm">
                      <li>• {t('analysis.follow.dosage')}</li>
                      <li>• {t('analysis.consult.conditions')}</li>
                      <li>• {t('analysis.max.dose')}</li>
                      <li>• {t('analysis.inform.doctor')}</li>
                    </ul>
                  </div>
                </div>
                <VoiceOutput 
                  text={`Important safety information: Always follow prescribed dosage instructions. Consult your doctor if you have liver or kidney conditions. Do not exceed maximum daily dose. Inform your healthcare provider about other medications.`}
                  variant="icon"
                  size="md"
                  className="ml-4"
                />
              </div>
            </div>
          </div>
        )}

        {/* Organ Impact Tab */}
        {activeTab === 'organs' && (
          <div className="space-y-4">
            {data.organRisks.map((organ, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleSection(`organ-${index}`)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getRiskColor(organ.risk).replace('text-', 'text-').replace('bg-', 'bg-').replace('border-', 'border-')}`}>
                        {organ.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{organ.organ}</h3>
                        <p className="text-sm text-gray-600">{organ.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <VoiceOutput 
                        text={`${organ.organ} impact: ${organ.risk} risk with score ${organ.score} out of 10. ${organ.description}. Effects include: ${organ.effects.join(', ')}`}
                        variant="icon"
                        size="sm"
                      />
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(organ.risk)}`}>
                          {organ.risk.charAt(0).toUpperCase() + organ.risk.slice(1)} Risk
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Score: {organ.score}/10</p>
                      </div>
                      {expandedSections.has(`organ-${index}`) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                
                {expandedSections.has(`organ-${index}`) && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-3">{t('analysis.potential.effects')}:</h4>
                    <ul className="space-y-2">
                      {organ.effects.map((effect, effectIndex) => (
                        <li key={effectIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Alternatives Tab */}
        {activeTab === 'alternatives' && (
          <div className="space-y-4">
            {data.alternatives.map((alternative, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{alternative.name}</h3>
                    <p className="text-gray-600 text-sm">{alternative.genericName}</p>
                    <p className="text-gray-500 text-sm mt-1">{alternative.commonUse}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <VoiceOutput 
                      text={`Alternative medicine: ${alternative.name}, also known as ${alternative.genericName}. Safety score ${alternative.safetyScore} out of 10. Commonly used for ${alternative.commonUse}. Advantages include: ${alternative.advantages.join(', ')}`}
                      variant="icon"
                      size="sm"
                    />
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{alternative.safetyScore}/10</span>
                      </div>
                      <p className="text-xs text-gray-600">{t('analysis.safety.score')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('analysis.advantages')}:</h4>
                  <ul className="space-y-1">
                    {alternative.advantages.map((advantage, advIndex) => (
                      <li key={advIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">{t('analysis.consult.provider')}</h3>
                    <p className="text-blue-800 text-sm">
                      {t('analysis.discuss.alternatives')}
                    </p>
                  </div>
                </div>
                <VoiceOutput 
                  text="Always discuss alternative medications with your doctor or pharmacist before making any changes to your treatment plan. They can provide personalized recommendations based on your medical history and current conditions."
                  variant="icon"
                  size="md"
                  className="ml-4"
                />
              </div>
            </div>
          </div>
        )}

        {/* Ayurvedic & Herbal Tab */}
        {activeTab === 'ayurvedic' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Leaf className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-green-900">Traditional & Natural Alternatives</h2>
              </div>
              <p className="text-green-800 text-sm">
                These Ayurvedic and herbal alternatives have been used traditionally for similar conditions. Always consult with a qualified practitioner before use.
              </p>
            </div>

            <div className="space-y-6">
              {data.ayurvedicAlternatives.map((herb, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{herb.name}</h3>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(herb.type)}`}>
                            {getTypeIcon(herb.type)}
                            <span>{herb.type.charAt(0).toUpperCase() + herb.type.slice(1)}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Sanskrit:</span> {herb.sanskritName}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">Botanical:</span> <em>{herb.botanicalName}</em>
                        </p>
                        
                        {/* Ayurvedic Properties */}
                        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-amber-50 rounded-lg">
                          <div className="text-center">
                            <p className="text-xs font-medium text-amber-800">Rasa (Taste)</p>
                            <p className="text-sm text-amber-900">{herb.rasa}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-medium text-amber-800">Virya (Potency)</p>
                            <p className="text-sm text-amber-900">{herb.virya}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-medium text-amber-800">Vipaka (Effect)</p>
                            <p className="text-sm text-amber-900">{herb.vipaka}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        <VoiceOutput 
                          text={`${herb.name}, Sanskrit name ${herb.sanskritName}, botanical name ${herb.botanicalName}. This is a ${herb.type} medicine with safety score ${herb.safetyScore} out of 10. Benefits include: ${herb.benefits.join(', ')}. Preparation: ${herb.preparation}. Dosage: ${herb.dosage}. Best time: ${herb.bestTime}.`}
                          variant="icon"
                          size="sm"
                        />
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-green-500 fill-current" />
                            <span className="font-semibold text-gray-900">{herb.safetyScore}/10</span>
                          </div>
                          <p className="text-xs text-gray-600">Safety Score</p>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Heart className="w-4 h-4 text-green-600 mr-2" />
                        Benefits
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {herb.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Usage Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1 flex items-center">
                            <Droplets className="w-4 h-4 text-blue-600 mr-2" />
                            Preparation
                          </h5>
                          <p className="text-sm text-gray-700">{herb.preparation}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1 flex items-center">
                            <Clock className="w-4 h-4 text-purple-600 mr-2" />
                            Dosage
                          </h5>
                          <p className="text-sm text-gray-700">{herb.dosage}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1 flex items-center">
                            <Sun className="w-4 h-4 text-yellow-600 mr-2" />
                            Best Time
                          </h5>
                          <p className="text-sm text-gray-700">{herb.bestTime}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1 flex items-center">
                            <Moon className="w-4 h-4 text-indigo-600 mr-2" />
                            Duration
                          </h5>
                          <p className="text-sm text-gray-700">{herb.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Precautions */}
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h5 className="font-medium text-red-900 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                        Precautions
                      </h5>
                      <ul className="space-y-1">
                        {herb.precautions.map((precaution, precautionIndex) => (
                          <li key={precautionIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-red-800 text-sm">{precaution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Disclaimer */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Important Disclaimer</h3>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Consult qualified Ayurvedic practitioner before use</li>
                      <li>• Do not stop prescribed medications without medical supervision</li>
                      <li>• Start with smaller doses to test tolerance</li>
                      <li>• Inform your doctor about any herbal supplements you're taking</li>
                      <li>• Quality and purity of herbal products may vary</li>
                    </ul>
                  </div>
                </div>
                <VoiceOutput 
                  text="Important disclaimer for traditional medicines: Always consult a qualified Ayurvedic practitioner before use. Do not stop prescribed medications without medical supervision. Start with smaller doses to test tolerance. Inform your doctor about any herbal supplements. Quality and purity of herbal products may vary."
                  variant="icon"
                  size="md"
                  className="ml-4"
                />
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{t('analysis.understanding')} {medicine.name}</h3>
                <VoiceOutput 
                  text={getTabContent()}
                  variant="icon"
                  size="lg"
                />
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {medicine.name} ({medicine.genericName}) is a commonly used medication. Understanding its effects on your body is crucial for safe usage.
                </p>
                
                <h4 className="font-semibold text-gray-900 mb-2">{t('analysis.how.works')}:</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This medication works by targeting specific pathways in your body to provide relief from symptoms. The active ingredient is processed by your liver and filtered by your kidneys.
                </p>
                
                <h4 className="font-semibold text-gray-900 mb-2">{t('analysis.safe.usage')}:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                  <li>{t('analysis.take.prescribed')}</li>
                  <li>{t('analysis.not.exceed')}</li>
                  <li>{t('analysis.take.food')}</li>
                  <li>{t('analysis.stay.hydrated')}</li>
                  <li>{t('analysis.complete.course')}</li>
                </ul>
                
                <h4 className="font-semibold text-gray-900 mb-2">{t('analysis.contact.doctor')}:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('analysis.severe.effects')}</li>
                  <li>{t('analysis.symptoms.worsen')}</li>
                  <li>{t('analysis.drug.interactions')}</li>
                  <li>{t('analysis.combining.medications')}</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-3">{t('analysis.additional.resources')}</h3>
                  <div className="space-y-2">
                    <a href="#" className="block text-purple-700 hover:text-purple-800 text-sm underline">
                      FDA Drug Information Database
                    </a>
                    <a href="#" className="block text-purple-700 hover:text-purple-800 text-sm underline">
                      National Institute of Health Guidelines
                    </a>
                    <a href="#" className="block text-purple-700 hover:text-purple-800 text-sm underline">
                      Drug Interaction Checker
                    </a>
                    <a href="#" className="block text-purple-700 hover:text-purple-800 text-sm underline">
                      Ayurvedic Medicine Database
                    </a>
                  </div>
                </div>
                <VoiceOutput 
                  text="Additional resources are available including FDA Drug Information Database, National Institute of Health Guidelines, Drug Interaction Checker, and Ayurvedic Medicine Database for more detailed information."
                  variant="icon"
                  size="md"
                  className="ml-4"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicineAnalysis;