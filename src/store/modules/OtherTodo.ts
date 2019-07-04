import { Module, GetterTree } from 'vuex';
import { OtherTodoState } from './types';
import { RootState } from './types';
import rootState from '../index'
import { ActionTree, MutationTree } from 'vuex';
import Elems from "./types";
import Todos from './Todos';

const state: OtherTodoState = {
  id: 0,
  matches: false,
  alertMsg: false,
  alertMsgSpace: false,
  isInSearch: false,
};

const actions: ActionTree<OtherTodoState, RootState> = {
  Alert({ commit, rootState}, flag: boolean) {
    commit("setAlert", flag);
  },
  AlertSpace({ commit }, flag: boolean) {
    commit("setAlertSpace", flag);
  },
  noMatches({ commit }, flag: boolean) {
    commit("setNoMatches", flag);
  },
  DeleteItem({ commit, rootState}, id: number) {
    const idx = Todos.state.oldElems.findIndex(
      (el: any) => el.id === id
    );
    const newElems = [
      ...Todos.state.oldElems.slice(0, idx),
      ...Todos.state.oldElems.slice(idx + 1)
    ];
    commit("setDeleteItem", newElems);
  },
  Search({ commit }, payload) {
    commit("setSearch", payload);
  }
};

const getters: GetterTree<OtherTodoState, RootState>= {
  getElems(state, rootState) {
    return rootState.TodoState.elems;
  },
  getOldElems(state, rootState) {
    return rootState.TodoState.oldElems;
  }
}

const mutations: MutationTree<OtherTodoState> = {
  setNoMatches(state, flag: boolean) {
    state.matches = flag;
  },
  setAlert(state, flag: boolean) {
    state.alertMsg = flag;
  },
  setAlertSpace(state, flag: boolean) {
    state.alertMsgSpace = flag;
  },
  setDeleteItem(state, elems: Elems) {
    Todos.state.elems = elems;
    Todos.state.oldElems = elems;
    state.isInSearch = false;
  },
  setSearch(rootState , payload) {
    if (payload.key2 === false) {
      rootState.todos.elems = rootState.todos.oldElems;
    }
    rootState.todos.elems = payload.key1;
    rootState.isInSearch = payload.key2;
  }
};

// const namespaced: boolean = true;

export default{
    namespaced:true,
    state,
    actions,
    mutations
};
