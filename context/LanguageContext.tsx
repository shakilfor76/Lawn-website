import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';
import { Language, LanguageContextType } from '../types';
import { defaultTranslations } from '../constants';

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(Language.BN);

  const t = useCallback(
    (key: string): string => {
      const translation = defaultTranslations[key];
      if (translation && translation[language]) {
        return translation[language];
      }
      return key; // Fallback to key if no translation found
    },
    [language],
  );

  const value = React.useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
