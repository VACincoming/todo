<script>
import { Vue, Component } from "vue-property-decorator";
import {eventBus} from './eventbus'
@Component
export default class Add extends Vue {
  text = "";
  onAdd () {
    eventBus.$emit('on-add', this.text);
    this.text='';
  }
}
</script>

<template>
  <div class="add-wrapper">
    <el-form id="form">
      <el-row :gutter='5'>
        <el-col :span="18"><el-input type="text" v-model='text'/></el-col>
        <el-col :span="6"><el-button :disabled=!this.text v-on:click="onAdd">Add</el-button></el-col>
      </el-row>
    </el-form>
  </div>
</template>
