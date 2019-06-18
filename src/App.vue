<script lang="ts">
import VueRouter from 'vue-router'
import { Vue, Component} from "vue-property-decorator";
import Todo from "./components/Todo.vue"
  @Component({
    components: {
      Todo,
    },
  })
export default class App extends Vue {
}
</script>

<template>
  <div id="app">
    <h1>My ToDo List</h1>
    <p>
      <router-link to='/todo'>Go to ToDo</router-link>
      <router-link to='/about'>Go and read about ToDo</router-link>
    </p>
    <router-view></router-view>
    <Todo />
  </div>
</template>
