<script>
import { Vue, Component } from "vue-property-decorator";
import {eventBus} from './eventbus'
@Component
export default class Add extends Vue {
  text = "";
  activate = false;
  onAdd () {
    eventBus.$emit('on-add', this.text);
    this.text='';
  }
  
  updated(){
  // console.log('activate');
    // (this.text && this.$store.state.isInSearch) ? this.activate = false : this.activate = true ;
    if(!!this.text && !this.$store.state.isInSearch){
      this.activate = true;
    } else{
      this.activate = false;
    }
    

}
}
</script>

<template>
  <div class="add-wrapper">
    <el-form id="form">
      <el-row :gutter='5'>
        <p v-show='this.$store.state.isInSearch'>Что бы добавить Task, выйдите с режима поиска</p>
        <el-col :span="18"><el-input type="text" v-model='text'/></el-col>
        <el-col :span="6"><el-button :disabled="!this.activate" v-on:click="onAdd">Add</el-button></el-col>
      </el-row>
    </el-form>
  </div>
</template>
