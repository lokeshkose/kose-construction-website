import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import hindi from "../locales/hi.json";
import english from "../locales/en.json";

const resources = {
  hi: { common: hindi },
  en: { common: english },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Auto-detect language
  .init({
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'hi'], // Add more as needed
    detection: {
      order: ['path', 'localStorage', 'cookie', 'navigator'], // Preferred order of detection
      caches: ['localStorage', 'cookie'], // Store selection
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    resources
  });

export default i18n;
