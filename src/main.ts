import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import ElementUI from "element-ui";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
