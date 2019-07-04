import { ActionTree } from 'vuex';
import { TodoState } from '../types';
import { RootState } from '../types';
import { state } from '../otherTodo'
import elems from "../types";

export const actions: ActionTree<TodoState, RootState> = {
  async InitList({ commit }) {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + ++state.id
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