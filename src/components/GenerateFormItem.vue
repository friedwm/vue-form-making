<template>
  <el-form-item :label="widget.name" :class="{grid_item: widgetTypeIs('grid')}" :prop="currentPath"
                :rules="widget.rules">
    <!--    元素还是在根model上-->
    <template v-if="widgetTypeIs('grid')">
      <el-row
          type="flex"
          :gutter="widget.options.gutter ? widget.options.gutter : 0"
          :justify="widget.options.justify"
          :align="widget.options.align">
        <el-col v-for="(col, colIndex) in widget.columns" :key="colIndex"
                :span="col.span ? col.span : 0">

          <generate-form-item v-for="(el, i) in col.list"
                              :path="path"
                              :key="i"
                              :widget="el"
                              :models="models"
                              :index="i">
          </generate-form-item>
        </el-col>
      </el-row>
    </template>
    <template v-if="widgetTypeIs('group')">
      <generate-form-item v-for="(el, i) in widget.columns[0].list"
                          :path="path + widget.model+ '.'"
                          :key="i"
                          :widget="el"
                          :models="models[widget.model]"
      >
      </generate-form-item>
    </template>
    <template v-if="widgetTypeIs('subform')">
      <div class="subform-row" v-for="(subItem, subItemIndex) in models[widget.model]"
           :key="subItemIndex">
        <!--        是个数组-->
        <div class="subitem-index">
          <el-tag effect="plain">#{{ subItemIndex + 1 }}</el-tag>
          <el-popconfirm class="subitem-del"
                         @confirm="models[widget.model].splice(subItemIndex,1)"
                         title="确定删除吗？"
          >
            <el-button circle type="danger" class="el-icon-delete" size="small"
                       slot="reference"></el-button>
          </el-popconfirm>

        </div>
        <generate-form-item v-for="(el, i) in widget.columns[0].list"
                            :path="path + widget.model + '.' + subItemIndex + '.' "
                            :key="i"
                            :widget="el"
                            :models="subItem"
        >
        </generate-form-item>
      </div>
      <el-button type="text" icon="el-icon-plus" @click.stop="addSubItem()">添加</el-button>
    </template>
    <template v-if="widgetTypeIs('input')">
      <el-input
          v-if="widget.options.dataType === 'number' || widget.options.dataType === 'integer' || widget.options.dataType === 'float'"
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
          :clearable="widget.options.clearable"
      ></el-input>
    </template>

    <template v-if="widgetTypeIs('textarray')">
      <el-button type="text" icon="el-icon-plus"
                 @click.stop="dataModel.push('')">添加
      </el-button>
      <template v-for="(item,i) in dataModel">
        <div :key="i" class="textarray">
          <el-input
              class="textarray-input"
              v-if="widget.options.dataType === 'number' || widget.options.dataType === 'integer' || widget.options.dataType === 'float'"
              type="number"
              v-model.number="dataModel[i]"
              :placeholder="widget.options.placeholder"
              :style="{width: widget.options.width}"
              :disabled="widget.options.disabled"
          >
            <el-button slot="append" icon="el-icon-delete"
                       @click="dataModel.splice(i,1)"></el-button>
          </el-input>
          <el-input
              v-else
              class="textarray-input"
              type="text"
              v-model="dataModel[i]"
              :disabled="widget.options.disabled"
              :placeholder="widget.options.placeholder"
              :style="{width: widget.options.width}"
              :maxlength="widget.options.maxlength"
              :show-word-limit="widget.options.showWordLimit"
              :clearable="widget.options.clearable"
          >
            <el-button slot="append" icon="el-icon-delete"
                       @click="dataModel.splice(i,1)"></el-button>
          </el-input>
        </div>
      </template>

    </template>

    <template v-if="widgetTypeIs('textarea')">
      <el-input type="textarea" :rows="5"
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}"
                :maxlength="widget.options.maxlength"
                :show-word-limit="widget.options.showWordLimit"
                :clearable="widget.options.clearable"
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
  props: ['widget', 'models', 'remote', 'path'],
  components: {
    FmUpload
  },
  data() {
    let initDataModel = this.models[this.widget.model]
    console.log('item init val', this.widget.model, this.models, initDataModel);
    return {
      dataModel: initDataModel,
      addingModel: {},
    };
  },
  methods: {
    defaultValueOfWidget() {
      let def = this.widget.options.defaultValue
      if (this.widget.multiple && !(def instanceof Array)) {
        def = []
      }
      return def
    },
    setModelIfNotExist(models, model, val) {
      if (!(model in models)) {
        console.log('model not in models', model, models, val)
        this.$set(models, model, val)
      } else if (Object.getPrototypeOf(models[model]) !== Object.getPrototypeOf(val)) {
        console.log('model type invalid', model, val)
        this.$set(models, model, val);
      }
    },
    addSubItem() {
      let subItem = cloneDeep(this.addingModel);
      if (!this.models[this.widget.model]) {
        this.models[this.widget.model] = []
      }
      this.models[this.widget.model].push(subItem);
    },
    buildSubformItem(subwidgetList) {
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
            if (widget.type === 'checkbox' || widget.options.multiple) {
              subItem[model] = [];
            } else {
              subItem[model] = '';
            }
        }
      }
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
    modelKey() {
      return this.widget.model;
    },
    currentPath() {
      return this.path + this.widget.model;
    },
    existVal() {
      let exist = '';
      let widgetType = this.widgetType;
      switch (widgetType) {
        case 'grid':
          exist = '';
          break;
        case 'group':
          exist = {}
          break;
        case 'subform':
          exist = []
          break;
        default:
          exist = this.models[this.widget.model];
          break;
      }
      console.log('existVal', this.widget.model, this.models, exist);
      return exist;
    },
  },
  watch: {
    existVal: {
      deep: true,
      handler(newVal) {
        if (newVal !== this.dataModel) {
          this.dataModel = newVal;
        }
      }
    },
    dataModel: {
      deep: true,
      handler(val) {
        let modelKey = this.modelKey;
        this.models[modelKey] = val
        console.log('item models changed to', this.models, modelKey, val)
        this.$emit('input-change', val, modelKey)
      }
    },
  },
  created() {
    console.log('form item creating', this.widget.model)
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
    let modelKey = this.modelKey;
    switch (this.widgetType) {
      case 'grid':
        break;
      case 'group':
        this.setModelIfNotExist(this.models, modelKey, {});
        break;
      case 'subform':
        this.setModelIfNotExist(this.models, modelKey, []);
        this.addingModel = this.buildSubformItem(this.widget.columns[0].list);
        break;
      default:
        // 其余的简单model
        let defaultVal = cloneDeep(this.widget.options.defaultValue) || '';
        if (this.widget.options.multiple && !(defaultVal instanceof Array)) {
          defaultVal = []
        }

        this.setModelIfNotExist(this.models, this.widget.model, defaultVal);
    }

    console.log('form item created', this.widget.model)
  },
  mounted() {
    console.log('form item mounted', this.widget.model)
  }
}
</script>
