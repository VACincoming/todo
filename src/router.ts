import Vue from "vue";
import Router from "vue-router";
import Todo from "./pages/Todo.vue";

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
      component: () => import("./pages/ProgressBar.vue")
    },
    {
      path: "/todo/prevdaytodo",
      component: () => import("./pages/PrevDayTodo.vue")
    },
    {
      path: "/todo/nextdaytodo",
      component: () => import("./pages/NextDayTodo.vue")
    },
    {
    path: "/",
    component: () => import ("./pages/HomePage.vue")
    }
  ]
});
