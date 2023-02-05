<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <template v-if="widgetTypeIs('grid')">
      <el-row
          type="flex"
          :gutter="widget.options.gutter ? widget.options.gutter : 0"
          :justify="widget.options.justify"
          :align="widget.options.align">
        <el-col v-for="(col, colIndex) in widget.columns" :key="colIndex"
                :span="col.span ? col.span : 0">

          <generate-form-item v-for="(el, i) in col.list"
                              :key="i"
                              :widget="el"
                              :models="models"
                              :rules="rules"
                              :index="i">
          </generate-form-item>
        </el-col>
      </el-row>
    </template>
    <template v-if="widgetTypeIs('group')">
      <generate-form-item v-for="(el, i) in widget.columns[0].list"
                          :key="i"
                          :widget="el"
                          :models="models[widget.model]"
                          :rules="rules"
                          :index="i">
      </generate-form-item>
    </template>
    <template v-if="widgetTypeIs('subform')">
      <div class="subform-row" v-for="(subItem, subItemIndex) in models[widget.model]">
        <!--        是个数组-->
        <div class="subitem-index">
          <el-tag effect="plain">#{{ subItemIndex + 1 }}</el-tag>
          <el-button circle type="danger" class="el-icon-delete" size="small"
                     @click.stop="models[widget.model].splice(subItemIndex,1)"></el-button>
        </div>
        <generate-form-item v-for="(el, i) in widget.columns[0].list"
                            :key="i"
                            :widget="el"
                            :models="subItem"
                            :rules="rules"
                            :index="subItemIndex">
        </generate-form-item>
      </div>
      <el-button type="text" icon="el-icon-plus" @click.stop="addSubItem()">添加</el-button>
    </template>
    <template v-if="widgetTypeIs('input')">
      <el-input
          v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
          type="number"
          v-model.number="dataModel"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :disabled="widget.options.disabled"
      ></el-input>
      <el-input
          v-else
          type="text"
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :maxlength="widget.options.maxlength"
          :show-word-limit="widget.options.showWordLimit"
      ></el-input>
    </template>

    <template v-if="widgetTypeIs('textarea')">
      <el-input type="textarea" :rows="5"
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}"
                :maxlength="widget.options.maxlength"
                :show-word-limit="widget.options.showWordLimit"
      ></el-input>
    </template>

    <template v-if="widgetTypeIs('number')">
      <el-input-number
          v-model="dataModel"
          :style="{width: widget.options.width}"
          :step="widget.options.step"
          controls-position="right"
          :disabled="widget.options.disabled"
          :min="widget.options.min"
          :max="widget.options.max"
      ></el-input-number>
    </template>

    <template v-if="widgetTypeIs('radio')">
      <el-radio-group v-model="dataModel"
                      :style="{width: widget.options.width}"
                      :disabled="widget.options.disabled"
      >
        <el-radio
            :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
            :label="item.value"
            v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
            :key="index"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widgetTypeIs('checkbox')">
      <el-checkbox-group v-model="dataModel"
                         :style="{width: widget.options.width}"
                         :disabled="widget.options.disabled"
      >
        <el-checkbox

            :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
            :label="item.value"
            v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
            :key="index"
        >
          <template v-if="widget.options.remote">{{ item.label }}</template>
          <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widgetTypeIs('time')">
      <el-time-picker
          v-model="dataModel"
          :is-range="widget.options.isRange"
          :placeholder="widget.options.placeholder"
          :start-placeholder="widget.options.startPlaceholder"
          :end-placeholder="widget.options.endPlaceholder"
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
          :arrowControl="widget.options.arrowControl"
          :value-format="widget.options.format"
          :style="{width: widget.options.width}"
      >
      </el-time-picker>
    </template>

    <template v-if="widgetTypeIs('date')">
      <el-date-picker
          v-model="dataModel"
          :type="widget.options.type"
          :placeholder="widget.options.placeholder"
          :start-placeholder="widget.options.startPlaceholder"
          :end-placeholder="widget.options.endPlaceholder"
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
          :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
          :format="widget.options.format"
          :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widgetTypeIs('rate')">
      <el-rate v-model="dataModel"
               :max="widget.options.max"
               :disabled="widget.options.disabled"
               :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widgetTypeIs('color')">
      <el-color-picker
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widgetTypeIs('select')">
      <el-select
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :multiple="widget.options.multiple"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :filterable="widget.options.filterable"
      >
        <el-option
            v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
            :key="item.value" :value="item.value"
            :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
      </el-select>
    </template>

    <template v-if="widgetTypeIs('switch')">
      <el-switch
          v-model="dataModel"
          :disabled="widget.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="widgetTypeIs('slider')">
      <el-slider
          v-model="dataModel"
          :min="widget.options.min"
          :max="widget.options.max"
          :disabled="widget.options.disabled"
          :step="widget.options.step"
          :show-input="widget.options.showInput"
          :range="widget.options.range"
          :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widgetTypeIs('imgupload')">
      <fm-upload
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :style="{'width': widget.options.width}"
          :width="widget.options.size.width"
          :height="widget.options.size.height"
          :token="widget.options.token"
          :domain="widget.options.domain"
          :multiple="widget.options.multiple"
          :length="widget.options.length"
          :is-qiniu="widget.options.isQiniu"
          :is-delete="widget.options.isDelete"
          :min="widget.options.min"
          :is-edit="widget.options.isEdit"
          :action="widget.options.action"
      >
      </fm-upload>
    </template>

    <template v-if="widgetTypeIs('editor')">
      <vue-editor
          v-model="dataModel"
          :style="{width: widget.options.width}"
      >
      </vue-editor>
    </template>

    <template v-if="widgetTypeIs('cascader')">
      <el-cascader
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :options="widget.options.remoteOptions"
      >

      </el-cascader>
    </template>

    <template v-if="widgetTypeIs('text')">
      <span>{{ dataModel }}</span>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import {cloneDeep} from 'lodash'

export default {
  name: 'generateFormItem',
  props: ['widget', 'models', 'rules', 'remote'],
  components: {
    FmUpload
  },
  data () {
    return {
      dataModel: '',
      addingModel: {},
    }
  },
  created () {
    console.log('created', this.widget, this.models)
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc]((data) => {
        this.widget.options.remoteOptions = data.map(item => {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      })
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }

    // 在这里构造本item的model和rules
    let widgetType = this.widget.type;
    let model = this.widget.model;
    switch (widgetType) {
      case 'grid':
        for (const col of this.widget.columns) {
          for (const w of col.list) {
            this.setModelIfNotExist(this.models, w.model, '')
          }
        }
        break;
      case 'group':
        this.setModelIfNotExist(this.models, model, {});
        this.dataModel = {}
        break;
      case 'subform':
        this.setModelIfNotExist(this.models, model, []);
        this.dataModel = [];
        this.addingModel = this.buildSubformItem(this.widget.columns[0].list);
        break;
      default:
        // 其余的简单model
        this.setModelIfNotExist(this.models, model, '');
        this.dataModel = ''
    }
  },
  methods: {
    setModelIfNotExist(models, model, val) {
      if (!(model in models)) {
        this.$set(models, model, val)
        console.log('init model in models', model, val)
      }
    },
    addSubItem() {
      let subItem = cloneDeep(this.addingModel);
      console.log('add subItem', subItem)
      this.model.push(subItem)
    },
    buildSubformItem(subwidgetList) {
      console.info('subwidgetList', subwidgetList)
      let subItem = {};
      for (const widget of subwidgetList) {
        let model = widget.model;
        let widgetType = widget.type;
        switch (widgetType) {
          case 'subform':
            subItem[model] = [];
            break;
          case 'group':
            subItem[model] = this.buildSubformItem(widget.columns[0].list)
            break;
          case 'grid':
            for (const col of this.widget.columns) {
              subItem = {...subItem, ...this.buildSubformItem(col.list)}
            }
            break;
          default:
            subItem[model] = ''
        }
      }
      console.log('buildSubformItem', subwidgetList, subItem)
      return subItem;
    },
    widgetTypeIs(wt) {
      return this.widgetType === wt;
    },
  },
  computed: {
    widgetType() {
      return this.widget.type;
    },
    model() {
      return this.models[this.widget.model];
    },
  },
  watch: {
    dataModel: {
      deep: true,
      handler(val) {
        this.models[this.widget.model] = val
        // console.log('watch dataModel change, update into Models')
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler (val) {
        // console.log('watch models change update into dataModel')
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
