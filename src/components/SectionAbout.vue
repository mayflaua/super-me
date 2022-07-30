<template>
  <section id="about" class="about">
    <div class="about__main">
      <div class="about__basics">
        <div class="basics__title">
          Frontend-разработчик с небольшим опытом, но с огромным энтузиазмом.
        </div>
        <p class="basics__subtitle">
          Стараюсь делать полезные, красивые и фунцкиональные веб-приложения.<br />Использую
          Vue 3
        </p>
      </div>
      <div class="about__cards">
        <div v-for="(card, i) in cards" :key="i" class="card">
          <div class="card__head">
            {{ card.title }}
            <div class="card__head-overlay" />
          </div>
          <div class="card__content" v-html="card.text.join(`<br />`)" />
        </div>
      </div>
    </div>
    <div class="about__quote">
      <div class="about__quote-text-wrapper">
        <span class="about__quote-text about__quote-text--upper"
          >делай то, что любишь
        </span>
        <div class="about__quote-divider" />
      </div>
      <div class="about__quote-text-wrapper">
        <span class="about__quote-text about__quote-text--lower"
          >люби то, что делаешь</span
        >
      </div>
    </div>
    <!-- background gradient -->
    <transition name="fadeIn"
      ><div v-show="helloAnimationDone" class="about__bg"
    /></transition>
  </section>
</template>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    helloAnimationDone: { type: Boolean, required: true, default: false },
  },
  data: () => ({
    cards: [
      {
        title: "Образование",
        text: [
          "Сдав ЕГЭ в 2018 году, я поступил в Казань (КИУ) на направление прикладной информатики. Буду честен, мне не понравилось. Именно поэтому, после первой сессии, я бросил учебу в ВУЗе. Сейчас все открытые источники информации - мои друзья на каждый день :)",
        ],
      },
      {
        title: "Чем я занимаюсь?",
        text: [
          "Frontend разработкой я начал заниматься относительно недавно. В свободное от работы время я предпочитаю пешие и велопрогулки. Вместе с тем, стараюсь поддерживать в тонусе тело и голову - поддерживую физическую и умственную активность.",
        ],
      },
      {
        title: "Цели",
        text: [
          "Я хочу попасть в команду единомышленников, которые смогут поделиться бесценным опытом. Моя главная цель - стать полноценным Frontend разработичком с большим опытом.",
        ],
      },
      {
        title: "Soft skills",
        text: [
          "Самостоятельно за собой я заметил навыки самообучения, мотивированности к развитию, стрессоустойчивостьб эмоциональный интеллект.",
          "Коллеги и близкие говорят: ",
        ],
      },
      {
        title: "Hard skills",
        text: [
          "Технологии, которые я продолжаю изучать - HTML, CSS (SCSS), JS (es6+), Vue 3 (Vuex, Vue router), Git",
          "Решения, которых я коснулся - Element-Plus, kaboom.js, GSAP, SVG, jQuery, PHP8",
        ],
      },
    ],
  }),

  mounted() {
    this.applyAboutAnimations();
    this.applyAboutQuoteAnimations();
  },
  methods: {
    applyAboutAnimations() {
      // title animation
      gsap.fromTo(
        ".basics__title",
        {
          y: -150,
          opacity: 0,
          color: "transparent",
        },
        {
          y: 0,
          opacity: 1,
          color: "white",

          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "650px bottom",
            scrub: true,
          },
        }
      );
      // subtitle animation
      gsap.fromTo(
        ".basics__subtitle",
        {
          y: -150,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          scrollTrigger: {
            trigger: "#about",
            start: "50px bottom",
            end: "700px bottom",
            scrub: true,
          },
        }
      );
      // cards animation
      document.querySelectorAll(".card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            width: 0,
            borderWidth: 0,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 96%",
              endTrigger: ".about__main",
            },
            borderWidth: 2,
            ease: "power2.inOut",
            width: "100%",
          }
        );
      });
      document.querySelectorAll(".card__head-overlay").forEach((overlay) => {
        gsap.fromTo(
          overlay,
          { width: "100%" },
          {
            width: "0%",
            ease: "power2.in",
            scrollTrigger: {
              trigger: overlay,
              start: "top 96%",
              endTrigger: ".about__main",
            },
          }
        );
      });
    },

    applyAboutQuoteAnimations() {
      gsap.fromTo(
        ".about__quote-text--upper",
        {
          y: 80,
          opacity: 0.6,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".about__quote-divider",
            start: "center 60%",
            end: "+=10%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        ".about__quote-text--lower",
        {
          y: -80,
          opacity: 0.6,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".about__quote-divider",
            start: "center 50%",
            end: "+=10%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        ".about__quote-divider",
        {
          width: 0,
        },
        {
          width: "100%",
          ease: "none",

          scrollTrigger: {
            trigger: ".about__quote-divider",
            start: "bottom bottom",
            end: "+=5%",
            scrub: true,
          },
        }
      );
    },
  },
};
</script>

<style lang="scss">
@import "@/style/colors.scss";

.fadeIn-enter-active {
  transition: opacity 1s ease;
}
.fadeIn-enter-from {
  opacity: 0;
}

.about {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: $dark-color;
  padding: 60px 0;
  &__main {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }

  &__bg {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient($blue, $dark-color);
    mix-blend-mode: lighten;
  }

  &__basics {
    width: 45%;
    height: 100%;
    & .basics__title {
      font-size: clamp(32px, 3vw, 48px);
      font-weight: 600;
    }

    & .basics__subtitle {
      font-size: clamp(22px, 2vw, 34px);
      font-weight: 500;
    }
  }
  &__cards {
    width: 45%;

    .card {
      width: 100%;
      margin: 0 auto 15px auto;
      border: 2px solid $purple;

      &__head {
        position: relative;
        transition: all 2s ease;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: left;
        text-indent: 15px;
        cursor: pointer;
        overflow: hidden;

        font-size: 24px;
        font-weight: 600;

        &-overlay {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: $purple;
        }

        &:after {
          transition: 0.5s ease-in-out;
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          width: 0;
          height: 100%;
          background-color: $purple;

          mix-blend-mode: lighten;
        }

        &:hover {
          &:after {
            width: 100%;
          }
          & ~ .card__content {
            max-height: 250px;
            padding: 20px 10px;
            opacity: 1;
          }
        }
      }

      &__content {
        transition: padding 0.7s ease, max-height 0.7s ease-out,
          opacity 1s linear;
        font-size: 18px;
        padding: 0 10px;
        opacity: 0;
        max-height: 0;
        overflow: hidden;

        &:hover {
          max-height: 250px;
          padding: 20px 10px;
          opacity: 1;
        }
      }
    }
  }

  &__quote {
    margin-top: 20vh;
    width: 100%;

    &-divider {
      margin: 0 auto;
      height: 5px;
      background: $purple;
      animation: flicker 1s infinite;
    }

    &-text {
      &-wrapper {
        margin: 0 auto;
        width: fit-content;
        overflow: hidden;
        margin-block-start: 0;
        margin-block-end: 0;
      }
      margin: 0 auto;
      display: block;
      text-align: center;
      font-size: clamp(22px, 3vw, 48px);
      text-transform: uppercase;
    }
  }
}

@media (max-width: 768px) {
  .about {
    &__main {
      flex-direction: column;
      align-items: center;
    }

    &__basics {
      width: 90%;
      text-align: center;
    }

    &__cards {
      width: 90%;
    }

    & .card__head {
      font-size: 20px;
      text-align: center;
      text-indent: none;
    }

    & .card__content {
      font-size: 16px;
    }
  }
}
</style>
