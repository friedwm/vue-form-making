<template>
  <div class="widget-form-container">
    <div v-if="!data.list.length" class="form-empty">{{
        $t('fm.description.containerEmpty')
      }}
    </div>
    <el-form :size="data.config.size" label-suffix=":" :label-position="data.config.labelPosition"
             :label-width="data.config.labelWidth + 'px'">

      <draggable class="widget-form-draggable"
                 :list="data.list"
                 v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                 @add="(evt)=>widgetAdded(data.list, evt)"
      >
        <transition-group name="fade" tag="div" class="widget-form-list">
          <widget-form-item v-for="(element, index) of data.list"
                            :element="element"
                            :index="index"
                            v-if="initialized(element)"
                            :key="element.key"
                            :data="data"
                            @click.native.stop="widgetSelected(element)"
          ></widget-form-item>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from '@/components/WidgetFormItem.vue'

export default {
  name: 'WidgetForm',
  components: {
    Draggable,
    WidgetFormItem,
  },
  props: ['data'],
  data() {
    return {
    }
  },
  mounted() {
    document.body.ondrop = function (event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    widgetSelected(widget) {
      this.$store.commit('setSelectWidget', widget);
    },
  }
}
</script>
