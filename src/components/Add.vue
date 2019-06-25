<script>
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus";
@Component
export default class Add extends Vue {
  text = "";
  activate = true;
  onAdd() {
    eventBus.$emit("on-add", this.text);
    this.text = "";
  }
  isInSearchFlag() {
    return !!this.text && !this.$store.state.isInSearch;
  }
  updated() {
    if (this.isInSearchFlag) {
      this.activate = true;
    } else {
      this.activate = false;
    }
  }
}
</script>

<template>
  <div class="add-wrapper">
    <el-form id="form">
      <el-row :gutter="5">
        <p v-show="this.$store.state.isInSearch">
          Что бы добавить Task, выйдите с режима поиска
        </p>
        <el-col :span="18"
          ><el-input
            class="addInput"
            :disabled="this.$store.state.isInSearch"
            type="text"
            v-model="text"
        /></el-col>
        <el-col :span="6"
          ><el-button :disabled="this.$store.state.isInSearch" v-on:click="onAdd"
            >Add</el-button
          ></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>
