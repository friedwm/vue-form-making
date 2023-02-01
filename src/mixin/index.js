import {genUniqKey} from '@/util/index'

export default {
  methods: {
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
      console.log('before widgetAdded', JSON.stringify(list), evt);
      let newIndex = evt.newIndex
      let key = genUniqKey()
      let widgetType = list[newIndex].type;
      console.log('newAdded element', key, widgetType, list[newIndex], evt.newIndex, list.length)
      this.$set(list, newIndex, {
        ...list[newIndex],
        options: {
          ...list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: widgetType + '_' + key,
        rules: []
      })

      // 为radio, checkbox, select初始化特定配置项options
      if (widgetType === 'radio' || widgetType === 'checkbox' || widgetType
          === 'select') {
        this.$set(list, newIndex, {
          ...list[newIndex],
          options: {
            ...list[newIndex].options,
            options: list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      // 为grid初始化特定配置项columns
      if (widgetType === 'grid' || widgetType === 'group' || widgetType
          === 'subform') {
        this.$set(list, newIndex, {
          ...list[newIndex],
          columns: list[newIndex].columns.map(item => ({...item}))
        })
      }

      this.$store.commit('setSelectWidget', list[newIndex])
      console.log('initialized element', list[newIndex])
    },
  },
}