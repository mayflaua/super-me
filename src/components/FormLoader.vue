<template>
  <div class="form-loader">
    <div class="inner"></div>
    <div class="outer"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";
.form-loader {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-sizing: border-box;

  .inner,
  .outer {
    box-sizing: border-box;
    position: absolute;
    width: 28px;
    height: 28px;

    border-width: 3px;
    border-style: solid;
    border-color: $purple transparent;
    border-radius: 50%;

    animation: 1s loading linear infinite;
  }
  .outer {
    width: 40px;
    height: 40px;
    animation-direction: reverse;
  }
}

@keyframes loading {
  to {
    transform: rotate(1turn);
  }
}
</style>
