<script lang="ts">
import VueRouter from 'vue-router'
import { Vue, Component} from "vue-property-decorator";
import Todo from "./pages/Todo.vue"
import '../src/assets/styles/main.css'
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
      <el-col :xs="15" :md="15" :lg="4" :sm="15">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
  >
      <el-submenu index="1">
        <template slot="title">
          <span>Navigate between ToDo</span>
        </template>
        <el-menu-item-group>
          <router-link to='/todo/prevdaytodo'><el-menu-item index="1-1">Todos on yesterday</el-menu-item></router-link>
          <router-link to='/todo'><el-menu-item index="1-2">Todos on today</el-menu-item></router-link>
          <router-link to='/todo/nextdaytodo'><el-menu-item index="1-3">Todos on tomorrow</el-menu-item></router-link>
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
      <el-col :offset="5" :xs='18' :sm='14' :md="12" :lg="9" class='purple'>
          <keep-alive><router-view></router-view></keep-alive>
        </el-col>
    </el-row>
  </div>
</template>
          
          
        
