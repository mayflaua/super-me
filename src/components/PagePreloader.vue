<template>
  <div class="page-loader">
    <div class="loader">
      <div class="circle circle--outer">
        <div class="circle circle--inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 4815162342;
  background: #333;
}

.loader {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50px, -50px);
}

.circle {
  animation: loading 0.7s linear infinite;

  &--outer {
    position: absolute;

    width: 100px;
    height: 100px;
    background: #9063cd;
    border-radius: 50%;
    box-shadow: -2px -2px 2px 1px #9063cd;
  }

  &--inner {
    position: absolute;

    width: 105px;
    height: 105px;
    background: #333;
    border-radius: 50%;
  }
}

@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
