<script lang="ts">
import { Vue, Component} from "vue-property-decorator";
import FilterTodo from "../components/FilterTodo.vue";
import Add from "../components/Add.vue";
import Todolist from "../components/Todolist.vue";
import '../assets/styles/main.css'
  @Component({
    components: {
      Add,
      Todolist,
      FilterTodo,
    },
  })
export default class Todo extends Vue {
}
</script>

<template>
  <div id="todo">
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-row type="flex" class="row-bg">
          <el-col :span='24'>
            <h1>My ToDo List</h1>
            <Add/>
            <FilterTodo />
            <todolist/>
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>