import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Add from '@/components/Add.vue'

describe('Navigation Toggler', () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  let store

  let wrapper:any;
  
  const strings: any = {
    'Actions.ButtonAdd': 'Add',
  }

  const $t = jest.fn((name) => strings[name])
  
  let options: any

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        OtherTodo: {
          namespaced: true,
          state: {
            isInSearch: false,
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

    wrapper = shallowMount(Add, options)
  })
  
  describe('should text is empty',() => {
    it('Call onAdd and text is blank', () => {
      wrapper.vm.text = 'text123';
      wrapper.vm.onAdd();
      expect(wrapper.vm.text).toBe("");
    }),
    it('Button Add is present', () => {
      const button = wrapper.find('#addButton');
      expect(button.text()).toBe('Add');
    }),
    it('isInSearchFlag() return expected token', () => {
      wrapper.vm.text = '';
      // wrapper.vm.isInSearch = true;
      expect(wrapper.vm.isInSearchFlag()).toBe(false);
      wrapper.vm.text = '1111';
      expect(wrapper.vm.isInSearchFlag()).toBe(true);
    })
  })
});
