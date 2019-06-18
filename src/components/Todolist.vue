<script>
import { Vue , Component} from "vue-property-decorator"
import {eventBus} from './eventbus.js'
@Component
export default class Todolist extends Vue {
  id = 0;
  createList (label){
    return{
      id: ++this.id,
      label,
      done:false,
    }
  }

  onDeleted(id, elems){
    const idx = elems.findIndex((el) => el.id === id);
    const newElems = [
      ...elems.slice(0,idx),
      ...elems.slice(idx+1)
    ]
    this.elems = newElems;
    this.oldElems = newElems;
  }
  onEdit(id){
    this.$prompt('Please input your correct task', 'Editor', {
          confirmButtonText: 'Edit',
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          this.elems[id-1].label = value;
          this.$message({
            type: 'success',
            message: 'Your task is:' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });       
        });
  }


  oldElems = [];
  elems =[];
  matches = false;

    search(searchText, elems, oldElems){
      const newElems = this.oldElems.filter((elem) => {
        return elem.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
      })
      if(newElems.length === 0) this.matches = true;
      else this.matches = false;
      if(searchText === ''){
        this.elems = this.oldElems;
      }else this.elems = newElems; 
  }

  mounted(){
    this.elems = [
      this.createList('Learn Vue'),
      this.createList("Make ToDo"),
      this.createList("Make Coffee"),
      ];
    this.oldElems = this.elems;
    eventBus.$on('on-add',(text) =>{
    this.elems.push(this.createList(text));
    this.matches = false;
    })
    eventBus.$on('on-reverse', (elems) =>{
    this.elems = this.elems.reverse();
    })
    eventBus.$on('on-search', (searchText) => this.search(searchText,this.elems, this.oldElems));
  }
onProgress(elems){
    const completed = elems.filter((elem) => {
      return elem.done;
    });
    if(elems.length === 0 ) return 0;
    return Math.floor((completed.length/elems.length)*100);
  }
}
</script>

<template>
<div>
      <!-- <ul class="list-wrapper" id="list"> -->
        <h4 v-show='matches' class="animated rubberBand">No matches</h4>
        <transition-group name="list" tag="ul">
        <li v-for="(elem, id) in elems" v-bind:key="id" class="list-item">
          <el-row type='flex' class='row-bg' justify="space-between" >
            <el-col :span='12'>
              <el-checkbox v-model="elem.done"><p>{{ elem.label }}</p></el-checkbox></el-col>
              <el-col :span='12'><el-button-group > 
                <el-button @click="()=>onEdit(elem.id)"><i class="el-icon-edit"></i></el-button>
                <el-button @click="()=>onDeleted(elem.id, elems)"><i class="el-icon-delete"></i></el-button>
              </el-button-group></el-col>
              
          </el-row>
        </li>
        </transition-group>
        <!-- <li class='li-progress'><el-progress :percentage="onProgress(this.elems)" type='circle'></el-progress></li> -->
        
      <!-- </ul> -->
    </div>
</template>

<style>
h4{
  display: flex;
  justify-content: center;
  align-items: center;
}
ul{
  padding: 0;
}
.el-button-group{
  display: flex;
}
li{
  text-decoration: none;
  list-style: none;
}
.is-checked .el-checkbox__label{
  text-decoration: line-through;
}
.li-progress{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.list-item {
  /* display: inline-block; */
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.flip-list-move {
  transition: transform 1s;
}
</style>