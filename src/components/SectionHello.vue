<template>
  <section id="hello" class="hello">
    <glitched-writer
      v-if="!isLoading"
      text="Привет. "
      class="hello__title"
      preset="encrypted"
      :options="{ delay: 1000, interval: 60 }"
      appear
    />
    <glitched-writer
      v-if="!isLoading"
      text="Я Данил."
      class="hello__title"
      preset="encrypted"
      :options="{ delay: 2500, interval: 60 }"
      appear
    />
    <glitched-writer
      v-if="!isLoading"
      tag="div"
      text="Познакомимся?"
      class="hello__title"
      preset="encrypted"
      :options="{ delay: 4000, interval: 80 }"
      appear
      @finish="saidHello"
    />
    <!-- slide down arrows -->
    <transition name="fadeIn">
      <svg
        v-show="helloAnimationDone"
        class="hello__arrow"
        @click="$emit('arrow-clicked')"
      >
        <path d="M0 0 L30 32 L60 0" />
        <path d="M0 20 L30 52 L60 20" />
        <path d="M0 40 L30 72 L60 40" /></svg
    ></transition>
    <!-- background particles -->
    <transition name="fadeIn">
      <div v-show="helloAnimationDone" v-if="!isMobile" class="particles">
        <div data-depth="0.3" class="particle particle1" />
        <div data-depth="0.2" class="particle particle2" />
        <div data-depth="0.1" class="particle particle3" /></div
    ></transition>
    <!-- background gradient -->
    <transition name="fadeIn"
      ><div v-show="helloAnimationDone" class="hello__bg"
    /></transition>
  </section>
</template>

<script>
import Parallax from "parallax-js";
import gsap from "gsap";
import GlitchedWriter from "vue-glitched-writer";

export default {
  components: {
    GlitchedWriter,
  },

  props: {
    isMobile: { type: Boolean, required: true },
    isLoading: { type: Boolean, required: true },
  },

  emits: ["said-hello", "arrow-clicked"],

  data: () => ({
    helloAnimationDone: false,
  }),

  mounted() {
    this.applyParticles();
  },

  methods: {
    saidHello() {
      this.helloAnimationDone = true;
      this.$emit("said-hello");
    },
    applyParticles() {
      if (!this.isMobile) {
        // eslint-disable-next-line no-unused-vars
        let parallax = new Parallax(document.querySelector(".particles"));
        gsap.to(".particles", {
          y: "-100%",
          duration: 90,
          ease: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/style/colors.scss";
@import "@/style/particles.scss";

/* slide down arrow animations */
@keyframes arrow {
  40% {
    opacity: 1;
  }
  80%,
  100%,
  0% {
    opacity: 0;
  }
}
.fadeIn-enter-active {
  transition: opacity 1s ease;
}
.fadeIn-enter-from {
  opacity: 0;
}

.hello {
  position: relative;
  padding-top: 40vh;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  font-size: 5vw;
  font-weight: 600;

  overflow: hidden;

  &__bg {
    pointer-events: none;

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient($dark-color 60%, $blue);
    mix-blend-mode: lighten;
  }

  // particles
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    & .particle1,
    & .particle2,
    & .particle3 {
      will-change: transform;

      position: absolute !important;
      top: 0;
      left: 0;
      bottom: -$w + px;
      right: 0;
      background-image: $grad;
      background-size: $w + px $w + px;
    }
    & .particle3 {
      margin-left: -$w/3 + px;
      opacity: 0.4;
      filter: blur(3px);
    }
    & .particle2 {
      margin-left: -$w/2 + px;
      opacity: 0.65;
      filter: blur(1.5px);
    }
  }

  &__arrow {
    cursor: pointer;
    width: 60px;
    height: 72px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    bottom: 10vh;

    & path {
      stroke: $purple;
      fill: transparent;
      stroke-width: 1px;
      animation: arrow 2s infinite;

      &:first-child {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.5s;
      }
      &:last-child {
        animation-delay: -1s;
      }
    }
  }
}
</style>
