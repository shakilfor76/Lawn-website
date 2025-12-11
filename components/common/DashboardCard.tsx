import React from 'react';
import { ROUTES } from '../../constants';

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  label,
  path,
  onClick,
  className = '',
}) => {
  const navigate = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.hash = path;
    }
  };

  return (
    <button
      onClick={navigate}
      className={`flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md
        hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out
        text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}`}
      aria-label={label}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <span className="text-sm font-medium text-center">{label}</span>
    </button>
  );
};

export default DashboardCard;