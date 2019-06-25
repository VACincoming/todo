import Vue from "vue";
import Router from "vue-router";
import Todo from "./Router/pages/Todo.vue";

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
      component: () => import("@/Router/pages/ProgressBar.vue")
    },
    {
      path: "/",
      component: () => import("@/Router/pages/HomePage.vue")
    },
    {
      path: "/todo/prevdaytodo",
      component: () => import("@/Router/pages/PrevDayTodo.vue")
    },
    {
      path: "/todo/nextdaytodo",
      component: () => import("@/Router/pages/NextDayTodo.vue")
    }
  ]
});
