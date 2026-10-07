import 'i18next';

import translationsEn from './i18n/translations/en';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translations';
    resources: {
      translations: typeof translationsEn;
    };
  }
}
