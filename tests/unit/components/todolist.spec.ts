import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Todolist from '@/components/Todolist.vue'
import Todos from '@/store/modules/Todos';

describe('Testing todolist', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let store
  let wrapper:any;
  const strings:any = {

  }
  const $t = jest.fn((name) => strings[name])
  let options: any

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        OtherTodo: {
          namespaced: true,
          state: {
            matches: false,
          },
          actions: {
            DeleteItem: jest.fn(),
            NoMatches: jest.fn(),
            Search: jest.fn()
          }
        },
        Todos: {
          namespaced: true,
          state: {
            elems: [1,2,3],
            oldElems: Todos.state.elems,
          },
          actions: {
            InitList: jest.fn(),
          }
        }
      }
    })
    options = {
      attachToDocument: false,
      store,
      localVue,
      mocks:{
        $t,
      },
      stubs: ['el-col','el-row', 'el-form', 'el-input', 'el-button','el-checkbox', 'el-button-group'],
    }
    wrapper = shallowMount(Todolist, options);
  })

  describe('Testing Todolist component', () => {
    it('testing DeleteItem, should called DeleteItem Action', () => {
    jest.spyOn(wrapper.vm, 'DeleteItem')
    wrapper.vm.onDeletedItem();
    expect(wrapper.vm.DeleteItem).toBeCalled();
  }),
    it('testing search, should call actions NoMatches && Search', () => {
      jest.spyOn(wrapper.vm, 'NoMatches');
      jest.spyOn(wrapper.vm,'Search')
      wrapper.vm.search();
      expect(wrapper.vm.matches).toBe(false);
      expect(wrapper.vm.NoMatches).toHaveBeenCalled();
      expect(wrapper.vm.Search).toBeCalled();
    }),
    it('testing createList, should return array with data', () => {
      wrapper.vm.id = 2;
      const arr = wrapper.vm.createList('tests');
      expect(arr).toEqual({id: 3, label:'tests', done: false});
    })
})

})