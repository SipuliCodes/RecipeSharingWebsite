import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import fi from './locales/fi/translation.json';
import sv from './locales/sv/translation.json';

const options: InitOptions = {
  lng: 'fi',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    fi: { translation: fi },
    sv: { translation: sv },
  },
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(options);

export default i18n;
