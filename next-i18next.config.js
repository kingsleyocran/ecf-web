const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
  },
  localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : '/locales',
};
