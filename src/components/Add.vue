<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus";
import { namespace } from "vuex-class";
import { OtherTodoState } from "../store/modules/types";
const OtherTodo = namespace("OtherTodo");
import moment from "moment";

@Component
export default class Add extends Vue {
  @OtherTodo.State isInSearch: any;
  text: string = "";
  activate: boolean = true;
  onAdd() {
    eventBus.$emit("on-add", this.text, this.value1);
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

  value1 =  [new Date(moment().add(3, 'hours').toString()), new Date(moment().add(1, 'days').add(3, 'hours').toString())]
  value2 = ''
}
</script>

<template>
  <div class="add-wrapper">
    <el-form id="form">
      <el-row :gutter="1" justify="space-between">
        <p v-show="this.isInSearch">
          Что бы добавить Task, выйдите с режима поиска
        </p>
        <el-col :xs="12" :md="8" :lg="7" :sm="12"
          ><el-input
            class="addInput"
            autofocus="true"
            id="addInput"
            :disabled="this.isInSearch"
            type="text"
            v-model="text"
            v-on:keypress.enter="onAdd"
        /></el-col>
        <el-col :xs="12" :md="9" :lg="8" :sm="12">
          <div class="block" id="addDataPicker">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :lg="2" :md="2"
          >
          <el-button
            id="addButton"
            :disabled="this.isInSearch"
            v-on:click="onAdd"
            >{{ $t("Actions.ButtonAdd") }}</el-button
          ></el-col>
      </el-row>
    </el-form>
  </div>
</template>
