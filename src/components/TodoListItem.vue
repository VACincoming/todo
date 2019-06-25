<script>
import { Vue, Component } from "vue-property-decorator";
import { eventBus } from "./eventbus.js";
@Component
export default class TodoListItem extends Vue {}
</script>

<template>
  <div>
    <p>123</p>
    <transition-group name="list" tag="ul">
      <li v-for="(elem, id) in elems" v-bind:key="id" class="list-item">
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
              <el-button @click="() => onDeletedItem(elem.id, elems)"
                ><i class="el-icon-delete"></i
              ></el-button> </el-button-group
          ></el-col>
        </el-row>
      </li>
    </transition-group>
  </div>
</template>
