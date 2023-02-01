<template>
  <el-form-item class="widget-col widget-view "
                v-if="initialized(element)"
                :class="{active: isSelected(element), 'is_req': element.options.required}"
                :label="element.name"
                @click.native.self="setSelected(element)"
  >
    <el-row
        type="flex"
        :gutter="element.options.gutter ? element.options.gutter : 0"
        :justify="element.options.justify"
        :align="element.options.align"
    >
      <el-col v-for="(col, colIndex) in element.columns" :key="colIndex"
              :span="col.span ? col.span : 0">

        <draggable
            class="group-draggable"
            v-model="col.list"
            :no-transition-on-drag="true"
            v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
            @add="(evt)=>widgetAdded(col.list, evt)"
        >
          <transition-group name="fade" tag="div" class="widget-col-list">
            <template v-for="(el, i) in col.list">
              <widget-form-item
                  :key="el.key"
                  v-if="el.key"
                  :element="el"
                  :index="i"
                  :data="col">
              </widget-form-item>
            </template>

          </transition-group>

        </draggable>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: "WidgetFormGroupItem",
  props: ['element'],
  components: {
    WidgetFormItem: () => import("@/components/WidgetFormItem.vue")
    , Draggable
  }
}
</script>

<style scoped>

</style>