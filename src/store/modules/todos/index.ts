import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { TodoState } from '../types';
import { RootState } from '../types';
import elems from "../types";

export const state: TodoState = {
  elems: Array<elems>(),
  oldElems: Array<elems>()
};

const namespaced: boolean = true;

export const todos: Module<TodoState, RootState> = {
    namespaced,
    state,
    actions,
    mutations
};
