<template>
  <el-form-item
      :key="item.key"
      :label="item.name"
  >
    <el-row
        type="flex"
        :gutter="item.options.gutter ? item.options.gutter : 0"
        :justify="item.options.justify"
        :align="item.options.align"
    >
      <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
        <template v-for="citem in col.list">
          <el-form-item v-if="citem.type=='blank'" :label="citem.name" :prop="citem.model"
                        :key="citem.key">
            <slot :name="citem.model" :model="models"></slot>
          </el-form-item>
          <generate-form-item v-else
                              :key="citem.key"
                              :models.sync="models"
                              :remote="remote"
                              :rules="rules"
                              :widget="citem"
                              @input-change="onInputChange">
          </generate-form-item>
        </template>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
export default {
  name: "GenerateFormObject",
  props: ['item']
}
</script>

<style scoped>

</style>