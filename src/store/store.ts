import { Vue, Component } from "vue-property-decorator";
import Vuex from "vuex";
import { todos } from "./modules/todos";
import { otherTodo } from "./modules/otherTodo";
import Elems, { TodoState } from "./modules/types";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    otherTodo
  },
  state: {
    isInSearch: false
  },
  actions: {
    DeleteItem({ commit }, id: number) {
      const idx = this.state.todos.oldElems.findIndex(
        (el: any) => el.id === id
      );
      const newElems = [
        ...this.state.todos.oldElems.slice(0, idx),
        ...this.state.todos.oldElems.slice(idx + 1)
      ];
      commit("setDeleteItem", newElems);
    },
    Search({ commit }, payload) {
      commit("setSearch", payload);
    }
  },
  mutations: {
    setDeleteItem(state, elems: Elems) {
      state.todos.elems = elems;
      state.todos.oldElems = elems;
      state.isInSearch = false;
    },
    setSearch(state, payload) {
      if (payload.key2 === false) {
        state.todos.elems = state.oldElems;
      }
      state.todos.elems = payload.key1;
      state.isInSearch = payload.key2;
    }
  }
});
