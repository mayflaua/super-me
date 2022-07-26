<template>
  <div class="page-loader">
    <div v-show="needReload" class="reload">
      Что то пошло не так, простите.<br />Перезагружу страницу.
    </div>
    <div class="loader">
      <div class="circle circle--outer">
        <div class="circle circle--inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    reloadTimer: null,
    needReload: false,
  }),
  mounted() {
    this.reloadTimer = setTimeout(() => {
      this.reload();
      console.warn("Loading took more than 5 seconds. Reloading");
    }, 5000);
  },
  beforeUnmount() {
    clearTimeout(this.reloadTimer);
  },
  methods: {
    reload() {
      this.needReload = true;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  },
};
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

.reload {
  width: 40%;
  text-align: center;
  font-size: clamp(16px, 2vw, 26px);
  margin: 20vh auto;
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
