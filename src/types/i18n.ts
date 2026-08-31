import type en from '../i18n/locales/en.json'

// Derive the translation type from the English locale file (source of truth)
export type TranslationKeys = typeof en

// Augment react-i18next to provide typed t() function
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: TranslationKeys
    }
  }
}
