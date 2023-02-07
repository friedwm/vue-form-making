<template>
  <div class="widget-form-container">
    <div v-if="!data.list.length" class="form-empty">{{
        $t('fm.description.containerEmpty')
      }}
    </div>
    <el-form :size="data.config.size" label-suffix=":" :label-position="data.config.labelPosition"
             :label-width="data.config.labelWidth + 'px'">

      <div class="widget-form-list">
        <draggable class="widget-draggable"
                   :list="data.list"
                   v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                   @add="(evt)=>widgetAdded(data.list, evt)"
        >
          <widget-form-item v-for="(element, index) of data.list"
                            :element="element"
                            :index="index"
                            v-if="initialized(element)"
                            :key="element.key"
                            :data="data"
                            @click.native.stop="widgetSelected(element)"
          ></widget-form-item>
        </draggable>
      </div>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from '@/components/WidgetFormItem.vue'
import Store from '@/store/index'
import {genUniqKey} from "@/util";
import {cloneDeep} from "lodash";

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
    initialized(element) {
      return element && element.key
    },
    widgetAdded(list, evt) {
      let newIndex = evt.newIndex
      let key = genUniqKey()
      let element = list[newIndex];
      if (element.key) {
        console.log('element has been initialized, skip init', element)
        return
      }
      let widgetType = element.type;
      let newObj = cloneDeep(element)
      newObj = {
        ...newObj,
        options: {
          ...(newObj.options),
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: widgetType + '_' + key,
        rules: []
      }

      this.$set(list, newIndex, newObj)
      Store.setSelectWidget(newObj);
    },
    widgetSelected(widget) {
      Store.setSelectWidget(widget);
    },
  }
}
</script>
