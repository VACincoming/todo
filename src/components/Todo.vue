<script lang="ts">
import { Vue, Component} from "vue-property-decorator";
import Reverse from "./Reverse.vue";
import Add from "./Add.vue";
import Todolist from "./Todolist.vue";
  @Component({
    components: {
      Add,
      Todolist,
      Reverse,
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
            <Reverse />
            <todolist/>
          </el-col>
        </el-row>
      </el-main>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </div>
</template>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
    background-color: #f9fafc;
    padding: 10px 50px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>