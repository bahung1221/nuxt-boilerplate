<template>
  <div class="wrapper">
    <v-header/>
    <nuxt />
    <v-footer />
  </div>
</template>

<script>
import VHeader from '@/components/Header'
import VFooter from '@/components/Footer'

export default {
  components: {
    VHeader,
    VFooter,
  },
  computed: {},
  mounted() {
    let windowWidth = $(window).width()
    window.addEventListener('resize', () => {
      const newWidth = $(window).width()
      if (windowWidth !== newWidth) {
        windowWidth = newWidth
        this.$store.dispatch('checkDeviceWidth')
      }
    })
  },
}
</script>
