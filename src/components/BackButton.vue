<template>
  <div class="back-button">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: "назад" },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";
.back-button {
  position: relative;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;

  cursor: pointer;
  text-transform: uppercase;
  // border: 2px solid $purple;

  &::after,
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 20%;
    height: 20%;
    border: 2px solid;
    transition: all 0.6s ease;
    border-radius: 2px;
  }
  &::after {
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: $purple;
    border-right-color: $purple;
  }
  &::before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: $purple;
    border-left-color: $purple;
  }

  &:hover:after,
  &:hover:before {
    width: 96%;
    height: 92%;
  }
}
</style>
