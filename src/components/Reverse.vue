<script>
import { Vue, Component } from "vue-property-decorator";
import {eventBus} from './eventbus'
@Component
export default class Reverse extends Vue {
  searchText = '';
  onReverse(){
    eventBus.$emit('on-reverse');
  }
  onSearch(){
    eventBus.$emit('on-search', this.searchText);
    // alert('rev ' + this.searchText);
  }
}
</script>

<template>
  <div class="reverse-wrapper">
    <el-form id="form">
      <el-row :gutter='1'>
        <el-col :span="6.5"><el-button v-on:click="onReverse">Reverse<i class="el-icon-sort" /></el-button> </el-col>
        <el-col :span="11"><el-input type="text" v-model="searchText"/></el-col>
        <el-col :span="4"><el-button icon="el-icon-search" v-on:click="onSearch">Search</el-button></el-col>
      </el-row>
    </el-form>
  </div>
</template>

