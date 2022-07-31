<template>
  <header class="menu">
    <nav class="menu__list">
      <glitched-writer
        text="обо мне"
        tag="div"
        class="menu__list-item"
        :class="currentSection == 'about' ? 'menu__list-item--current' : ''"
        preset="cosmic"
        :options="menuAppearingOptions"
        appear
        @click="$emit('clicked', 'about')"
      />
      <glitched-writer
        text="проекты"
        tag="div"
        class="menu__list-item"
        :class="currentSection == 'projects' ? 'menu__list-item--current' : ''"
        preset="cosmic"
        :options="menuAppearingOptions"
        appear
        @click="$emit('clicked', 'projects')"
      />
      <glitched-writer
        text="связаться"
        tag="div"
        class="menu__list-item"
        :class="currentSection == 'contact' ? 'menu__list-item--current' : ''"
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
  props: {
    currentSection: { type: String, default: "" },
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

  font-size: 1.8vh;

  &__list {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    &-item {
      position: relative;
      transition: all 1s ease;
      border-bottom: 1px solid transparent;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      text-transform: uppercase;

      &--current {
        // transform: translateY(5%);
        font-size: 2.1vh;
        // color: $purple;
        font-weight: 500;
        background-color: rgba($light-color, 0.8);
      }

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
