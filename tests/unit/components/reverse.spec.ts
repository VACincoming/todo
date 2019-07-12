import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { mapActions } from "vuex";
import FilterTodo from "@/components/FilterTodo.vue";
import actions from "@/store/modules/Todos";
import Todos from "@/store/modules/Todos";

describe("Navigation Toggler", () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  let store;

  let wrapper: any;

  const strings: any = {
    "Actions.ButtonReverse": "Reverse",
    "Actions.ButtonSearch": "Search"
  };

  const $t = jest.fn(name => strings[name]);

  let options: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Todos: {
          namespaced: true,
          state: {
            elems: [1, 2, 3]
          },
          actions: {
            ReverseList: jest.fn()
          }
        }
      }
    });

    options = {
      attachToDocument: false,
      store,
      localVue,
      mocks: {
        $t
      },
      stubs: ["el-col", "el-row", "el-form", "el-input", "el-button"]
    };

    wrapper = shallowMount(FilterTodo, options);
  });

  describe("test reverse", () => {
    it("Click on #reverseButtonId call onReverse", () => {
      jest.spyOn(wrapper.vm, "ReverseList");
      wrapper.vm.onReverse();
      expect(wrapper.vm.ReverseList).toHaveBeenCalled();
    }),
      it("Button Reverse is present", () => {
        const button = wrapper.find("#reverseButtonId ");
        expect(button.text()).toBe("Reverse");
      });
  }),
    describe("test search", () => {
      it("should clear searchText", () => {
        wrapper.vm.searchText = "someTest";
        wrapper.vm.onSearch();
        expect(wrapper.vm.searchText).toBe("");
      }),
        it("Button Search is present", () => {
          const button = wrapper.find("#searchButtonId ");
          expect(button.text()).toBe("Search");
        });
    });
});
