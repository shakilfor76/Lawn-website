import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';
import { ROUTES } from '../../constants';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-[#EE1C25]">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        {/* Logo or App Name */}
        <div className="flex items-center mb-4 md:mb-0">
          <a href="/#" className="text-2xl font-bold text-gray-800">
            {t('app.name')}
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow flex justify-center mb-4 md:mb-0">
          <ul className="flex flex-wrap space-x-4">
            <li>
              <button
                onClick={() => navigate(ROUTES.HOME)}
                className="text-[#444444] hover:text-[#EE1C25] px-3 py-2 rounded-md font-medium transition-colors"
              >
                {t('nav.home')}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate(ROUTES.CALCULATOR)}
                className="text-[#444444] hover:text-[#EE1C25] px-3 py-2 rounded-md font-medium transition-colors"
              >
                {t('nav.calculator')}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate(ROUTES.APPLY_LOAN)}
                className="text-[#444444] hover:text-[#EE1C25] px-3 py-2 rounded-md font-medium transition-colors"
              >
                {t('nav.apply_loan')}
              </button>
            </li>
            {user && (
              <li>
                <button
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                  className="text-[#444444] hover:text-[#EE1C25] px-3 py-2 rounded-md font-medium transition-colors"
                >
                  {t('nav.dashboard')}
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Auth Buttons & Language Switcher */}
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border-2 border-[#E5E5E5] rounded-md px-3 py-2 text-sm text-[#444444] focus:border-[#EE1C25] focus:outline-none"
            aria-label={t('common.select_language')}
          >
            <option value={Language.EN}>English</option>
            <option value={Language.BN}>বাংলা</option>
          </select>

          {user ? (
            <Button onClick={logout} variant="secondary" size="sm">
              {t('nav.logout')}
            </Button>
          ) : (
            <>
              <Button onClick={() => navigate(ROUTES.LOGIN)} variant="outline" size="sm">
                {t('nav.login')}
              </Button>
              <Button onClick={() => navigate(ROUTES.REGISTER)} variant="primary" size="sm">
                {t('nav.register')}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;