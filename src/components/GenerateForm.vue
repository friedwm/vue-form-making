<template>
  <div class="fm-style">
    <el-form ref="generateForm"
             class="generate-form"
             label-suffix=":"
             :size="data.config.size"
             :model="models" :rules="rules" :label-position="data.config.labelPosition"
             :label-width="data.config.labelWidth + 'px'">
<!--      利用generate-form-item递归生成嵌套表单元素-->
      <template v-for="widget in data.list">
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
  props: ['data', 'remote', 'value'],
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
    data: {
      deep: true,
      handler(val) {
        this.generateModel(val.list)
      }
    },
    value: {
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
