import {genUniqKey} from '@/util/index'
import {cloneDeep} from 'lodash'
export default {
  methods: {
    cloneDeep(obj) {
      return cloneDeep(obj)
    },
    setSelected(element) {
      this.$store.commit('setSelectWidget', element)
    },
    initialized(element) {
      return element && element.key
    },
    isSelected(element) {
      return element.key === this.$store.state.selectWidget.key
    },
    widgetAdded(list, evt) {
      console.log('before widgetAdded', JSON.stringify(list), evt, evt.oldIndex, evt.newIndex, evt.oldDraggableIndex, evt.newDraggableIndex);
      let newIndex = evt.newIndex
      let key = genUniqKey()
      let widgetType = list[newIndex].type;
      let newObj = cloneDeep(list[newIndex])
      newObj = {
        ...newObj,
        options: {
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