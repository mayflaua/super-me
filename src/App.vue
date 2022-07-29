<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive>  -->
    <keep-alive include="MainView">
      <component :is="Component" class="component"
    /></keep-alive>
  </router-view>
</template>

<script>
export default {
  mounted() {
    document.body.style.background = "#462572";
  },
};
</script>

<style lang="scss">
@import "@/style/colors.scss";
::selection {
  background: darken($purple, 10%);
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  opacity: 1;
  width: 8px;
}
::-webkit-scrollbar-track {
  width: 8px;
  background: $light-color;
}
::-webkit-scrollbar-thumb {
  background: $purple;
}

body {
  font-family: "Montserrat", sans-serif;
}

/* neon flickering animation */
@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    box-shadow: 0 0 2px rgba(144, 99, 205, 0.5), 0 0 4px rgba(144, 99, 205, 0.5),
      0 0 8px rgba(144, 99, 205, 0.5), 0 0 15px rgba(144, 99, 205, 0.5),
      0 0 30px rgba(144, 99, 205, 0.5), 0 0 40px rgba(144, 99, 205, 0.5),
      0 0 70px rgba(144, 99, 205, 0.5), 0 0 100px rgba(144, 99, 205, 0.5);
  }
  20%,
  24%,
  55% {
    box-shadow: 0 0 1px rgba(144, 99, 205, 0.5), 0 0 2px rgba(144, 99, 205, 0.5),
      0 0 5px rgba(144, 99, 205, 0.5), 0 0 11px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(144, 99, 205, 0.5), 0 0 30px rgba(144, 99, 205, 0.5),
      0 0 55px rgba(144, 99, 205, 0.5), 0 0 80px rgba(144, 99, 205, 0.5);
  }
}
@keyframes flickerText {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    text-shadow: 0 0 2px rgba(144, 99, 205, 0.5),
      0 0 4px rgba(144, 99, 205, 0.5), 0 0 8px rgba(144, 99, 205, 0.5),
      0 0 15px rgba(144, 99, 205, 0.5), 0 0 30px rgba(144, 99, 205, 0.5),
      0 0 40px rgba(144, 99, 205, 0.5), 0 0 70px rgba(144, 99, 205, 0.5),
      0 0 100px rgba(144, 99, 205, 0.5);
  }
  20%,
  24%,
  55% {
    text-shadow: 0 0 1px rgba(144, 99, 205, 0.5),
      0 0 2px rgba(144, 99, 205, 0.5), 0 0 5px rgba(144, 99, 205, 0.5),
      0 0 11px rgba(255, 255, 255, 0.5), 0 0 20px rgba(144, 99, 205, 0.5),
      0 0 30px rgba(144, 99, 205, 0.5), 0 0 55px rgba(144, 99, 205, 0.5),
      0 0 80px rgba(144, 99, 205, 0.5);
  }
}

.component {
  position: relative;
}
</style>
