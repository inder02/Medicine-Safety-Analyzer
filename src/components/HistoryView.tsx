import React, { useState } from 'react';
import { ArrowLeft, Clock, Camera, Search, Upload, Trash2, Calendar, Filter, AlertTriangle } from 'lucide-react';
import { useHistory } from '../hooks/useHistory';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Medicine } from '../types';

interface HistoryViewProps {
  onBack: () => void;
  onMedicineSelected: (medicine: Medicine) => void;
}

function HistoryView({ onBack, onMedicineSelected }: HistoryViewProps) {
  const { history, removeFromHistory, clearHistory } = useHistory();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'camera' | 'search' | 'upload'>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const getSearchTypeIcon = (type: string) => {
    switch (type) {
      case 'camera': return <Camera className="w-4 h-4" />;
      case 'search': return <Search className="w-4 h-4" />;
      case 'upload': return <Upload className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSearchTypeLabel = (type: string) => {
    switch (type) {
      case 'camera': return t('history.scanned');
      case 'search': return t('history.searched');
      case 'upload': return t('history.uploaded');
      default: return type;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(entry => entry.searchType === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{t('history.title')}</h1>
                <p className="text-sm text-gray-600">
                  {user ? `${user.name}'s medicine history` : 'Guest history'}
                </p>
              </div>
            </div>
            
            {history.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {history.length > 0 && (
          // Filter Tabs
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by type:</span>
            </div>
            <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'All', icon: <Clock className="w-4 h-4" /> },
                { id: 'camera', label: 'Scanned', icon: <Camera className="w-4 h-4" /> },
                { id: 'search', label: 'Searched', icon: <Search className="w-4 h-4" /> },
                { id: 'upload', label: 'Uploaded', icon: <Upload className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {getSearchTypeIcon(entry.searchType)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600">
                          {getSearchTypeLabel(entry.searchType)}
                        </span>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(entry.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {entry.medicine.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {entry.medicine.genericName}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {entry.medicine.manufacturer}
                      </p>
                      {entry.searchQuery && (
                        <p className="text-gray-500 text-xs mt-1">
                          Search: "{entry.searchQuery}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(entry.medicine.riskLevel)}`}>
                        {t(`risk.${entry.medicine.riskLevel}`)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Score: {entry.medicine.overallScore}/10
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => onMedicineSelected(entry.medicine)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Analysis
                    </button>
                    <button
                      onClick={() => removeFromHistory(entry.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t('history.empty')}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {t('history.empty.desc')}
            </p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Analyzing Medicines
            </button>
          </div>
        )}
      </div>

      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Clear History</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to clear all your medicine history? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  setShowClearConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryView;