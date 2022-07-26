<template>
  <div class="notfound">
    <div class="notfound__404">404</div>
    <div class="notfound__title">Этой страницы не существует.</div>
    <back-button
      class="back-button"
      text="на главную"
      @click="$router.push('/')"
    />
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
export default {
  components: {
    BackButton,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";
.notfound {
  width: 100vw;
  height: 100vh;
  background: $blue;
  overflow: hidden;

  &__404 {
    font-size: clamp(80px, 20vw, 280px);
    text-align: center;
    padding: 10vh 0 0 0;
    font-weight: 700;
    color: $purple;
    animation: 2s flickerText infinite alternate;
  }

  &__title {
    text-align: center;
    font-size: clamp(30px, 3vw, 120px);
    color: $purple;
    font-weight: 500;
  }
  .back-button {
    margin: 10vh auto;
    width: 140px;
    color: white;
  }
}
</style>
