<template>
  <button><slot /></button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  border-radius: $border-radius;
  color: #fff;
  font-size: 15px;
  height: 45px;
  padding: 8px 0 5px 0;
  background-image: $color-bg-gradient;
}
</style>
