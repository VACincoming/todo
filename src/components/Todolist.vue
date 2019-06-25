<script>
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus.js";
import "../assets/styles/main.css";
import { namespace } from "vuex-class";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

@Component
export default class Todolist extends Vue {
  id = 0;
  matches = false;
  createList(label) {
    return {
      id: ++this.$store.state.id,
      label,
      done: false
    };
  }

  onDeletedItem(id) {
    this.$store.dispatch("DeleteItem", id);
  }
  onEditItem(id) {
    this.$prompt(
      "Please input your correct task",
      "Editor",
      {
        confirmButtonText: "Edit",
        cancelButtonText: "Cancel"
      },
      { passive: true }
    )
      .then(({ value }) => {
        const idx = this.$store.state.elems.findIndex(el => el.id === id);
        if (value.trim().length >= 2 && value.trim().length < 50) {
          this.$store.state.elems[idx].label = value.trim();
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

  search(searchText) {
    const newElems = this.$store.state.oldElems.filter(elem => {
      return elem.label.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    });

    if (newElems.length === 0) this.$store.dispatch("noMatches", true);
    else this.$store.dispatch("noMatches", false);

    if (searchText === "") {
      const payload = { key1: this.$store.state.oldElems, key2: false };
      this.$store.dispatch("Search", payload);
    } else {
      const payload = { key1: newElems, key2: true };
      this.$store.dispatch("Search", payload);
    }
  }
  mounted() {
    this.$store.dispatch("InitList");
    this.$store.dispatch("InitList");
    eventBus.$on("on-add", text => {
      if (text.trim().length < 1) {
        this.$store.dispatch("AlertSpace", true);
        setTimeout(() => {
          this.$store.dispatch("AlertSpace", false);
        }, 2000);
        return;
      }
      if (this.$store.state.elems.some(x => x.label === text.trim())) {
        this.$store.dispatch("Alert", true);
        setTimeout(() => {
          this.$store.dispatch("Alert", false);
        }, 2000);
        return;
      }
      this.$store.dispatch("AddList", this.createList(text.trim()));
      this.matches = false;
    });
    eventBus.$on("on-search", searchText => this.search(searchText));
  }
}
</script>

<template>
  <div>
    <h4 v-show="this.$store.state.matches" class="animated rubberBand">
      No matches
    </h4>
    <transition-group name="list" tag="ul">
      <li
        v-for="elem in this.$store.state.elems"
        v-bind:key="elem.id"
        class="list-item"
      >
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
