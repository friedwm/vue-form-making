<template>
  <fm-making-form ref="makingForm" @updated-widget-form="widgetFormUpdated" :exist-widget-form="e"
                  upload preview generate-code generate-json clearable>
    <template slot="action">
    </template>
  </fm-making-form>

  <!--  <fm-generate-form style="height:1000px;" ref="generateForm" insite="true"-->
  <!--                    :widgetForm="widgetForm"-->
  <!--                    :widgetModels="widgetModels">-->
  <!--  </fm-generate-form>-->
</template>

<script>
export default {
  data() {
    return {
      e: '',
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
      widgetModels: {}
    };
  },
  mounted() {
    // this.loadData();
  },
  methods: {
    widgetFormUpdated() {

    },
    // loadData() {
    //   setTimeout(() => {
    //     this.widgetForm = JSON.parse(
    //         '{"list":[{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"","showLabel":true,"options":[{"value":"Option 1 Value","label":"Option 1 Label"},{"value":"Option 2 Value","label":"Option 2 Label"},{"value":"Option 3 Value","label":"Option 3 Label"}],"required":false,"width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_iips4vnm","disabled":false},"name":"单选框组","key":"iips4vnm","model":"radio_iips4vnm","rules":[]},{"type":"subform","icon":"icon-diy-com-textarea","columns":[{"span":24,"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":100,"showWordLimit":false,"clearable":true,"remoteFunc":"func_w4tf2uuf"},"name":"单行文本","key":"w4tf2uuf","model":"input_w4tf2uuf","rules":[{"type":"string","message":"单行文本格式不正确"}]}]}],"options":{"defaultValue":{},"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"width":"","validatorCheck":false,"validator":"","remoteFunc":"func_qn24gm5d","remoteOption":"","tableColumn":false,"subform":true,"hideLabel":false},"name":"子数组","key":"qn24gm5d","model":"subform_qn24gm5d","rules":[]},{"type":"group","icon":"icon-diy-com-textarea","columns":[{"span":24,"list":[{"type":"select","icon":"icon-select","options":{"defaultValue":"","multiple":false,"disabled":false,"clearable":false,"placeholder":"","required":false,"showLabel":true,"width":"","options":[{"value":"Option 1 Value","label":"Option 1 Label"},{"value":"Option 2 Value","label":"Option 2 Label"},{"value":"Option 3 Value","label":"Option 3 Label"}],"remote":false,"filterable":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_4x5n4ehh"},"name":"下拉选择框","key":"4x5n4ehh","model":"select_4x5n4ehh","rules":[]},{"type":"switch","icon":"icon-switch","options":{"defaultValue":false,"required":false,"disabled":false,"remoteFunc":"func_8tjkxemk"},"name":"开关","key":"8tjkxemk","model":"switch_8tjkxemk","rules":[]}]}],"options":{"defaultValue":{},"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"width":"","validatorCheck":false,"validator":"","remoteFunc":"func_038d5wii","remoteOption":"","tableColumn":false,"subform":false,"hideLabel":false},"name":"子对象","key":"038d5wii","model":"group_038d5wii","rules":[]},{"type":"number","icon":"icon-number","options":{"width":"","required":false,"defaultValue":0,"min":0,"max":100,"step":1,"disabled":false,"controlsPosition":"","remoteFunc":"func_z36x1qyn"},"name":"计数器","key":"z36x1qyn","model":"number_z36x1qyn","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small"}}');
    //     this.widgetModels = JSON.parse(
    //         '{"radio_iips4vnm":"Option 2 Value","subform_qn24gm5d":[{"input_w4tf2uuf":"gsfdgsdgsdg"},{"input_w4tf2uuf":"asdfasfasfas"}],"group_038d5wii":{"select_4x5n4ehh":"Option 2 Value","switch_8tjkxemk":true},"number_z36x1qyn":4}');
    //   }, 2000);
    // },
  }
}
</script>
