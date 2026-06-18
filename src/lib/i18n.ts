import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      'nav.school': 'L\'École',
      'nav.schools': 'Les Écoles',
      'nav.programs': 'Programmes',
      'nav.admissions': 'Admissions',
      'nav.alumni': 'Alumni',
      'nav.contact': 'Contact',
      'hero.title': "L'école supérieure qui fait la différence.",
      'hero.tagline': 'De Meknès au monde — votre diplôme franco-marocain d\'excellence.'
    }
  },
  en: {
    translation: {
      'nav.school': 'The School',
      'nav.schools': 'Our Schools',
      'nav.programs': 'Programs',
      'nav.admissions': 'Admissions',
      'nav.alumni': 'Alumni',
      'nav.contact': 'Contact',
      'hero.title': "The graduate school that makes a difference.",
      'hero.tagline': 'From Meknes to the world — your excellence Franco-Moroccan degree.'
    }
  },
  ar: {
    translation: {
      'nav.school': 'المدرسة',
      'nav.schools': 'المدارس',
      'nav.programs': 'البرامج',
      'nav.admissions': 'التسجيل',
      'nav.alumni': 'الخريجون',
      'nav.contact': 'اتصل بنا',
      'hero.title': "المدرسة العليا التي تصنع الفارق.",
      'hero.tagline': 'من مكناس إلى العالم — دبلوم فرنسي مغربي متميز.'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false }
});

export default i18n;
