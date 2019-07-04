import { Vue, Component } from "vue-property-decorator";
import Vuex, { StoreOptions } from "vuex";
import Todos  from "./modules/Todos";
import OtherTodo from "./modules/OtherTodo";
import { RootState } from './modules/types';

Vue.use(Vuex);

const store = {
  state:{
    version: '1.0.0',
  },
  modules: {
    Todos,
    OtherTodo
  }
}

export default new Vuex.Store<RootState>(store);
