import React, { useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';
import { useLanguage } from '../contexts/LanguageContext';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  className?: string;
  autoSubmit?: boolean;
}

function VoiceInput({ onTranscript, placeholder = "Tap to speak...", className = "", autoSubmit = false }: VoiceInputProps) {
  const { isListening, transcript, startListening, stopListening, isSupported, clearTranscript } = useVoice();
  const { t } = useLanguage();

  useEffect(() => {
    if (transcript && autoSubmit) {
      onTranscript(transcript);
      clearTranscript();
    }
  }, [transcript, autoSubmit, onTranscript, clearTranscript]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      if (transcript && !autoSubmit) {
        onTranscript(transcript);
        clearTranscript();
      }
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={`flex items-center justify-center p-4 bg-gray-100 rounded-lg ${className}`}>
        <VolumeX className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-sm text-gray-500">Voice input not supported</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleVoiceToggle}
        className={`flex items-center justify-center w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
          isListening
            ? 'border-red-400 bg-red-50 text-red-600 animate-pulse'
            : 'border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100'
        }`}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
            <span className="font-medium text-sm sm:text-base">{t('voice.listening')}</span>
          </>
        ) : (
          <>
            <Mic className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
            <span className="font-medium text-sm sm:text-base">{placeholder}</span>
          </>
        )}
      </button>
      
      {transcript && (
        <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">{t('voice.transcript')}:</span>
            {!autoSubmit && (
              <button
                onClick={() => {
                  onTranscript(transcript);
                  clearTranscript();
                }}
                className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                {t('voice.use')}
              </button>
            )}
          </div>
          <p className="text-gray-900 text-sm sm:text-base">{transcript}</p>
        </div>
      )}
      
      {isListening && (
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute top-0 w-4 h-4 bg-red-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
}

export default VoiceInput;