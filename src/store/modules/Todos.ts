import { Module } from "vuex";
import { TodoState } from "./types";
import { RootState } from "./types";
import { ActionTree, MutationTree } from "vuex";
import elems from "./types";
import OtherTodo from "./OtherTodo";

const state: TodoState = {
  elems: Array<elems>(),
  oldElems: Array<elems>()
};

// const namespaced: boolean = true;

const actions: ActionTree<TodoState, RootState> = {
  async InitList({ commit }, rootState) {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + ++OtherTodo.state.id
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
  ReverseList({ commit }, elems) {
    const reverseList = elems.reverse();
    commit("setReverseList", reverseList);
  },

  EmptySearch({ commit }, oldElems: elems) {
    commit("setEmptySearch", oldElems);
  }
};

const mutations: MutationTree<TodoState> = {
  setList(state, task) {
    state.elems.push(task);
    state.oldElems = state.elems;
    OtherTodo.state.id++;
  },
  setReverseList(state, reverseList) {
    state.elems = reverseList;
  },
  setEmptySearch(state, oldElems) {
    state.elems = oldElems;
  },
  setInit(state, correctData: elems) {
    state.elems.push(correctData);
    state.oldElems = state.elems;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

// const namespaced: boolean = true;
