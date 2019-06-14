// <script lang="ts">
// import { Vue, Component } from 'vue-property-decorator'
// import ActionButtons from '@/components/ActionButtons.vue'

// @Component({
//   components: {
//     ActionButtons,
//   },
// })
// export default class NewClusterForm extends Vue {
//   formData: any = {
//     name: '',
//     color: null,
//     type: 'flat',
//   }

//   rules = {
//     name: [
//       {
//         required: true,
//         validator: this.validateName,
//         trigger: 'change',
//       },
//       {
//         validator: this.validateName,
//         trigger: 'blur',
//       },
//     ],
//   }

//   validateName(rule, value, callback) {
//     if (!value || value.trim().length < 1) {
//       callback(new Error(this.$t('Clusters.NewClusterForm.clusterNameIsRequired').toString()))
//       return
//     }

//     callback()
//   }

//   onSubmit() {
//     (this.$refs.clusterForm as any)
//       .validate()
//       .then(() => this.$emit('add-cluster', Object.assign(this.formData, { name: this.formData.name.trim() })))
//   }

//   isFormValid() {
//     return this.formData.name.trim().length > 0
//   }
// }
// </script>

// <template>
//  <div class="card-container">
//     <h1 class="card-title">{{$t('Clusters.NewClusterForm.titleText')}}</h1>
//     <sm-card class="card-content">
//       <h2 class="card-header">{{$t('Clusters.NewClusterForm.headerText')}}</h2>
//       <sm-form
//         :rules="rules"
//         :inline="true"
//         :model="formData"
//         ref="clusterForm"
//         label-position="top"
//         @submit.native.prevent
//       >
//         <sm-row>
//           <sm-form-item :label="$t('Clusters.NewClusterForm.clusterNameInputLabel')" prop="name"
//                         class="form__item input-block">
//             <sm-input
//               autofocus
//               ref="name"
//               class="form__control"
//               v-model="formData.name"
//               :placeholder="$t('Clusters.NewClusterForm.clusterNamePlaceholder')"
//             />
//           </sm-form-item>
//           <sm-form-item :label="$t('Clusters.NewClusterForm.colorChooserLabel')">
//             <sm-color-picker v-model="formData.color" color-format="hex"></sm-color-picker>
//           </sm-form-item>
//         </sm-row>
//         <sm-form-item v-show="false" :label="$t('Clusters.NewClusterForm.typeSelectorLabel')">
//           <sm-radio-group v-model="formData.type">
//             <sm-radio label="flat">{{$t('Clusters.NewClusterForm.singleClusterLabel')}}</sm-radio>
//             <sm-radio label="tree">{{$t('Clusters.NewClusterForm.treeClusterLabel')}}</sm-radio>
//           </sm-radio-group>
//         </sm-form-item>
//         <sm-form-item class="form__item action-button">
//           <ActionButtons
//             @cancel="$emit('cancel')"
//             @confirm="onSubmit"
//             :confirmButtonText="$t('Clusters.NewClusterForm.confirmButtonText')"
//             :disabled="!isFormValid()"
//           />
//         </sm-form-item>
//       </sm-form>
//     </sm-card>
//  </div>
// </template>

// <style lang="scss" scoped>
// @import '../../assets/styles/components/card-form.scss';
// </style>