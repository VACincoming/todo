import { Vue, Component } from "vue-property-decorator";
import Vuex, { StoreOptions } from "vuex";
import Todos from "./modules/Todos";
import OtherTodo from "./modules/OtherTodo";
import { RootState } from "./modules/types";
// import VuexPersist from 'vuex-persist'
Vue.use(Vuex);

// const vuexPersist = new VuexPersist({
//   key: 'my-app',
//   storage: localStorage
// })
const store = {
  state: {
    version: "1.0.0"
  },
  modules: {
    Todos,
    OtherTodo
  }
  // plugins: [vuexPersist.plugin]
};

export default new Vuex.Store<RootState>(store);
