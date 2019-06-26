import { TodoState } from './types'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import elems from './types'
import isInSearch from './types'
// import OtherTodo from './otherTodo'

export const state: TodoState = {
    elems: Array<elems>(),
    oldElems: Array<elems>(),
}

export const getters: GetterTree<TodoState, any> = {
    elems: state => state.elems
}
export const mutations: MutationTree<TodoState> = {
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
      setEmptySearch(state, oldElems) {
        state.elems = oldElems;
      },
      setInit(state, correctData: elems) {
        state.elems.push(correctData);
        state.oldElems = state.elems;
      },
}

export const actions: ActionTree<TodoState, any> = {
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

export const todos = {
    state,
    getters,
    actions,
    mutations
}