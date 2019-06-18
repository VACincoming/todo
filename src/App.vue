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
    <el-row type='flex' class='row-bg'>
      <el-col :span="4">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
  >
      <el-submenu index="1">
        <template slot="title">
          <span>Navigate between ToDo</span>
        </template>
        <el-menu-item-group>
          <router-link to='/todo/yesterday'><el-menu-item index="1-1">Todos on yesterday</el-menu-item></router-link>
          <router-link to='/todo'><el-menu-item index="1-2">Todos on today</el-menu-item></router-link>
          <router-link to='/todo/tomorrow'><el-menu-item index="1-3">Todos on tomorrow</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
       <router-link to='/progress'><el-menu-item index="2">
       <span>Navigate to progressBar</span>
      </el-menu-item></router-link>
      <router-link to='/'><el-menu-item index="3">
        <span>Navigate to Home</span>
      </el-menu-item></router-link>
    </el-menu>
  </el-col>
      <el-col :offset="5" :xs='18' :sm='14' :md="12" :lg="7" class='purple'>
          <router-view></router-view>
        </el-col>
    </el-row>
  </div>
</template>
<style>
body{
  background: #f9fafc;
}
a{
  text-decoration: none;
}
.el-menu-item-group__title{
  padding-top: 0px;
}
</style>

          
          
        
