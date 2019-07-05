<script lang="ts">
import VueRouter from "vue-router";
import { Vue, Component } from "vue-property-decorator";
import Todo from "./Router/pages/Todo.vue";
import "./assets/styles/main.css";
import { Getter, Mutation, Action, State } from "vuex-class";
import store from "./store/index";
import { OtherTodoState, TodoState } from "./store/modules/types";
import VueI18n from 'vue-i18n'
@Component({
  components: {
    Todo
  }
})
export default class App extends Vue {
    setLocale(locale:string){
    this.$i18n.locale = locale;
  }
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
      <!-- <el-form>
        <el-form-item label="Language">
          <el-select>
            <el-option @click="setLocale('en')" label="English" value="English"></el-option>
            <el-option @click="setLocale('ru')" label="Русский" value="Русский"></el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
      <el-dropdown>
      <span class="el-dropdown-link">
        {{$t("Language")}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
       <a href="#" @click="setLocale('en')"><el-dropdown-item>Eng</el-dropdown-item></a>
        <a href="#" @click="setLocale('ru')"><el-dropdown-item>Rus</el-dropdown-item></a>
      </el-dropdown-menu>
    </el-dropdown>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu class="el__submenu" index="1">
            <template slot="title">
              <span>{{$t("BetweenTodo")}}</span>
            </template>
            <el-menu-item-group class="el-menu-item__group">
              <router-link to="/todo/prevdaytodo"
                ><el-menu-item index="1-1"
                  >{{$t("Yesterday")}}</el-menu-item
                ></router-link
              >
              <router-link to="/todo"
                ><el-menu-item index="1-2"
                  >{{$t("Today")}}</el-menu-item
                ></router-link
              >
              <router-link to="/todo/nextdaytodo"
                ><el-menu-item index="1-3"
                  >{{$t("Tomorrow")}}</el-menu-item
                ></router-link
              >
            </el-menu-item-group>
          </el-submenu>
          <router-link to="/progress"
            ><el-menu-item class="el-menu__item" index="2">
              <span>{{$t("ProgressBar")}}</span>
            </el-menu-item></router-link
          >
          <router-link to="/"
            ><el-menu-item index="3">
              <span>{{$t("Home")}}</span>
            </el-menu-item></router-link
          >


         <!-- <el-submenu class="el__submenu" index="4">
            <template slot="title">
              <span>{{$t("Language")}}</span>
            </template>
            <el-menu-item-group class="el-menu-item__group">
              <a href="#" @click="setLocale('en')"
                ><el-menu-item index="1-1"
                  >Eng</el-menu-item
                ></a
              >
              <a href="#" @click="setLocale('ru')"
                ><el-menu-item index="1-1"
                  >Rus</el-menu-item
                ></a
              >
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-col>
      <el-col class="purple">
        <keep-alive><router-view class="view one"></router-view></keep-alive>
      </el-col>
    </el-row>
  </div>
</template>
