<script>
import {Vue, Component} from "vue-property-decorator";
import {eventBus} from './eventbus';
@Component
export default class ProgressBar extends Vue{

//     mounted(){
//         eventBus.$on('onProgress', alert(this.elems));
//     }
}

</script>

<template>
    <div>
        <h2>ProgressBar</h2>

        <!-- <router-view /> -->
    </div>
</template>
