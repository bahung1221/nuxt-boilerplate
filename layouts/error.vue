<template>
  <div class="container">
    <div class="error">
      {{ error.statusCode }}
    </div>
    <a
      class="back-btn"
      :href="localePath('/')"
    >{{ $t('home') }}</a>
  </div>
</template>

<script>
import i18n from '@/i18n/common.js'

export default {
  i18n: { messages: i18n },
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped></style>
