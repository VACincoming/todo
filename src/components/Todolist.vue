<script>
import { Vue , Component} from "vue-property-decorator"
import {eventBus} from './eventbus.js'
@Component
export default class Todolist extends Vue {
  id = 0;
  createList = (label) => {
    return{
      id: ++this.id,
      label,
      done:false,
    }
  }

  elems = [
     this.createList('Learn Vue'),
     this.createList("Make ToDo"),
     this.createList("Make Coffee"),
   ]
  oldElems = this.elems;
  


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
          alert(id);
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
  search(searchText, elems, oldElems){
    const newElems = oldElems.filter((elem) => {
      return elem.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    })
    if(searchText === ''){
      this.elems = oldElems;
    }else this.elems = newElems;
  }

  onProgress = (elems) =>{
    const completed = elems.filter((elem) => {
      return elem.done;
    });
    if(elems.length === 0 ) return 0;
    return Math.floor((completed.length/elems.length)*100);
  }

  mounted(){
    eventBus.$on('on-add',(text) =>{
    this.elems.push(this.createList(text));
    })
    eventBus.$on('on-reverse', (elems) =>{
    this.elems = this.elems.reverse();
    })
    eventBus.$on('on-search', (searchText) => this.search(searchText,this.elems, this.oldElems));
  }
}
</script>

<template>
    <ul class="list-wrapper" id="list">
      <li v-for="(elem, index) in elems" v-bind:key="index">
        <el-row type='flex' class='row-bg' justify="space-between">
            <el-checkbox v-model="elem.done"><p>{{ elem.label }}</p></el-checkbox>
            <el-button-group > 
              <el-button @click="()=>onEdit(elem.id)"><i class="el-icon-edit"></i></el-button>
              <el-button @click="()=>onDeleted(elem.id, elems)"><i class="el-icon-delete"></i></el-button>
            </el-button-group>
        </el-row>
      </li>
      <li class='li-progress'><el-progress :percentage="onProgress(this.elems)" type='circle'></el-progress></li>
    </ul>
    
</template>

<style>
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
ul{
  margin-left: -9%;
}
</style>