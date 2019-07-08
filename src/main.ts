import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import {i18n} from './i18n'


Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;



new Vue({
  el: "#app",
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
