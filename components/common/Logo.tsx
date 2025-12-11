import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const { t } = useLanguage();
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg',
  };

  return (
    <div
      className={`rounded-full bg-blue-700 text-white font-bold flex items-center justify-center
        ${sizeClasses[size]} ${className}`}
    >
      {t('app.logo_text')}
    </div>
  );
};

export default Logo;