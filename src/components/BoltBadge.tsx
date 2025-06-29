import React from 'react';

interface BoltBadgeProps {
  variant?: 'black' | 'white' | 'text';
  className?: string;
}

function BoltBadge({ variant = 'black', className = '' }: BoltBadgeProps) {
  const getImageSrc = () => {
    switch (variant) {
      case 'white':
        return '/white_circle_360x360.png';
      case 'text':
        return '/logotext_poweredby_360w.png';
      case 'black':
      default:
        return '/black_circle_360x360.png';
    }
  };

  const getAltText = () => {
    switch (variant) {
      case 'text':
        return 'Powered by Bolt.new';
      default:
        return 'Made with Bolt.new';
    }
  };

  return (
    <a
      href="https://bolt.new/"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-transform hover:scale-105 ${className}`}
      title="Made with Bolt.new"
    >
      <img
        src={getImageSrc()}
        alt={getAltText()}
        className="w-8 h-8 sm:w-10 sm:h-10"
      />
    </a>
  );
}

export default BoltBadge;