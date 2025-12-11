import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface BottomNavigationBarProps {
  items: NavItem[];
  currentPath: string;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ items, currentPath }) => {
  const { t } = useLanguage();

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 md:hidden">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => {
          const isActive = currentPath === item.path || (currentPath === '/' && item.path === '#/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center px-4 py-2 text-xs font-medium rounded-md
                ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <span>{t(item.label)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;