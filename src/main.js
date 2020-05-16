import Vue from "vue";
import "@/core/plugins/axios";
import App from "@/App.vue";
import router from "@/core/router";
import store from "@/core/store";
import vuetify from "@/core/plugins/vuetify";
import i18n from "@/core/plugins/i18n";
import projectInit from "@/project/project-main-init";
import GlobalEnv from "@/core/constants/global-env";
import Tools from "@/core/plugins/tools";
import VueForceNextTick from "vue-force-next-tick";

Vue.use(VueForceNextTick);
Vue.config.productionTip = false;

// filters
import "@/core/filters/formatDate";

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

const moduleInits = require.context(
  "@/modules",
  true,
  /[A-Za-z0-9-_,\s]+\/module-main-init.js$/i
);

if (moduleInits.length > 0) {
  moduleInits.keys().forEach(key => {
    moduleInits(key).default(vue);
  });
}

window.vue = vue;

export default vue;
