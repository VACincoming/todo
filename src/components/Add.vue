<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus";
import { namespace } from "vuex-class";
import { OtherTodoState } from "../store/modules/types";
const OtherTodo = namespace("OtherTodo");

@Component
export default class Add extends Vue {
  @OtherTodo.State isInSearch: any;
  text: string = "";
  activate: boolean = true;
  onAdd() {
    eventBus.$emit("on-add", this.text);
    this.text = "";
  }
  isInSearchFlag() {
    return !!this.text && !this.isInSearch;
  }
  updated() {
    if (this.isInSearchFlag) {
      this.activate = true;
    } else {
      this.activate = false;
    }
  }
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last month",
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last 3 months",
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  }
}
</script>

<template>
  <div class="add-wrapper">
    <el-form id="form">
      <el-row :gutter="1">
        <p v-show="this.isInSearch">
          Что бы добавить Task, выйдите с режима поиска
        </p>
        <el-col :xs="12" :md="12" :lg="12" :sm="12"
          ><el-input
            class="addInput"
            autofocus="true"
            id="addInput"
            :disabled="this.isInSearch"
            type="text"
            v-model="text"
            v-on:keypress.enter="onAdd"
        /></el-col>
        <el-col :span="10"
          ><el-button
            id="addButton"
            :disabled="this.isInSearch"
            v-on:click="onAdd"
            >{{ $t("Actions.ButtonAdd") }}</el-button
          ></el-col
        >
        <div class="block">
          <!-- <span class="demonstration">Default</span> -->
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
