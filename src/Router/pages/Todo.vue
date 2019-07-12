<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FilterTodo from "@/components/FilterTodo.vue";
import Add from "@/components/Add.vue";
import Todolist from "@/components/Todolist.vue";
import { namespace } from "vuex-class";

import { TodoState, OtherTodoState } from "@/store/modules/types";
const OtherTodo = namespace("OtherTodo");

import "@/assets/styles/main.css";
import { Option } from "element-ui";
@Component({
  components: {
    Add,
    Todolist,
    FilterTodo
  }
})
export default class Todo extends Vue {
  @OtherTodo.State alertMsg: any;
  @OtherTodo.State alertMsgSpace: any;
}
</script>

<template>
  <div id="todo">
    <el-container>
      <el-main>
        <el-row type="flex" class="row-bg">
          <el-col :offset="5" :xs="24" :sm="24" :md="24" :lg="15">
            <!-- <el-select v-model="value" @change='setLocale($event)' placeholder="Select">
              <el-option
                v-for="item in this.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <!-- <a href="#" @click="setLocale('en')">ENG</a>
            <br>
            <a href="#" @click="setLocale('ru')">RUS</a> -->
            <el-alert
              v-show="this.alertMsg"
              :title="$t('AlertTitle')"
              type="error"
              :description="$t('AlertSpaceMsg')"
              show-icon
              center
            >
            </el-alert>
            <el-alert
              v-show="this.alertMsgSpace"
              title="Error alert"
              type="error"
              :description="$t('AlertMsg')"
              show-icon
              center
            >
            </el-alert>
            <h1>{{ $t("Title") }}</h1>
            <Add />
            <FilterTodo />
            <todolist />
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
