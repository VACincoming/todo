import Vue from "vue";
import Vuex from "vuex";
import todo from './modules/todo'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    elems: [],
    oldElems: [],
    matches: false,
  },
  mutations: {
    setList(state, task){
      state.elems.push(task);
    },
    setReverseList(state, reverseList){
      state.elems = reverseList;
    },
    setDeleteItem(state, elems){
      // console.log(payload);
      state.elems = elems;
    },
    setSearch(state, newElems){
      state.oldElems = state.elems;
      state.elems = newElems;
      state.matches = false;
    },
    setNoMatches(state, flag){
      state.matches = flag;
      state.elems = [];
    }
  },
  actions: {
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
    Search({commit}, searchText){
      const newElems = this.state.elems.filter((elem) => {
        return elem.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
      })
      if(newElems.length > 0){
         commit('setSearch', newElems);
      }
      if(newElems.length === 0) {
       commit('setNoMatches', true)
      }
      // else this.state.matches = false;
      // if(searchText === ''){
      //   commit('setSearch', false)
      // }else commit('setSearch', true)
      // console.log(newElems);
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

