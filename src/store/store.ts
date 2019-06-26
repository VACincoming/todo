import { Vue, Component } from "vue-property-decorator";
import Vuex from "vuex";
import elems from './modules/types'
import { todos } from "./modules/todos";
import { otherTodo } from "./modules/otherTodo";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    otherTodo
  }
});
