<script lang="ts">
import VueRouter from "vue-router";
import { Vue, Component } from "vue-property-decorator";
import Todo from "./Router/pages/Todo.vue";
import "./assets/styles/main.css";
import { Getter, Mutation, Action, State } from "vuex-class";
import store from "./store/index";
import { OtherTodoState, TodoState } from "./store/modules/types";
import VueI18n from "vue-i18n";
@Component({
  components: {
    Todo
  }
})
export default class App extends Vue {
  model: string = "en";
  setLocale(locale: string) {
    this.model = locale;
    this.$i18n.locale = locale;

    console.log(this.model);
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
        <el-form>
          <el-form-item :label="$t('Language')">
            <el-select
              :v-model="this.model"
              :value="this.$i18n.locale"
              :placeholder="this.$i18n.locale"
            >
              <el-option
                @click.native="setLocale('en')"
                value="English"
              ></el-option>
              <el-option
                @click.native="setLocale('ru')"
                value="Russian"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu class="el__submenu" index="1">
            <template slot="title">
              <span>{{ $t("BetweenTodo") }}</span>
            </template>
            <el-menu-item-group class="el-menu-item__group">
              <router-link to="/todo/prevdaytodo"
                ><el-menu-item index="1-1">{{
                  $t("Yesterday")
                }}</el-menu-item></router-link
              >
              <router-link to="/todo"
                ><el-menu-item index="1-2">{{
                  $t("Today")
                }}</el-menu-item></router-link
              >
              <router-link to="/todo/nextdaytodo"
                ><el-menu-item index="1-3">{{
                  $t("Tomorrow")
                }}</el-menu-item></router-link
              >
            </el-menu-item-group>
          </el-submenu>
          <router-link to="/progress"
            ><el-menu-item class="el-menu__item" index="2">
              <span>{{ $t("ProgressBar") }}</span>
            </el-menu-item></router-link
          >
          <router-link to="/"
            ><el-menu-item index="3">
              <span>{{ $t("Home") }}</span>
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
