import { Vue, Component } from "vue-property-decorator";
import Vuex from "vuex";
import todo from "./modules/todo";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 0,
    elems: [],
    oldElems: [],
    matches: false,
    isInSearch: false,
    alertMsg: false
  },
  mutations: {
    setList(state, task) {
      state.elems.push(task);
      state.oldElems = state.elems;
    },
    setReverseList(state, reverseList) {
      state.elems = reverseList;
    },
    setDeleteItem(state, elems) {
      state.elems = elems;
      state.oldElems = elems;
      state.isInSearch = false;
    },
    setSearch(state, payload) {
      if (payload.key2 === false) {
        state.elems = state.oldElems;
      }
      state.elems = payload.key1;
      state.isInSearch = payload.key2;
    },
    setNoMatches(state, flag) {
      state.matches = flag;
    },
    setEmptySearch(state, oldElems) {
      state.elems = oldElems;
    },
    setInit(state, correctData) {
      state.elems.push(correctData);
      state.oldElems = state.elems;
    },
    setAlert(state, flag) {
      state.alertMsg = flag;
    }
  },
  actions: {
    Alert({ commit }, flag) {
      commit("setAlert", flag);
    },
    noMatches({ commit }, flag) {
      commit("setNoMatches", flag);
    },
    async InitList({ commit }) {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + ++this.state.id
      ).then(response => response.json());
      const correctData = {
        id: data.id,
        label: data.title,
        done: data.completed
      };
      commit("setInit", correctData);
    },
    AddList({ commit }, task: Object) {
      commit("setList", task);
    },
    ReverseList({ commit }, state) {
      let reverseList = state.elems.reverse();
      commit("setReverseList", reverseList);
    },

    DeleteItem({ commit }, id) {
      const idx = this.state.oldElems.findIndex(el => el.id === id);
      const newElems = [
        ...this.state.oldElems.slice(0, idx),
        ...this.state.oldElems.slice(idx + 1)
      ];
      commit("setDeleteItem", newElems);
    },
    Search({ commit }, payload) {
      commit("setSearch", payload);
    },
    EmptySearch({ commit }, oldElems) {
      commit("setEmptySearch", oldElems);
    }
  },
  getters: {},

  modules: {
    todo
  }
});
