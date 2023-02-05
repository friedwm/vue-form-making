import {genUniqKey} from '@/util/index'
import {cloneDeep} from 'lodash'

export default {
  methods: {
    enterEle(element) {
      console.log('enter element', element.key)
      this.$store.commit('addMouseEnterWidgetKey', element.key)
    },
    leaveEle(element) {
      console.log('leave element', element.key)
      this.$store.commit('delMouseLeaveWidgetKey', element.key)
    },
    cloneDeep(obj) {
      return cloneDeep(obj)
    },
    setSelected(element) {
      this.$store.commit('setSelectWidget', element);
    },
    initialized(element) {
      return element && element.key
    },
    isSelected(element) {
      return element.key === this.$store.state.selectWidget.key
    },
    isHovered(element) {
      return element.key
          === this.$store.state.enterWidgetKeys[this.$store.state.enterWidgetKeys.length
          - 1];
    },
    isCompound(element) {
      return ['grid', 'group', 'subform'].indexOf(element.type) !== -1
    },
    widgetAdded(list, evt) {
      // console.log('before widgetAdded', JSON.stringify(list), evt, evt.oldIndex, evt.newIndex, evt.oldDraggableIndex, evt.newDraggableIndex);
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

      /*if (widgetType === 'radio' || widgetType === 'checkbox' || widgetType
          === 'select') {
        newObj = {
          ...newObj,
          options: {
            ...newObj.options,
            options: newObj.options.options.map(item => ({
              ...item
            }))
          }
        }
      }

      // 为grid初始化特定配置项columns
      if (widgetType === 'grid' || widgetType === 'group' || widgetType
          === 'subform') {
        newObj = {
          ...newObj,
          columns: newObj.columns.map(item => ({...item}))
        }
      }*/

      this.$set(list, newIndex, newObj)

      this.$store.commit('setSelectWidget', newObj)
      console.log('initialized element', newObj)
    },
  },
}