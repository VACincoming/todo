import { OtherTodoState } from "./types"
import { GetterTree, MutationTree, ActionTree } from "vuex"

export const state: OtherTodoState = {
    id: 0,
    matches: false,
    isInSearch: false,
    alertMsg: false,
    alertMsgSpace: false
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
    }
}

const actions: ActionTree<OtherTodoState, any> = {
    Alert({ commit }, flag: boolean) {
      commit("setAlert", flag);
    },
    AlertSpace({ commit }, flag: boolean) {
      commit("setAlertSpace", flag);
    },
    noMatches({ commit }, flag: boolean) {
      commit("setNoMatches", flag);
    },
}

export const otherTodo = {
    state,
    mutations,
    actions
}