import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context(
    "../locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const locales2 = require.context(
    "../project/integration/locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
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

  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "tr",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "tr",
  messages: loadLocaleMessages()
});
