<template>
  <el-row class="widget-col" v-if="initialized(element)"
          type="flex"
          :class="{active: isSelected(element)}"
          :gutter="element.options.gutter ? element.options.gutter : 0"
          :justify="element.options.justify"
          :align="element.options.align"
          @click.native.stop="setSelected(element)">
    <el-col v-for="(col, colIndex) in element.columns" :key="colIndex"
            :span="col.span ? col.span : 0">

      <draggable
          v-model="col.list"
          :no-transition-on-drag="true"
          v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
          @add="(evt)=>widgetAdded(col.list, evt)"
      >
        <transition-group name="fade" tag="div" class="widget-col-list">
          <widget-form-item v-for="(el, i) in col.list"
                            :key="el.key"
                            v-if="el.key"
                            :element="el"
                            :index="i"
                            :data="col">
          </widget-form-item>
        </transition-group>

      </draggable>
    </el-col>
  </el-row>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: "WidgetFormGridItem",
  props: ['element'],
  components: {
    WidgetFormItem: () => import("@/components/WidgetFormItem.vue"),
    Draggable
  },
  methods: {}
}
</script>

<style scoped>

</style>