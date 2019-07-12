<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus";
import "../assets/styles/main.css";
import { namespace } from "vuex-class";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { State, Action } from "vuex-class";
import store from "@/store/index";
import { TodoState, OtherTodoState } from "../store/modules/types";
import moment from "moment";
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const Todos = namespace("Todos");
const OtherTodo = namespace("OtherTodo");

@Component
export default class Todolist extends Vue {
  id = 2;
  @Todos.State elems: any;
  @Todos.State oldElems: any;
  @Todos.Action InitList: any;
  @Todos.Action AddList: any;

  @Todos.Action EmptySearch: any;

  @OtherTodo.State matches: any;
  @OtherTodo.State isInSearch: any;

  @OtherTodo.Action Alert: any;
  @OtherTodo.Action AlertSpace: any;
  @OtherTodo.Action NoMatches: any;
  @OtherTodo.Action DeleteItem: any;
  @OtherTodo.Action Search: any;

  createList(label: string, dataStart:string, dataEnd:string, failed:boolean) {
    return {
      id: ++this.id,
      label,
      done: false,
      failed,
      dataStart,
      dataEnd,
    };
  }
  onDeletedItem(id: number) {
    this.DeleteItem(id);
  }
  onEditItem(id: number) {
    this.$prompt(
      this.$t("EditorDescription").toString(),
      this.$t("EditorTitle").toString(),
      {
        confirmButtonText: this.$t("Edit").toString(),
        cancelButtonText: this.$t("Cancel").toString()
      }
      // { passive: true }
    )
      .then((value: any) => {
        const idx = this.elems.findIndex((el: any) => el.id === id);
        value = value.value;
        if (value.trim().length >= 2 && value.trim().length < 50) {
          this.elems[idx].label = value.trim();
          this.$message({
            type: "success",
            message: this.$t("EditSuccess").toString() + value.trim()
          });
        } else {
          this.$message({
            type: "info",
            message: this.$t("EditElseMessage").toString()
          });
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: this.$t("EditCatchMessage").toString()
        });
      });
  }
  searchData(valueData:any){
    valueData[0] = moment(valueData[0]).format('L');
    valueData[1] = moment(valueData[1]).format('L');
    const newElems = this.oldElems.filter((elem:any) => {
      return elem.dataStart >= valueData[0] && elem.dataEnd <= valueData[1];
    })
    if (newElems.length === 0) this.NoMatches(true);
    else this.NoMatches(false);
 const payload = { key1: newElems, key2: true };
      this.Search(payload);
  }

  search(searchText: string) {
    const newElems = this.oldElems.filter((elem: any) => {
      return elem.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    });
    if (newElems.length === 0) this.NoMatches(true);
    else this.NoMatches(false);

    if (searchText === "") {
      const payload = { key1: this.oldElems, key2: false };
      this.Search(payload);
    } else {
      const payload = { key1: newElems, key2: true };
      this.Search(payload);
    }
  }
  
  mounted() {
    this.InitList();
    this.InitList();
    eventBus.$on("on-add", (text: string, value1:string) => {
      const dataStart = moment(value1[0]).format('L');
      const dataEnd  = moment(value1[1]).format('L');
      let failed:boolean = false;
      if(dataEnd < moment().format('L')){
        failed = true;
      }
      if (text.trim().length < 1) {
        this.AlertSpace(true);
        setTimeout(() => {
          this.AlertSpace(false);
        }, 2000);
        return;
      }
      if (this.elems.some((x: any) => x.label === text.trim())) {
        this.Alert(true);
        setTimeout(() => {
          this.Alert(false);
        }, 2000);
        return;
      }
      const task = this.createList(text.trim(), dataStart, dataEnd, failed);
      this.AddList(task);
      this.NoMatches(false);
    });
    eventBus.$on("on-search", (searchText: string) => this.search(searchText));
    eventBus.$on("on-search-data", (valueData: any) => this.searchData(valueData));

  }
}
</script>

<template>
  <div>
    <h4 v-show="this.matches" class="animated rubberBand">
      No matches
    </h4>
    <el-row :gutter="1">
      <el-col class='indicator' :span="8">
        <h3>Tasks:</h3>
      </el-col>
      <el-col class='indicator' :span="6">
        <h3>Start:</h3>
      </el-col>
       <el-col class='indicator' :span="6">
        <h3>End:</h3>
      </el-col>
      <el-col class='indicator' :span="4">
        <h3>Actions:</h3>
      </el-col>
    </el-row>
    <transition-group name="list" tag="ul">
      <li v-for="elem in this.elems" v-bind:key="elem.id" class="list-item" v-bind:class="{ failed: elem.failed}">
          <el-row type="flex" class="row-bg" justify="start" align="middle">
              <el-col :span="8">
                <el-checkbox v-model="elem.done"
                  ><p>{{ elem.label }}</p>
                  <!-- <p>{{elem.failed}}</p> -->
                    </el-checkbox
                ></el-col
              ><el-col :span="6">
                  <p>{{elem.dataStart}}</p>
                </el-col>
                <el-col :span="6">
                  <p>{{elem.dataEnd}}</p>
                </el-col>
              <el-col :span="4"
                ><el-button-group>
                  <el-button @click="() => onEditItem(elem.id)" class='edit icon-color'
                    ><i class="el-icon-edit"></i
                  ></el-button>
                  <el-button @click="() => onDeletedItem(elem.id)" class='delete icon-color'
                    ><i class="el-icon-delete"></i
                  ></el-button> 
                  <el-button v-if=elem.failed class='failed_icon-color icon-color'>
                  <i class='el-icon-warning-outline'/>
                </el-button>
                </el-button-group
              ></el-col>
             
          </el-row>
      </li>
    </transition-group>
  </div>
</template>
