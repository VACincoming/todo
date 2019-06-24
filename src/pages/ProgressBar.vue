<script>
import {Vue, Component} from "vue-property-decorator";
import {eventBus} from '../components/eventbus';
@Component
export default class ProgressBar extends Vue{
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
        <el-row type='flex' class='row-bg' justify="center" align="center">
            <el-col :span='10' class='progressBar' style='margin-right:100px'>
                <h2>ProgressBar</h2>
                <li class='li-progress'><el-progress :percentage="onProgress(this.$store.state.elems)" type='circle'></el-progress></li>
            </el-col>
        </el-row>
        <!-- <router-view /> -->
    </div>
</template>
<style scoped>
.progressBar{
    margin-right: -100px;
}
</style>

