import { createContext, useContext, useState, useCallback } from 'react';
import { translations, languages } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [langCode, setLangCode] = useState(() => {
    return localStorage.getItem('one_vote_lang') || 'en';
  });

  const setLanguage = useCallback((code) => {
    setLangCode(code);
    localStorage.setItem('one_vote_lang', code);
  }, []);

  const t = useCallback((key) => {
    const dict = translations[langCode] || translations['en'];
    return dict[key] || translations['en'][key] || key;
  }, [langCode]);

  const currentLanguage = languages.find(l => l.code === langCode) || languages[0];

  return (
    <LanguageContext.Provider value={{ langCode, setLanguage, t, currentLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
