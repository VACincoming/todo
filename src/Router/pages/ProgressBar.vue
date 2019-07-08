<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "../../components/eventbus";
import { namespace } from "vuex-class";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { State, Action } from "vuex-class";
import store from "@/store/index";
import Elems, { TodoState } from "@/store/modules/types";

const Todos = namespace("Todos");

@Component
export default class ProgressBar extends Vue {
  @Todos.State elems: any;
  onProgress(elems: any) {
    const completed = elems.filter((elem: any) => {
      return elem.done;
    });
    if (elems.length === 0) return 0;
    return Math.floor((completed.length / elems.length) * 100);
  }
}
</script>

<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center" align="center">
      <el-col :xs="10" :md="5" :lg="4" :sm="14" class="progressBar">
        <h3>ProgressBar</h3>
        <li class="li-progress">
          <el-progress
            :percentage="onProgress(this.elems)"
            type="circle"
          ></el-progress>
        </li>
      </el-col>
    </el-row>
    <!-- <router-view /> -->
  </div>
</template>
<style scoped></style>
