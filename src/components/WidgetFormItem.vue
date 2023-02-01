<template>
  <!--  可以拖拽的元素-->
  <div class="widget-view">
    <!--    布局-->
    <template v-if="element.type === 'grid'">
      <widget-form-grid-item :element="element"></widget-form-grid-item>
    </template>
    <!--      对象-->
    <template v-else-if="element.type === 'group'">
      <widget-form-group-item :element="element"></widget-form-group-item>
    </template>
    <!--    子表单-->
    <template v-else-if="element.type === 'subform'">
      <widget-form-sub-form-item :element="element"></widget-form-sub-form-item>
    </template>
    <!--    原始表单元素-->
    <template v-else>
      <widget-form-elementary-item v-if="initialized(element)" :key="element.key"
                                   :element="element"></widget-form-elementary-item>
    </template>
    <!--    操作区-->
    <div class="widget-view-action widget-col-action"
         v-if="selected">
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <!--    拖拽区域-->
    <div class="widget-view-drag widget-col-drag"
         v-if="selected">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>
  </div>
</template>

<script>
import FmUpload from './Upload'
import WidgetFormElementaryItem from "@/components/WidgetFormElementaryItem.vue";
import WidgetFormGridItem from "@/components/WidgetFormGridItem.vue";
import WidgetFormGroupItem from "@/components/WidgetFormGroupItem.vue";
import WidgetFormSubFormItem from "@/components/WidgetFormSubFormItem.vue";

export default {
  name: 'WidgetFormItem',
  props: ['element', 'index', 'data'],
  components: {
    WidgetFormElementaryItem,
    WidgetFormGridItem,
    WidgetFormGroupItem,
    WidgetFormSubFormItem,
    FmUpload,
  },
  computed: {
    selected() {
      return this.$store.state.selectWidget.key === this.element.key;
    },
  },
  methods: {
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.$store.commit('clearSelectWidget');
        } else {
          this.$store.commit('setSelectWidget', this.data.list[index - 1])
        }
      } else {
        this.$store.commit('setSelectWidget', this.data.list[index + 1])
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
  }
}
</script>
