module.exports = {
  pluginOptions: {
    i18n: {
      locale: "tr",
      fallbackLocale: "tr",
      localeDir: "locales",
      enableInSFC: true
    },
    vuetify: {
      current: "tr"
    }
  },
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 4000,
    hot: true,
    disableHostCheck: true
  }
};
