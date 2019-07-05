<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus";
import "../assets/styles/main.css";
import { namespace } from "vuex-class";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { State, Action } from "vuex-class";
import store from "@/store/index";
import { TodoState, OtherTodoState } from "../store/modules/types";
// import { otherTodo } from '../store/modules/otherTodo';

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

  createList(label: string) {
    return {
      id: ++this.id,
      label,
      done: false
    };
  }

  onDeletedItem(id: number) {
    this.DeleteItem(id);
  }
  onEditItem(id: number) {
    this.$prompt(
      "Please input your correct task",
      "Editor",
      {
        confirmButtonText: "Edit",
        cancelButtonText: "Cancel"
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
            message: "Your task is:" + value.trim()
          });
        } else {
          this.$message({
            type: "info",
            message:
              "Input canceled, value length < 2 or > 50 and no space and start line"
          });
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "Input canceled"
        });
      });
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
    eventBus.$on("on-add", (text: string) => {
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
      const task = this.createList(text.trim());
      this.AddList(task);
      this.NoMatches(false);
    });
    eventBus.$on("on-search", (searchText: string) => this.search(searchText));
  }
}
</script>

<template>
  <div>
    <h4 v-show="this.matches" class="animated rubberBand">
      No matches
    </h4>
    <transition-group name="list" tag="ul">
      <li v-for="elem in this.elems" v-bind:key="elem.id" class="list-item">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-checkbox v-model="elem.done"
              ><p>{{ elem.label }}</p></el-checkbox
            ></el-col
          >
          <el-col :span="12"
            ><el-button-group>
              <el-button @click="() => onEditItem(elem.id)"
                ><i class="el-icon-edit"></i
              ></el-button>
              <el-button @click="() => onDeletedItem(elem.id)"
                ><i class="el-icon-delete"></i
              ></el-button> </el-button-group
          ></el-col>
        </el-row>
      </li>
    </transition-group>
  </div>
</template>
