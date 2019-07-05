<script lang="ts">
import VueRouter from "vue-router";
import { Vue, Component } from "vue-property-decorator";
import Todo from "./Router/pages/Todo.vue";
import "./assets/styles/main.css";
import { Getter, Mutation, Action, State } from "vuex-class";
import store from "./store/index";
import { OtherTodoState, TodoState } from "./store/modules/types";
@Component({
  components: {
    Todo
  }
})
export default class App extends Vue {
  // @Action('InitList')
}
</script>

<template>
  <div id="app">
    <el-row type="flex" class="row-bg">
      <el-col
        :xs="20"
        :md="10"
        :lg="4"
        :sm="24"
        id="menu-wrapper"
        class="menu-wrapper"
      >
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu class="el__submenu" index="1">
            <template slot="title">
              <span>Navigate between ToDo</span>
            </template>
            <el-menu-item-group class="el-menu-item__group">
              <router-link to="/todo/prevdaytodo"
                ><el-menu-item index="1-1"
                  >Todos on yesterday</el-menu-item
                ></router-link
              >
              <router-link to="/todo"
                ><el-menu-item index="1-2"
                  >Todos on today</el-menu-item
                ></router-link
              >
              <router-link to="/todo/nextdaytodo"
                ><el-menu-item index="1-3"
                  >Todos on tomorrow</el-menu-item
                ></router-link
              >
            </el-menu-item-group>
          </el-submenu>
          <router-link to="/progress"
            ><el-menu-item class="el-menu__item" index="2">
              <span>Navigate to progressBar</span>
            </el-menu-item></router-link
          >
          <router-link to="/"
            ><el-menu-item index="3">
              <span>Navigate to Home</span>
            </el-menu-item></router-link
          >
        </el-menu>
      </el-col>
      <el-col class="purple">
        <keep-alive><router-view class="view one"></router-view></keep-alive>
      </el-col>
    </el-row>
  </div>
</template>
