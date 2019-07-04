import { MutationTree } from 'vuex';
import { TodoState } from '../types';
import elems from '../types';

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