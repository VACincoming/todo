<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus";
import { namespace } from "vuex-class";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { State, Action } from "vuex-class";
import store from "@/store/index";
import { TodoState, OtherTodoState } from "../store/modules/types";
import moment from "moment";

const Todos = namespace("Todos");
const OtherTodo = namespace("OtherTodo");

@Component
export default class Reverse extends Vue {
  @Todos.Action ReverseList: any;
  @Todos.State elems: any;
  searchText = "";
  onReverse() {
    this.ReverseList(this.elems);
  }
  onSearch() {
    eventBus.$emit("on-search", this.searchText);
    this.searchText = "";
  }
  onSearchData(){
    eventBus.$emit("on-search-data", this.value1);
  }

  value1 =  [new Date(moment().add(3, 'hours').toString()), new Date(moment().add(1, 'days').add(3, 'hours').toString())]
  value2 = ''
}
</script>

<template>
  <div class="reverse-wrapper">
    <el-form id="form">
      <el-row :gutter="1" justify="center">
        <el-col :span="3.5"
          ><el-button id="reverseButtonId" v-on:click="onReverse"
            >{{ $t("Actions.ButtonReverse") }}<i class="el-icon-sort"
          /></el-button>
        </el-col>
        <el-col :span="12"
          ><el-input id="searchInputId" type="text" v-model="searchText"
        /></el-col>
        <el-col :span="4"
          ><el-button
            id="searchButtonId"
            icon="el-icon-search"
            v-on:click="onSearch"
            >{{ $t("Actions.ButtonSearch") }}</el-button
          ></el-col
        >
      </el-row>
      <el-row :gutter="1" justify="space-between">
        <el-col :span='18'>
           <div class="block">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date">
            </el-date-picker>
            <el-button
            id="searchForDataButtonId"
            icon="el-icon-search"
            v-on:click="onSearchData"
            >{{ $t("Actions.ButtonSearch") }}</el-button
          >
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
