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
            v-if="ready"
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
import {cloneDeep} from "lodash";

export default {
  name: 'fm-generate-form',
  components: {
    GenerateFormItem
  },
  props: ['widgetForm', 'remote', 'widgetModels'],
  data() {
    return {
      ready: false,
      models: {},
      rules: {}
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
      this.$refs.generateForm.resetFields()
    },
    onInputChange(value, field) {
      this.$emit('on-change', field, value, this.models)
    },
    maintainModels(widgets, models) {
      /*let modelKeys = []
      for (const widget in widgets) {
        let widgetType = widget.type;
        let modelKey = widget.model;
        if (widgetType !== 'grid') {
          modelKeys.push(modelKey);
        } else {
          for (const column in widget.columns) {

          }
        }
      }

      // 维护models
      for (const model in models) {
        if (modelKeys.indexOf(model) === -1) {
          delete models[model];
        } else {
          this.maintainModels()
        }
      }*/
      return models;
    },
  },
  created() {
    if (this.widgetModels && Object.keys(this.widgetModels).length) {
      // 为了让表单元素先生成自己的结构、默认值
      // 先对models进行维护，再赋值
      let models = cloneDeep(this.widgetModels);
      this.models = this.maintainModels(this.widgetForm.list, models);
    }

    this.ready = true;
  },
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
