<template>
  <header class="menu">
    <nav class="menu__list">
      <glitched-writer
        text="обо мне"
        tag="div"
        class="menu__list-item"
        preset="cosmic"
        :options="menuAppearingOptions"
        appear
        @click="$emit('clicked', 'about')"
      />
      <glitched-writer
        text="проекты"
        tag="div"
        class="menu__list-item"
        preset="cosmic"
        :options="menuAppearingOptions"
        appear
        @click="$emit('clicked', 'projects')"
      />
      <glitched-writer
        text="связаться"
        tag="div"
        class="menu__list-item"
        preset="cosmic"
        :options="menuAppearingOptions"
        appear
        @click="$emit('clicked', 'contact')"
      />
    </nav>
  </header>
</template>

<script>
import GlitchedWriter from "vue-glitched-writer";

export default {
  components: {
    GlitchedWriter,
  },
  emits: ["clicked"],
  data: () => ({
    menuAppearingOptions: {
      delay: [30, 60],
    },
  }),
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.menu {
  background-color: rgba($default-color, 0.7);
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 99;

  font-size: clamp(2vh, 16px, 3vw);

  &__list {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    &-item {
      position: relative;
      transition: all 1s;
      border-bottom: 1px solid transparent;
      line-height: 50px;
      text-align: center;
      cursor: pointer;

      &:after {
        content: "";
        transition: all 0.7s;
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
      }

      &:hover:after {
        background: $purple;
        width: 100%;
        left: 0;
        animation: flicker 0.5s infinite alternate;
      }
    }
  }
}
</style>
