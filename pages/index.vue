<template>
  <div class="auth-wrapp">
    <h1 class="logo">
      <img
        src="/assets/images/logo.svg"
        alt="Takahiro Survey"
      >
    </h1>
    <p>Nhập mã nhân viên để tiếp tục</p>
    <tek-input
      class="code-input"
      v-model="staffCode"
    />
    <tek-button class="submit">Tiếp tục</tek-button>
  </div>
</template>

<script>
import TekInput from '@/components/TekInput.vue'
import TekButton from '@/components/TekButton.vue'

export default {
  components: {
    TekInput,
    TekButton,
  },
  data() {
    return {
      staffCode: null,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.auth-wrapp {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  .logo {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 50%;
    img {
      width: 80%;
      margin: 5px auto 0;
      padding-left: 5px;
    }
  }
  > p {
    margin-top: 20px;
    font-size: 14px;
  }
  .code-input {
    margin-top: 15px;
  }
  .submit {
    margin-top: 10px;
  }
}
</style>
