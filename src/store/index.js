import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectWidget: {},
    enterWidgetKeys: []
  },
  mutations: {
    setSelectWidget(state, widget) {
      state.selectWidget = widget
    },

    clearSelectWidget(state) {
      state.selectWidget = {}
    },

    addMouseEnterWidgetKey(state, key) {
      if (state.enterWidgetKeys.findIndex(k => k === key) === -1) {
        state.enterWidgetKeys.push(key);
      }
    },

    delMouseLeaveWidgetKey(state, key) {
      let idx = state.enterWidgetKeys.findIndex(k => k === key)
      if (idx !== -1) {
        state.enterWidgetKeys.splice(idx, 1)
      }
    },
  },
  getters: {
    currentHoverElementKey(state) {
      if (state.enterWidgetKeys && state.enterWidgetKeys.length) {
        return state.enterWidgetKeys[state.enterWidgetKeys.length - 1];
      }
      return null;
    },
  }
})