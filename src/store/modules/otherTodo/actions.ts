import { ActionTree } from 'vuex';
import { OtherTodoState } from '../types';
import {state} from '../todos/index'
import {RootState} from '../types'

export const actions: ActionTree<OtherTodoState, RootState> = {
  Alert({ commit }, flag: boolean) {
    commit("setAlert", flag);
  },
  AlertSpace({ commit }, flag: boolean) {
    commit("setAlertSpace", flag);
  },
  noMatches({ commit }, flag: boolean) {
    commit("setNoMatches", flag);
  },
  DeleteItem({ commit }, id: number) {
    const idx = state.oldElems.findIndex(
      (el: any) => el.id === id
    );
    const newElems = [
      ...state.oldElems.slice(0, idx),
      ...state.oldElems.slice(idx + 1)
    ];
    commit("setDeleteItem", newElems);
  },
  Search({ commit }, payload) {
    commit("setSearch", payload);
  }
},
};