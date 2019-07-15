import mutations from "@/store/modules/Todos";

describe("Testing mutations from Todos store", () => {
  it("setList updates state with items in payload", () => {
    const state = {
      elems: [],
      oldElems: []
    };
    mutations.mutations.setList(state, {
      id: 1,
      label: "something",
      done: false
    });
    expect(state.elems).toEqual([{ id: 1, label: "something", done: false }]);
  });

  it("setReverseList updates state with items in payload", () => {
    const state = {
      elems: [],
      oldElems: []
    };
    mutations.mutations.setReverseList(state, [
      { id: 2, label: "something2", done: true },
      { id: 1, label: "something", done: false }
    ]);
    expect(state.elems).toEqual([
      { id: 2, label: "something2", done: true },
      { id: 1, label: "something", done: false }
    ]);
  });

  it("setEmptySearch updates state with items in payload", () => {
    const state = {
      elems: [],
      oldElems: []
    };
    mutations.mutations.setEmptySearch(state, state.oldElems);
    expect(state.elems).toEqual(state.oldElems);
  });

  it("setInit updates state with items in payload", () => {
    const state = {
      elems: [],
      oldElems: []
    };
    mutations.mutations.setInit(state, {
      id: 1,
      label: "something",
      done: false
    });
    expect(state.elems).toEqual([{ id: 1, label: "something", done: false }]);
  });
});
