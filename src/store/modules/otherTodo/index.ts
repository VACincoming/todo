import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { OtherTodoState } from '../types';
import { RootState } from '../types';

export const state: OtherTodoState = {
  id: 0,
  matches: false,
  alertMsg: false,
  alertMsgSpace: false,
  isInSearch: false,
};

const namespaced: boolean = true;

export const otherTodo: Module<OtherTodoState, RootState> = {
    namespaced,
    state,
    actions,
    mutations
};
