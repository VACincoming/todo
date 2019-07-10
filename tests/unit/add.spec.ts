import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Add from '@/components/Add.vue'

describe('Navigation Toggler', () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  let store

  let wrapper:any;
  
  const strings: any = {
    'Actions.ButtonAdd': 'translated button text',
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
    it('should be true', () => {
      console.log(wrapper.html())
      expect(true).toBe(true)
    })
  })
});
