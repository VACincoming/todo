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
  

  describe('test something',() => {
    it('Click on #addButton call onAdd', () => {
      const stub = jest.fn(() => console.log('onAdd is called'));
      wrapper.setMethods({ onAdd: stub });
      const button = wrapper.find('#addButton');
      button.vm.$emit('click')
      expect(wrapper.vm.onAdd).toBeCalled();
    }),
    it('Button is present', () => {
      const button = wrapper.find('#addButton');
      expect(button.text()).toBe('Add');
    })
  })
  
});
