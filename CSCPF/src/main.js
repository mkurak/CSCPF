import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import projectInit from "./project/integration/project-main-init";
import GlobalEnv from "./constants/global-env";
import Tools from "./plugins/tools";

Vue.config.productionTip = false;

// filters
import "./filters/formatDate";

const vue = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");

projectInit(vue);

let localeLang = localStorage.getItem(GlobalEnv.system.langKey);
if (!Tools.isNullOrEmpty(localeLang)) {
  vue.$i18n.locale = localeLang;
} else {
  vue.$i18n.locale = GlobalEnv.layout.lang.default;
}

export default vue;
