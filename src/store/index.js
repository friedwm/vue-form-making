import {reactive} from "vue";

export default reactive({
  state: {
    selectWidget: {},
    enterWidgetKeys: []
  },
  setSelectWidget(widget) {
    this.state.selectWidget = widget
  },

  clearSelectWidget() {
    this.state.selectWidget = {}
  },

  addMouseEnterWidgetKey(key) {
    if (this.state.enterWidgetKeys.findIndex(k => k === key) === -1) {
      this.state.enterWidgetKeys.push(key);
    }
  },

  delMouseLeaveWidgetKey(key) {
    let idx = this.state.enterWidgetKeys.findIndex(k => k === key)
    if (idx !== -1) {
      this.state.enterWidgetKeys.splice(idx, 1)
    }
  },

  currentHoverElementKey() {
    let state = this.state;
    if (state.enterWidgetKeys && state.enterWidgetKeys.length) {
      return state.enterWidgetKeys[state.enterWidgetKeys.length - 1];
    }
    return null;
  },
})