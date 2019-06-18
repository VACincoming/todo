import Vue from "vue";
import Router from "vue-router";
import Todo from "./components/Todo.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/todo",
      component: Todo
    },
    {
      path: "/progress",
      component: () => import("./components/ProgressBar.vue")
    },
    {
      path: "/todo/yesterday",
      component: () => import("./components/Yesterday.vue")
    },
    {
      path: "/todo/tomorrow",
      component: () => import("./components/Tomorrow.vue")
    },
    {
    path: "/",
    component: () => import ("./components/Home.vue")
    }
  ]
});
