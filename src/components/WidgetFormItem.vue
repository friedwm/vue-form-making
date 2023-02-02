<template>
  <!--  可以拖拽的元素-->
  <div class="widget-view" :class="{active: isSelected(element)}" @click.stop="setSelected(element)">
    <!--    grid, group, subform-->
    <template v-if="isCompound(element)">
      <el-form-item class="widget-col"
                    v-if="initialized(element)"
                    :class="{'is_req': element.options.required}"
                    :label="element.name"
      >
        <el-row class="widget-col"
                type="flex"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.native.stop="setSelected(element)">
          <el-col v-for="(col, colIndex) in element.columns" :key="colIndex"
                  :span="col.span ? col.span : 0">

            <draggable
                :list="col.list"
                :no-transition-on-drag="true"
                v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                @add="(evt)=>widgetAdded(col.list, evt)"
            >
              <transition-group name="fade" tag="div" class="widget-col-list">
                <widget-form-item v-for="(el, i) in col.list"
                                  :key="i"
                                  :element="el"
                                  :index="i"
                                  :data="col">
                </widget-form-item>
              </transition-group>
            </draggable>
          </el-col>
        </el-row>
      </el-form-item>
    </template>
    <!--    原始表单元素-->
    <template v-else>
      <!--  原始el表单内容-->
      <el-form-item v-if="initialized(element)"
                    :class="{'is_req': element.options.required}"
                    :label="element.name"
      >
        <template v-if="element.type === 'input'">
          <el-input
              v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
              :placeholder="element.options.placeholder"
              :disabled="element.options.disabled"
              :maxlength="element.options.maxlength"
              :show-word-limit="element.options.showWordLimit"
          ></el-input>
        </template>

        <template v-if="element.type === 'textarea'">
          <el-input type="textarea" :rows="5"
                    v-model="element.options.defaultValue"
                    :style="{width: element.options.width}"
                    :disabled="element.options.disabled"
                    :placeholder="element.options.placeholder"
                    :maxlength="element.options.maxlength"
                    :show-word-limit="element.options.showWordLimit"
          ></el-input>
        </template>

        <template v-if="element.type === 'number'">
          <el-input-number
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :controls-position="element.options.controlsPosition"
              :style="{width: element.options.width}"
          ></el-input-number>
        </template>

        <template v-if="element.type === 'radio'">
          <el-radio-group v-model="element.options.defaultValue"
                          :style="{width: element.options.width}"
                          :disabled="element.options.disabled"
          >
            <el-radio
                :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                :label="item.value" v-for="(item, index) in element.options.options"
                :key="item.value + index"

            >
              {{ element.options.showLabel ? item.label : item.value }}
            </el-radio>
          </el-radio-group>
        </template>

        <template v-if="element.type === 'checkbox'">
          <el-checkbox-group v-model="element.options.defaultValue"
                             :style="{width: element.options.width}"
                             :disabled="element.options.disabled"
          >
            <el-checkbox
                :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                :label="item.value" v-for="(item, index) in element.options.options"
                :key="item.value + index"
            >
              {{ element.options.showLabel ? item.label : item.value }}
            </el-checkbox>
          </el-checkbox-group>
        </template>

        <template v-if="element.type === 'time'">
          <el-time-picker
              v-model="element.options.defaultValue"
              :is-range="element.options.isRange"
              :placeholder="element.options.placeholder"
              :start-placeholder="element.options.startPlaceholder"
              :end-placeholder="element.options.endPlaceholder"
              :readonly="element.options.readonly"
              :disabled="element.options.disabled"
              :editable="element.options.editable"
              :clearable="element.options.clearable"
              :arrowControl="element.options.arrowControl"
              :style="{width: element.options.width}"
          >
          </el-time-picker>
        </template>

        <template v-if="element.type === 'date'">
          <el-date-picker
              v-model="element.options.defaultValue"
              :type="element.options.type"
              :is-range="element.options.isRange"
              :placeholder="element.options.placeholder"
              :start-placeholder="element.options.startPlaceholder"
              :end-placeholder="element.options.endPlaceholder"
              :readonly="element.options.readonly"
              :disabled="element.options.disabled"
              :editable="element.options.editable"
              :clearable="element.options.clearable"
              :style="{width: element.options.width}"
          >
          </el-date-picker>
        </template>

        <template v-if="element.type === 'rate'">
          <el-rate v-model="element.options.defaultValue"
                   :max="element.options.max"
                   :disabled="element.options.disabled"
                   :allow-half="element.options.allowHalf"
          ></el-rate>
        </template>

        <template v-if="element.type === 'color'">
          <el-color-picker
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :show-alpha="element.options.showAlpha"
          ></el-color-picker>
        </template>

        <template v-if="element.type === 'select'">
          <el-select
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :multiple="element.options.multiple"
              :clearable="element.options.clearable"
              :placeholder="element.options.placeholder"
              :style="{width: element.options.width}"
          >
            <el-option v-for="item in element.options.options" :key="item.value" :value="item.value"
                       :label="element.options.showLabel?item.label:item.value"></el-option>
          </el-select>
        </template>

        <template v-if="element.type==='switch'">
          <el-switch
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
          >
          </el-switch>
        </template>

        <template v-if="element.type==='slider'">
          <el-slider
              v-model="element.options.defaultValue"
              :min="element.options.min"
              :max="element.options.max"
              :disabled="element.options.disabled"
              :step="element.options.step"
              :show-input="element.options.showInput"
              :range="element.options.range"
              :style="{width: element.options.width}"
          ></el-slider>
        </template>

        <template v-if="element.type==='imgupload'">
          <fm-upload
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :style="{'width': element.options.width}"
              :width="element.options.size.width"
              :height="element.options.size.height"
              token="xxx"
              domain="xxx"
          >

          </fm-upload>
        </template>

        <template v-if="element.type === 'cascader'">
          <el-cascader
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :clearable="element.options.clearable"
              :placeholder="element.options.placeholder"
              :style="{width: element.options.width}"
              :options="element.options.remoteOptions"
          >

          </el-cascader>
        </template>

        <template v-if="element.type === 'editor'">
          <vue-editor
              v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
          >
          </vue-editor>
        </template>

        <template v-if="element.type==='blank'">
          <div
              style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">
            {{ $t('fm.components.fields.blank') }}
          </div>
        </template>

        <template v-if="element.type === 'text'">
          <span>{{ element.options.defaultValue }}</span>
        </template>
      </el-form-item>
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
import Draggable from 'vuedraggable'

export default {
  name: 'WidgetFormItem',
  props: ['element', 'index', 'data'],
  components: {
    FmUpload, Draggable
  },
  computed: {
    selected() {
      return this.$store.state.selectWidget.key === this.element.key;
    },
  },
  methods: {
    isCompound(element) {
      return ['grid', 'group', 'subform'].indexOf(element.type) !== -1
    },
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
