<script>
import { Vue , Component} from "vue-property-decorator"
import {eventBus} from './eventbus.js'
import '../assets/styles/main.css'
import { namespace } from "vuex-class"
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'

// const store = namespace();
// const elems = namespace('elems');
@Component
export default class Todolist extends Vue {
  // @store.Action AddList;
  // @store.State elems;
  id = 0;
  createList(label){
    return {
      id: ++this.id,
      label,
      done:false,
    }
    // call action with data(task)
  }

  onDeletedItem(id){
    this.$store.dispatch('DeleteItem', id)
  }
  onEditItem(id){
    this.$prompt('Please input your correct task', 'Editor', {
          confirmButtonText: 'Edit',
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          if(value.length >= 2 && value.length < 50){
            this.$store.state.elems[id-1].label = value;
            this.$message({
              type: 'success',
              message: 'Your task is:' + value
            });
          }else{
            this.$message({
              type: 'info',
              message: 'Input canceled, value length < 2 or > 50',
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled',
          });       
        });
  }



  matches = false;
  
  search(searchText, elems, oldElems){
    // console.log(oldElems);
    console.log(elems);
    const newElems = oldElems.filter((elem) => {
      return elem.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    })
    if(newElems.length === 0) this.matches = true;
    else this.matches = false;
    if(searchText === ''){
      elems = oldElems;
    }else elems = newElems; 
  }

  mounted(){
      // const oldElems = this.$store.state.elems;
      // let testObj = this.createList('Make Coffee');
      this.$store.dispatch('AddList', this.createList('Make Awesome App'));
      this.$store.dispatch('AddList', this.createList('Make Coffee'));
      this.$store.dispatch('AddList', this.createList('Learn Todo'));
      this.oldElems = this.$store.state.elems;

    eventBus.$on('on-add',(text) => {
      this.$store.dispatch('AddList', this.createList(text));
      this.matches = false;
    })
    eventBus.$on('on-search', (searchText) => this.search(searchText,this.$store.state.elems, this.oldElems));
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
      <h4 v-show='this.$store.state.matches' class="animated rubberBand">No matches</h4>
       <transition-group name="list" tag="ul">
          <li v-for="(elem, id) in this.$store.state.elems" v-bind:key="id" class="list-item">
            <el-row type='flex' class='row-bg' justify="space-between" >
              <el-col :span='12'>
                <el-checkbox v-model="elem.done"><p>{{ elem.label }}</p></el-checkbox></el-col>
                <el-col :span='12'><el-button-group > 
                  <el-button @click="()=>onEditItem(elem.id)"><i class="el-icon-edit"></i></el-button>
                  <el-button @click="()=>onDeletedItem(elem.id)"><i class="el-icon-delete"></i></el-button>
                </el-button-group></el-col>
            </el-row>
          </li>
        </transition-group>
        <li class='li-progress'><el-progress :percentage="onProgress(this.$store.state.elems)" type='circle'></el-progress></li>
    </div>
</template>

