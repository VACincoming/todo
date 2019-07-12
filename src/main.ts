import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import { i18n } from "./i18n";
import elementLocale from "element-ui/lib/locale/lang/en";

Vue.use(ElementUI, { locale: elementLocale });
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
