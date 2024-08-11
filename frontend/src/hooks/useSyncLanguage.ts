import { useEffect, useContext } from 'react';
import { LanguageContext } from '../contexts/languageContext';
import i18next from 'i18next';

const useSyncLanguage = () => {
  const language = useContext(LanguageContext);

  useEffect(() => {
    if (i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [language]);
};

export default useSyncLanguage;
