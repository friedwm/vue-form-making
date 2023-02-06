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
            :models.sync="models"
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
      rules: {}
    }
  },
  created() {

  },
  mounted() {
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
    refresh() {

    }
  },
  watch: {
    widgetModels: {
      deep: true,
      handler(val) {
        console.log(JSON.stringify(val))
        this.models = {...this.models, ...val}
      }
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
