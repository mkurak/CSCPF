import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const lowerFirstLetter = val => {
  return val.charAt(0).toLowerCase() + val.slice(1);
};

function loadLocaleMessages() {
  const locales = require.context(
    "@/core/locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const locales2 = require.context(
    "@/project/locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const moduleLocale = require.context(
    "@/modules",
    true,
    /[A-Za-z0-9-_,\s]+\/locales\/[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });

  locales2.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale].project = locales2(key);
    }
  });

  moduleLocale.keys().forEach(key => {
    const matchedModuleName = key.match(/([A-Za-z0-9-_]+)/i);
    const matchedLangName = key.match(/([A-Za-z0-9-_]+)\./i);

    const lang = matchedLangName[0].replace(".", "");
    const moduleName = matchedModuleName[0];

    messages[lang].modules = {};

    messages[lang].modules[lowerFirstLetter(moduleName)] = moduleLocale(key);
  });

  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "tr",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "tr",
  messages: loadLocaleMessages()
});
