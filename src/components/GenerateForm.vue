<template>
  <div class="fm-style">
    <el-form ref="generateForm"
             class="generate-form"
             label-suffix=":"
             :size="widgetForm.config.size"
             :model="models" :rules="rules" :label-position="widgetForm.config.labelPosition"
             :label-width="widgetForm.config.labelWidth + 'px'">
      <!--      利用generate-form-item递归生成嵌套表单元素-->
      <template v-for="widget in widgetForm.list">
        <generate-form-item
            path=""
            :key="widget.key"
            :widget="widget"
            :models="models"
            :remote="remote"
            @input-change="onInputChange">
        </generate-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenerateFormItem from './GenerateFormItem'

export default {
  name: 'fm-generate-form',
  components: {
    GenerateFormItem
  },
  props: ['widgetForm', 'remote', 'widgetModels'],
  data() {
    return {
      models: {},
      rules: {},
    }
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error(this.$t('fm.message.validError')).message)
          }
        })
      })
    },
    reset() {
      this.resetData(this.models)
    },
    resetData(data) {
      for (const k in data) {
        let v = data[k];
        if (v instanceof Array) {
          data[k] = []
        } else if (v instanceof Object) {
          this.resetData(v)
        } else {
          data[k] = '';
        }
      }
    },
    onInputChange(value, field) {
      this.$emit('on-change', field, value, this.models)
    },
    maintainModels(widgets, modelStructure, models) {
      return models;
    },
  },
  watch: {
    widgetModels: {
      deep: true,
      handler(newVal) {
        this.models = this.maintainModels(this.widgetForm.list, this.models, newVal);
        console.log('form models changed', newVal)
      },
    },
  },
  created() {
    console.log('generate form created')
  },
  mounted() {
    console.log('generate form mounted')
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
