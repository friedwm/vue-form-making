<template>
  <fm-making-form ref="makingForm" @updated-widget-form="widgetFormUpdated" upload preview generate-code generate-json clearable>
    <template slot="action">
    </template>
  </fm-making-form>
</template>

<script>
export default {
  mounted () {
  },
  methods:{
    widgetFormUpdated() {
      // console.log('widgetFormUpdated')
    },
  }
}
</script>
