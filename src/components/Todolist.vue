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
  
  search(searchText, elems, oldElems){
    const newElems = oldElems.filter((elem) => {
      return elem.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    })
    if(searchText === ''){
      this.elems = oldElems;
    }else this.elems = newElems;
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

  onOpened(id){
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
            <el-button-group>
              <el-button @click="()=>onOpened(elem.id)"><i class="el-icon-edit"></i></el-button>
              <el-button @click="()=>onDeleted(elem.id, elems)"><i class="el-icon-delete"></i></el-button>
            </el-button-group>
        </el-row>
      </li>
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
</style>