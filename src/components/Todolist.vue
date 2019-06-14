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
    // console.log(elems[1].id);
    // console.log(...elems);
    // console.log(elems);
    // alert(this.elems + 'id - ' + id);
    const idx = elems.findIndex((el) => el.id === id);
    const newElems = [
      ...elems.slice(0,idx),
      ...elems.slice(idx+1)
    ]
    this.elems = newElems;
    this.oldElems = newElems;
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
            <p>{{ elem.label }}</p>
            <el-button-group>
              <el-button><i class="el-icon-edit"></i></el-button>
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
</style>