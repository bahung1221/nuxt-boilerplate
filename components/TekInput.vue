<template>
  <input
    :value="value"
    @input="e => $emit('input', e.target.vue)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  border: none;
  margin-top: 15px;
  width: 100%;
  height: 45px;
  background: #fff;
  box-shadow: $box-shadow;
}
</style>
