<template>
  <div style="height:1000px;">
    <!--    <fm-making-form ref="makingForm" @updated-widget-form="widgetFormUpdated"
                        :exist-widget-form="e"
                        upload preview generate-code generate-json clearable>
          <template slot="action">
          </template>
        </fm-making-form>-->
            <el-button @click="reset">重填</el-button>
            <el-button @click="getData">获取数据</el-button>
            <fm-generate-form style="height:1000px;" ref="generateForm" insite="true"
                              :widgetForm="widgetForm"
                              :widgetModels="widgetModels" @on-change="changed">
            </fm-generate-form>
  </div>

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
  methods: {
    reset() {
      this.$refs.generateForm.reset();
    },
    async getData() {
      let data = await this.$refs.generateForm.getData();
      this.$alert(data, '标题名称', {
        confirmButtonText: '确定',
      });
    },
    changed(val) {

    },
    widgetFormUpdated() {
      console.log('widgetFormUpdated')
    },
    loadData() {
      console.log('start loadData')
      setTimeout(() => {
        this.e = '{"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":100,"showWordLimit":false,"clearable":true,"remoteFunc":"func_h759qgqi"},"name":"单行文本","key":"h759qgqi","model":"input_h759qgqi","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":300,"showWordLimit":false,"clearable":true,"remoteFunc":"func_7uwoc6vf"},"name":"多行文本","key":"7uwoc6vf","model":"textarea_7uwoc6vf","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":100,"showWordLimit":false,"clearable":true,"remoteFunc":"func_x1uwel0d"},"name":"单行文本","key":"x1uwel0d","model":"input_x1uwel0d","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"Option 3 Value","showLabel":true,"options":[{"value":"Option 1 Value","label":"Option 1 Label"},{"value":"Option 2 Value","label":"Option 2 Label"},{"value":"Option 3 Value","label":"Option 3 Label"}],"required":false,"width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_d7o0hmok","disabled":false},"name":"单选框组","key":"d7o0hmok","model":"radio_d7o0hmok","rules":[]},{"type":"group","icon":"icon-diy-com-textarea","columns":[{"span":24,"list":[{"type":"date","icon":"icon-date","options":{"defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","type":"date","format":"yyyy-MM-dd","timestamp":false,"required":false,"width":"","remoteFunc":"func_iat8hmed"},"name":"日期选择器","key":"iat8hmed","model":"date_iat8hmed","rules":[]},{"type":"number","icon":"icon-number","options":{"width":"","required":false,"defaultValue":0,"min":0,"max":100,"step":1,"disabled":false,"controlsPosition":"","remoteFunc":"func_tokb5ydp"},"name":"计数器","key":"tokb5ydp","model":"number_tokb5ydp","rules":[]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":300,"showWordLimit":false,"clearable":true,"remoteFunc":"func_44yamjut"},"name":"多行文本","key":"44yamjut","model":"textarea_44yamjut","rules":[]},{"type":"slider","icon":"icon-slider","options":{"defaultValue":0,"disabled":false,"required":false,"min":0,"max":100,"step":1,"showInput":false,"range":false,"width":"","remoteFunc":"func_tg7xmdvq"},"name":"滑块","key":"tg7xmdvq","model":"slider_tg7xmdvq","rules":[]}]}],"options":{"defaultValue":{},"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"width":"","validatorCheck":false,"validator":"","remoteFunc":"func_rlie9q5k","remoteOption":"","tableColumn":false,"subform":false,"hideLabel":false},"name":"子对象","key":"rlie9q5k","model":"group_rlie9q5k","rules":[]},{"type":"rate","icon":"icon-pingfen1","options":{"defaultValue":0,"max":5,"disabled":false,"allowHalf":false,"required":false,"remoteFunc":"func_4cdoj6nf"},"name":"评分","key":"4cdoj6nf","model":"rate_4cdoj6nf","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small"}}';
        this.widgetForm = JSON.parse(
            '{"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":200,"showWordLimit":false,"clearable":true,"remoteFunc":"func_81boh108"},"name":"描述","key":"81boh108","model":"descript","rules":[{"type":"string","message":"描述格式不正确"}]},{"type":"subform","icon":"icon-diy-com-textarea","columns":[{"span":24,"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":500,"showWordLimit":false,"clearable":true,"remoteFunc":"func_6o6aof0j"},"name":"标签列表","key":"6o6aof0j","model":"tag_list","rules":[{"type":"string","message":"标签列表格式不正确"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":500,"showWordLimit":false,"clearable":true,"remoteFunc":"func_nqf765eo"},"name":"断言结果","key":"nqf765eo","model":"assert_result","rules":[{"type":"string","message":"断言结果格式不正确"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":500,"showWordLimit":false,"clearable":true,"remoteFunc":"func_35nurvus"},"name":"断言说明","key":"35nurvus","model":"assert_explain","rules":[{"type":"string","message":"断言说明格式不正确"}]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":2000,"showWordLimit":false,"clearable":true,"remoteFunc":"func_aubriywn"},"name":"营养补充建议","key":"aubriywn","model":"nutrition_supplement_suggest","rules":[]},{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"1","showLabel":true,"options":[{"value":"0","label":"文字"},{"value":"1","label":"文章id"}],"required":true,"width":"","remote":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_uir419ik","disabled":false},"name":"公共文案类型","key":"uir419ik","model":"public_info_type","rules":[{"required":true,"message":"公共文案类型必须填写"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":500,"showWordLimit":false,"clearable":true,"remoteFunc":"func_1kavaak8"},"name":"公共文案|文章id","key":"1kavaak8","model":"public_info_desc","rules":[{"type":"string","message":"公共文案|文章id格式不正确"}]},{"type":"subform","icon":"icon-diy-com-textarea","columns":[{"span":24,"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":200,"showWordLimit":false,"clearable":true,"remoteFunc":"func_9kk9vyip"},"name":"专家名","key":"9kk9vyip","model":"expert_name","rules":[{"type":"string","message":"专家名格式不正确"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":500,"showWordLimit":false,"clearable":true,"remoteFunc":"func_6g6e67u9"},"name":"专家头像","key":"6g6e67u9","model":"expert_icon","rules":[{"type":"string","message":"专家头像格式不正确"}]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":200,"showWordLimit":false,"clearable":true,"remoteFunc":"func_8qwuco1i"},"name":"职称","key":"8qwuco1i","model":"technical_title","rules":[{"type":"string","message":"职称格式不正确"}]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":2000,"showWordLimit":false,"clearable":true,"remoteFunc":"func_be15rpwo"},"name":"职称简介","key":"be15rpwo","model":"technical_desc","rules":[]}]}],"options":{"defaultValue":{},"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"width":"","validatorCheck":false,"validator":"","remoteFunc":"func_2iy9wkog","remoteOption":"","tableColumn":false,"subform":true,"hideLabel":false},"name":"专家背书信息","key":"2iy9wkog","model":"expert_endorsement_list","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":200,"showWordLimit":false,"clearable":true,"remoteFunc":"func_alul1zfb"},"name":"商品标识","key":"alul1zfb","model":"sku_code","rules":[{"type":"string","message":"商品标识格式不正确"}]}]}],"options":{"defaultValue":{},"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"width":"","validatorCheck":false,"validator":"","remoteFunc":"func_j7nz1qfg","remoteOption":"","tableColumn":false,"subform":true,"hideLabel":false},"name":"标签结果","key":"j7nz1qfg","model":"label_result","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small"}}');
        this.widgetModels = JSON.parse(
            '{"descript":"132492","label_result":[{"tag_list":"孕期,吃DHA","assert_result":"DHA摄入充足","assert_explain":"您每天吃DHA补充剂，可以保证DHA的摄入量，请继续保持哦！","nutrition_supplement_suggest":"继续保持吃DHA的好习惯，每天摄入200mg，对宝宝大脑和视力发育有好处。","public_info_type":"0","public_info_desc":"","expert_endorsement_list":"","sku_code":"成人DHA-结果1"}]}');
        console.log('async got widgetModels')
      }, 3000);
    },
  },
  mounted() {
    this.loadData()
  }
}
</script>
