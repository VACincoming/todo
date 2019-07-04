import { MutationTree } from 'vuex';
import { OtherTodoState } from '../types';
import { state } from '../todos/index'
import Elems from "../types";

export const mutations: MutationTree<OtherTodoState> = {
  setNoMatches(state, flag: boolean) {
    state.matches = flag;
  },
  setAlert(state, flag: boolean) {
    state.alertMsg = flag;
  },
  setAlertSpace(state, flag: boolean) {
    state.alertMsgSpace = flag;
  },
  // setDeleteItem(state, elems: Elems) {
  //   state.elems= elems;
  //   state.oldElems = elems;
  //   state.isInSearch = false;
  // },
  // setSearch(state, payload) {
  //   if (payload.key2 === false) {
  //     state.todos.elems = state.oldElems;
  //   }
  //   state.todos.elems = payload.key1;
  //   state.isInSearch = payload.key2;
  // }
};