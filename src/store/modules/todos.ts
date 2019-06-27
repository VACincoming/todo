import Elems, { TodoState } from "./types";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import elems from "./types";
import { otherTodo } from "./otherTodo";
import isInSearch from "./types";
// import OtherTodo from './otherTodo'

export const state: TodoState = {
  elems: Array<elems>(),
  oldElems: Array<elems>()
};

export const getters: GetterTree<TodoState, any> = {
  elems: state => state.elems
};
export const mutations: MutationTree<TodoState> = {
  setList(state, task) {
    state.elems.push(task);
    state.oldElems = state.elems;
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

export const actions: ActionTree<TodoState, any> = {
  async InitList({ commit }) {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + ++this.state.otherTodo.id
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

  EmptySearch({ commit }, oldElems: elems) {
    commit("setEmptySearch", oldElems);
  }
};

export const todos = {
  state,
  getters,
  actions,
  mutations
};
