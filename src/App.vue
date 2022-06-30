<template>
  <main class="content">
    <nav class="menu" v-if="helloAnimationDone">
      <div class="menu__list">
        <glitched-writer
          text="обо мне"
          tag="div"
          class="menu__list-item"
          @click="goTo('about')"
          preset="cosmic"
          :options="menuAppearingOptions"
          appear
        />
        <glitched-writer
          text="проекты"
          tag="div"
          class="menu__list-item"
          @click="goTo('projects')"
          preset="cosmic"
          :options="menuAppearingOptions"
          appear
        />
        <glitched-writer
          text="связаться"
          tag="div"
          class="menu__list-item"
          @click="goTo('contact')"
          preset="cosmic"
          :options="menuAppearingOptions"
          appear
        />
      </div>
    </nav>
    <section class="hello" id="hello">
      <glitched-writer
        text="Привет. "
        class="hello__title"
        preset="encrypted"
        :options="{ delay: 1000, interval: 60 }"
        appear
      />
      <glitched-writer
        text="Я Данил."
        class="hello__title"
        preset="encrypted"
        :options="{ delay: 2500, interval: 60 }"
        appear
      />
      <glitched-writer
        text="Познакомимся?"
        class="hello__title"
        preset="encrypted"
        @finish="helloAnimationDone = true"
        :options="{ delay: 4000, interval: 80 }"
        appear
      />
      <transition name="arrow-fade">
        <svg class="hello__arrow" v-show="helloAnimationDone">
          <path d="M0 0 L30 32 L60 0"></path>
          <path d="M0 20 L30 52 L60 20"></path>
          <path d="M0 40 L30 72 L60 40"></path></svg
      ></transition>
    </section>
    <section class="about" id="about">
      <div class="card" v-for="card in cards" :key="card.title">
        <div class="card__head">{{ card.title }}</div>
        <div class="card__content">
          {{ card.text }}
        </div>
      </div>
    </section>
    <section class="projects" id="projects">projects</section>
    <section class="contact" id="contact">contact</section>
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
import GlitchedWriter from "vue-glitched-writer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollTo from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollTo);

export default {
  data() {
    return {
      helloAnimationDone: false,
      menuAppearingOptions: {
        delay: [200, 1000],
      },

      cards: [
        {
          title: "Кто я?",
          text: "Надеюсь, вы помните, кем я представился? Если нет, то меня зовут Даниил, мне 21 год, из которых программированию я посвятил около трети. Из Нижегородской области я перебрался в Чебоксары, где и нахожусь сейчас.",
        },
        {
          title: "Чем я занимаюсь?",
          text: "Frontend разработкой я начал заниматься относительно недавно. Я понял, что работа поваром перестала интересовать как то, на что я готов тратить время силы.",
        },
        {
          title: "Образование",
          text: "Сдав ЕГЭ в 2018 году, я поступил в Казань (КИУ) на направление прикладной информатики. Буду честен, мне не понравилось. Именно поэтому после первой сессии я бросил учебу в ВУЗе. Сейчас все открытые (и не очень) источники информации - мои друзья на каждый день :)",
        },
        {
          title: "Чего я хочу?",
          text: "Я хочу попасть в команду единомышленников, которые поделятся бесценным опытом. Общая цель - стать полноценным Frontend разработичком с большим опытом.",
        },
        {
          title: "Hard skills",
          text: "Технологии, которые я продолжаю изучать - HTML, CSS, JS (es6+), Vue 3 (Vuex, Vue router) Решения, которых я коснулся - Element-Plus, kaboom.js, GSAP, SVG, jQuery, PHP8",
        },
      ],
    };
  },
  components: {
    GlitchedWriter,
  },

  methods: {
    goTo(section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${section}` },
      });
      this.menuVisible = false;
    },

    applyCardAnimations() {
      gsap.fromTo(
        ".card",
        {
          "min-height": "0",
          "max-height": "0",
        },
        {
          "min-height": "150px",
          "max-height": "300px",
          "box-shadow": "0 0 10px 5px rgba($purple, 0.4)",

          scrollTrigger: {
            trigger: "#about",
            start: "50px bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".card__content",
        {
          opacity: 0,
        },
        {
          opacity: 1,

          scrollTrigger: {
            trigger: "#about",
            start: "150px center",
            end: "center center",
            scrub: 1,
          },
        }
      );
    },
  },

  mounted() {
    this.applyCardAnimations();
  },
};
</script>

<style lang="scss" scoped>
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

/* slide down arrow animations */
@keyframes arrow {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.arrow-fade-enter-active {
  transition: opacity 3s ease;
}
.arrow-fade-enter-from {
  opacity: 0;
}

/* main style */
* {
  box-sizing: border-box;
}

::selection {
  background: darken($purple, 10%);
}

.content {
  width: 100%;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  background: $dark-color;
  color: white;
}

.menu {
  background-color: rgba($default-color, 0.7);
  position: fixed;
  width: 100%;
  height: 50px;

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

/* hello section style */
.hello {
  padding-top: 40vh;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  font-size: 5vw;
  font-weight: 600;

  &__title:nth-child(3) {
    display: block;
  }

  &__arrow {
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

/* about section style */
.about {
  width: 100%;
  min-height: 100vh;
  background-color: $default-color;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  & .card {
    width: 80%;
    margin: 15px auto;
    border: 2px solid $purple;

    &__head {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-indent: 15px;
      background-color: $purple;

      font-size: 24px;
      font-weight: 600;
    }

    &__content {
      padding: 5px 10px;
      font-size: 2vh;
      font-weight: 500;
      overflow: hidden;
    }
  }
}

.projects {
  width: 100%;
  min-height: 100vh;
  background-color: $light-color;
}

.contact {
  width: 100%;
  min-height: 100vh;
  background-color: $purple;
}
</style>
