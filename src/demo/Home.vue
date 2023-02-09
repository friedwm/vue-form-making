<template>
  <fm-making-form ref="makingForm" @updated-widget-form="widgetFormUpdated" :exist-widget-form="e"
                  upload preview generate-code generate-json clearable>
    <template slot="action">
    </template>
  </fm-making-form>
</template>

<script>
export default {
  data() {
    return {
      e: ''
    };
  },
  mounted() {
  },
  methods: {
    widgetFormUpdated() {
      // console.log('widgetFormUpdated')
    },
  }
}
</script>
