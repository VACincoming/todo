import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import FilterTodo from '@/components/FilterTodo.vue'

describe('Navigation Toggler', () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  let store

  let wrapper:any;
  
  const strings: any = {
    'Actions.ButtonReverse': 'Reverse',
    'Actions.ButtonSearch': 'Search'
  }

  const $t = jest.fn((name) => strings[name])
  
  let options: any

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Todos: {
          namespaced: true,
          state: {
            elems: [],
          },
        },
      },
    })

    options = {
      attachToDocument: false,
      store,
      localVue,
      mocks:{
        $t,
      },
      stubs: ['el-col','el-row', 'el-form', 'el-input', 'el-button'],
    }

    wrapper = shallowMount(FilterTodo, options)
  })
  

  describe('test reverse',() => {
    it('Click on #reverseButtonId call onReverse', () => {
      const stub = jest.fn(() => console.log('onReverse is called'));
      wrapper.setMethods({ onReverse: stub });
      const button = wrapper.find('#reverseButtonId ');
      button.vm.$emit('click')
      expect(wrapper.vm.onReverse).toBeCalled();
    }),
    it('Button Reverse is present', () => {
      const button = wrapper.find('#reverseButtonId ');
      expect(button.text()).toBe('Reverse');
    })
  }),
  describe('test search', () => {
    it('Click on #searchButtonId call onSearch', () => {
      const stub = jest.fn(() => console.log('onSearch is called'));
      wrapper.setMethods({ onSearch: stub });
      const button = wrapper.find('#searchButtonId ');
      button.vm.$emit('click')
      expect(wrapper.vm.onSearch).toBeCalled();
    }),
    it('Button Search is present', () => {
      const button = wrapper.find('#searchButtonId ');
      expect(button.text()).toBe('Search');
    })
    })
  });

