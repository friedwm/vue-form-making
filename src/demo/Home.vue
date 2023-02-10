<template>
  <fm-making-form ref="makingForm" @updated-widget-form="widgetFormUpdated" v-if="e"
                  :exist-widget-form="e"
                  upload preview generate-code generate-json clearable>
    <template slot="action">
    </template>
  </fm-making-form>

  <!--    <fm-generate-form style="height:1000px;" ref="generateForm" insite="true"-->
  <!--                      :widgetForm="widgetForm"-->
  <!--                      :widgetModels="widgetModels">-->
  <!--    </fm-generate-form>-->
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
    this.loadData();
  },
  methods: {
    widgetFormUpdated() {
      console.log('widgetFormUpdated')
    },
    loadData() {
      console.log('start loadData')
      setTimeout(() => {
        this.e = '{"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":100,"showWordLimit":false,"clearable":true,"remoteFunc":"func_h759qgqi"},"name":"单行文本","key":"h759qgqi","model":"input_h759qgqi","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":300,"showWordLimit":false,"clearable":true,"remoteFunc":"func_7uwoc6vf"},"name":"多行文本","key":"7uwoc6vf","model":"textarea_7uwoc6vf","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":100,"showWordLimit":false,"clearable":true,"remoteFunc":"func_x1uwel0d"},"name":"单行文本","key":"x1uwel0d","model":"input_x1uwel0d","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"Option 3 Value","showLabel":true,"options":[{"value":"Option 1 Value","label":"Option 1 Label"},{"value":"Option 2 Value","label":"Option 2 Label"},{"value":"Option 3 Value","label":"Option 3 Label"}],"required":false,"width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_d7o0hmok","disabled":false},"name":"单选框组","key":"d7o0hmok","model":"radio_d7o0hmok","rules":[]},{"type":"group","icon":"icon-diy-com-textarea","columns":[{"span":24,"list":[{"type":"date","icon":"icon-date","options":{"defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","type":"date","format":"yyyy-MM-dd","timestamp":false,"required":false,"width":"","remoteFunc":"func_iat8hmed"},"name":"日期选择器","key":"iat8hmed","model":"date_iat8hmed","rules":[]},{"type":"number","icon":"icon-number","options":{"width":"","required":false,"defaultValue":0,"min":0,"max":100,"step":1,"disabled":false,"controlsPosition":"","remoteFunc":"func_tokb5ydp"},"name":"计数器","key":"tokb5ydp","model":"number_tokb5ydp","rules":[]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":300,"showWordLimit":false,"clearable":true,"remoteFunc":"func_44yamjut"},"name":"多行文本","key":"44yamjut","model":"textarea_44yamjut","rules":[]},{"type":"slider","icon":"icon-slider","options":{"defaultValue":0,"disabled":false,"required":false,"min":0,"max":100,"step":1,"showInput":false,"range":false,"width":"","remoteFunc":"func_tg7xmdvq"},"name":"滑块","key":"tg7xmdvq","model":"slider_tg7xmdvq","rules":[]}]}],"options":{"defaultValue":{},"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"width":"","validatorCheck":false,"validator":"","remoteFunc":"func_rlie9q5k","remoteOption":"","tableColumn":false,"subform":false,"hideLabel":false},"name":"子对象","key":"rlie9q5k","model":"group_rlie9q5k","rules":[]},{"type":"rate","icon":"icon-pingfen1","options":{"defaultValue":0,"max":5,"disabled":false,"allowHalf":false,"required":false,"remoteFunc":"func_4cdoj6nf"},"name":"评分","key":"4cdoj6nf","model":"rate_4cdoj6nf","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small"}}';
        this.widgetForm = JSON.parse(
            '{"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":100,"showWordLimit":false,"clearable":true,"remoteFunc":"func_h759qgqi"},"name":"单行文本","key":"h759qgqi","model":"input_h759qgqi","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":300,"showWordLimit":false,"clearable":true,"remoteFunc":"func_7uwoc6vf"},"name":"多行文本","key":"7uwoc6vf","model":"textarea_7uwoc6vf","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":100,"showWordLimit":false,"clearable":true,"remoteFunc":"func_x1uwel0d"},"name":"单行文本","key":"x1uwel0d","model":"input_x1uwel0d","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"Option 3 Value","showLabel":true,"options":[{"value":"Option 1 Value","label":"Option 1 Label"},{"value":"Option 2 Value","label":"Option 2 Label"},{"value":"Option 3 Value","label":"Option 3 Label"}],"required":false,"width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_d7o0hmok","disabled":false},"name":"单选框组","key":"d7o0hmok","model":"radio_d7o0hmok","rules":[]},{"type":"group","icon":"icon-diy-com-textarea","columns":[{"span":24,"list":[{"type":"date","icon":"icon-date","options":{"defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","type":"date","format":"yyyy-MM-dd","timestamp":false,"required":false,"width":"","remoteFunc":"func_iat8hmed"},"name":"日期选择器","key":"iat8hmed","model":"date_iat8hmed","rules":[]},{"type":"number","icon":"icon-number","options":{"width":"","required":false,"defaultValue":0,"min":0,"max":100,"step":1,"disabled":false,"controlsPosition":"","remoteFunc":"func_tokb5ydp"},"name":"计数器","key":"tokb5ydp","model":"number_tokb5ydp","rules":[]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":300,"showWordLimit":false,"clearable":true,"remoteFunc":"func_44yamjut"},"name":"多行文本","key":"44yamjut","model":"textarea_44yamjut","rules":[]}]}],"options":{"defaultValue":{},"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"width":"","validatorCheck":false,"validator":"","remoteFunc":"func_rlie9q5k","remoteOption":"","tableColumn":false,"subform":false,"hideLabel":false},"name":"子对象","key":"rlie9q5k","model":"group_rlie9q5k","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small"}}');
        this.widgetModels = JSON.parse(
            '{"input_h759qgqi":"abcabcc","textarea_7uwoc6vf":"sdfasasdfasf","input_x1uwel0d":"asdfasfasfsdfaf","radio_d7o0hmok":"Option 3 Value","group_rlie9q5k":{"date_iat8hmed":"2023-02-07","number_tokb5ydp":14,"textarea_44yamjut":"sadfasfasfasf"}}');
      }, 2000);
    },
  }
}
</script>
