import { Vue, Component } from "vue-property-decorator";
import Vuex from "vuex";
import {todos} from "./modules/todos";
import { otherTodo } from "./modules/otherTodo";
import Elems, { TodoState } from "./modules/types";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    otherTodo
  }
});
