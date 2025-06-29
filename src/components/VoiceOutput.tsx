import React from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';
import { useLanguage } from '../contexts/LanguageContext';

interface VoiceOutputProps {
  text: string;
  className?: string;
  variant?: 'button' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

function VoiceOutput({ text, className = "", variant = 'button', size = 'md' }: VoiceOutputProps) {
  const { speak, isSpeaking, isSupported } = useVoice();
  const { t } = useLanguage();

  const handleSpeak = () => {
    if (text) {
      speak(text);
    }
  };

  if (!isSupported) {
    return null;
  }

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleSpeak}
        disabled={!text || isSpeaking}
        className={`${sizeClasses[size]} rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
        title={isSpeaking ? t('voice.speaking') : t('voice.speak')}
      >
        {isSpeaking ? (
          <Pause className={iconSizes[size]} />
        ) : (
          <Volume2 className={iconSizes[size]} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleSpeak}
      disabled={!text || isSpeaking}
      className={`flex items-center ${sizeClasses[size]} bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isSpeaking ? (
        <>
          <Pause className={`${iconSizes[size]} mr-2`} />
          <span>{t('voice.speaking')}</span>
        </>
      ) : (
        <>
          <Volume2 className={`${iconSizes[size]} mr-2`} />
          <span>{t('voice.speak')}</span>
        </>
      )}
    </button>
  );
}

export default VoiceOutput;