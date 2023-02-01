import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectWidget: {}
  },
  mutations: {
    setSelectWidget(state, widget) {
      state.selectWidget = widget
    },

    clearSelectWidget(state) {
      state.selectWidget = {}
    },
  }
})