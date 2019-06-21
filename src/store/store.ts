import Vue from "vue";
import Vuex from "vuex";
import todo from './modules/todo'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    elems: [],
    oldElems: [],
    matches: false,
    isInSearch: false,
  },
  mutations: {
    setList(state, task){
      state.elems.push(task);
      state.oldElems.push(task);
    },
    setReverseList(state, reverseList){
      state.elems = reverseList;
    },
    setDeleteItem(state, elems){
      state.elems = elems;
    },
    setSearch(state, payload){
      state.elems = payload.key1;
      state.isInSearch = payload.key2;
    },
    setNoMatches(state, flag){
      state.matches = flag;
    },
    setEmptySearch(state, oldElems){
      state.elems = oldElems;
    }
  },
  actions: {
    noMatches({commit}, flag){
      commit("setNoMatches", flag)
    },
    AddList({ commit }, task){
      commit("setList", task);
  },
    ReverseList({ commit }, state){
      let reverseList = state.elems.reverse();
      commit("setReverseList", reverseList);
    },

    DeleteItem({commit}, id){
      const idx = this.state.elems.findIndex((el) => el.id === id);
      const newElems = [
        ...this.state.elems.slice(0, idx),
        ...this.state.elems.slice(idx + 1)
      ]
      const oldElems = newElems;
      const elems = newElems;
      commit('setDeleteItem', elems);
    },
    Search({commit}, payload){
     commit('setSearch', payload);
    },
    EmptySearch({commit}, oldElems){
      commit('setEmptySearch', oldElems)
    }
},
  getters: {
    ELEMS(state){
      return state.elems;
    }

  },

  modules: {
    todo
  }
});

