import { State } from './types'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import elems from './types'

export const state: State = {
    id: 0,
    elems: Array<elems>(),
    oldElems: Array<elems>(),
    matches: false,
    isInSearch: false,
    alertMsg: false,
    alertMsgSpace: false
}

export const getters: GetterTree<State, any> = {
    elems: state => state.elems
}
export const mutations: MutationTree<State> = {
    setList(state, task) {
        state.elems.push(task);
        state.oldElems = state.elems;
      },
      setReverseList(state, reverseList) {
        state.elems = reverseList;
      },
      setDeleteItem(state, elems) {
        state.elems = elems;
        state.oldElems = elems;
        state.isInSearch = false;
      },
      setSearch(state, payload) {
        if (payload.key2 === false) {
          state.elems = state.oldElems;
        }
        state.elems = payload.key1;
        state.isInSearch = payload.key2;
      },
      setNoMatches(state, flag: boolean) {
        state.matches = flag;
      },
      setEmptySearch(state, oldElems) {
        state.elems = oldElems;
      },
      setInit(state, correctData: elems) {
        state.elems.push(correctData);
        state.oldElems = state.elems;
      },
      setAlert(state, flag: boolean) {
        state.alertMsg = flag;
      },
      setAlertSpace(state, flag: boolean) {
        state.alertMsgSpace = flag;
      }
}

export const actions: ActionTree<State, any> = {
    Alert({ commit }, flag: boolean) {
        commit("setAlert", flag);
      },
      AlertSpace({ commit }, flag: boolean) {
        commit("setAlertSpace", flag);
      },
      noMatches({ commit }, flag: boolean) {
        commit("setNoMatches", flag);
      },
      async InitList({ commit }) {
        const data = await fetch(
          "https://jsonplaceholder.typicode.com/todos/" + ++this.state.id
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
  
      DeleteItem({ commit }, id: number) {
        const idx = this.state.oldElems.findIndex(el => el.id === id);
        const newElems = [
          ...this.state.oldElems.slice(0, idx),
          ...this.state.oldElems.slice(idx + 1)
        ];
        commit("setDeleteItem", newElems);
      },
      Search({ commit }, payload) {
        commit("setSearch", payload);
      },
      EmptySearch({ commit }, oldElems: elems) {
        commit("setEmptySearch", oldElems);
      }
}