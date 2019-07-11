import mutations from '@/store/modules/OtherTodo'

describe("Testing mutations from Todos store", () => {
  it('setList updates state with items in payload', () => { 
    const state = {
      id: 0,
      matches: false,
      alertMsg: false,
      alertMsgSpace: false,
      isInSearch: false
  }
  mutations.mutations.setNoMatches(state, true);
  expect(state.matches).toBe(true);
  });
});
