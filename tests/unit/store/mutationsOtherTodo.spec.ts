import mutations from "@/store/modules/OtherTodo";
import Todos from "@/store/modules/Todos";

describe("Testing mutations from OtherTodo store", () => {
  beforeEach(() => {
    const state = {
      id: 0,
      matches: false,
      alertMsg: false,
      alertMsgSpace: false,
      isInSearch: false
    };
  });
  it("setNoMatches should set matches:true", () => {
    mutations.mutations.setNoMatches(mutations.state, true);
    expect(mutations.state.matches).toBe(true);
  }),
    it("setAlert should set alertMsg:true", () => {
      mutations.mutations.setAlert(mutations.state, true);
      expect(mutations.state.alertMsg).toBe(true);
    }),
    it("setAlertSpace should set alertMsgSpace:true", () => {
      mutations.mutations.setAlertSpace(mutations.state, true);
      expect(mutations.state.alertMsgSpace).toBe(true);
    }),
    it("setSearch should set matches:true", () => {
      const payload = { key1: [], key2: true };
      mutations.mutations.setSearch(mutations.state, payload);
      expect(mutations.state.isInSearch).toBe(true);
      expect(Todos.state.elems).toEqual([]);
    });
});
