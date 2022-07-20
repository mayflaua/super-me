<template>
  <!-- FIXME: не рендерится если зайти через back без предзагрузки -->
  <!-- пока что вставил релоад в page-reloader если пять сек грузится -->
  <main class="content">
    <page-preloader v-if="isLoading" />
    <transition name="fade">
      <header class="menu" v-if="helloAnimationDone">
        <nav class="menu__list">
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
        </nav></header
    ></transition>
    <section class="hello" id="hello">
      <glitched-writer
        text="Привет. "
        class="hello__title"
        preset="encrypted"
        :options="{ delay: 1000, interval: 60 }"
        appear
        v-if="!isLoading"
      />
      <glitched-writer
        text="Я Данил."
        class="hello__title"
        preset="encrypted"
        :options="{ delay: 2500, interval: 60 }"
        appear
        v-if="!isLoading"
      />
      <glitched-writer
        tag="div"
        text="Познакомимся?"
        class="hello__title"
        preset="encrypted"
        @finish="saidHello"
        :options="{ delay: 4000, interval: 80 }"
        appear
        v-if="!isLoading"
      />
      <!-- slide down arrows -->
      <transition name="fade">
        <svg
          class="hello__arrow"
          v-show="helloAnimationDone"
          @click="goTo('about')"
        >
          <path d="M0 0 L30 32 L60 0"></path>
          <path d="M0 20 L30 52 L60 20"></path>
          <path d="M0 40 L30 72 L60 40"></path></svg
      ></transition>
      <!-- background particles -->
      <transition name="fade">
        <div class="particles" v-show="helloAnimationDone" v-if="!isMobile">
          <div data-depth="0.3" class="particle particle1"></div>
          <div data-depth="0.2" class="particle particle2"></div>
          <div data-depth="0.1" class="particle particle3"></div></div
      ></transition>
      <!-- background gradient -->
      <transition name="fade"
        ><div class="hello__bg" v-show="helloAnimationDone"></div
      ></transition>
    </section>

    <section class="about" id="about">
      <div class="about__main">
        <div class="about__basics">
          <p class="basics__title">
            Frontend-разработчик с небольшим опытом, но с огромным энтузиазмом.
          </p>
          <p class="basics__subtitle">
            Стараюсь делать полезные, красивые и фунцкиональные веб-приложения.
            Использую Vue 3
          </p>
        </div>
        <div class="about__cards">
          <div class="card" v-for="(card, i) in cards" :key="i">
            <div class="card__head">
              {{ card.title }}
              <div class="card__head-overlay"></div>
            </div>
            <div class="card__content" v-html="card.text.join(`<br />`)"></div>
          </div>
        </div>
      </div>
      <div class="about__quote">
        <div class="about__quote-text-wrapper">
          <span class="about__quote-text about__quote-text--upper"
            >делай то, что любишь
          </span>
          <div class="about__quote-divider"></div>
        </div>
        <div class="about__quote-text-wrapper">
          <span class="about__quote-text about__quote-text--lower"
            >люби то, что делаешь</span
          >
        </div>
      </div>
      <!-- background gradient -->
      <transition name="fade"
        ><div class="about__bg" v-show="helloAnimationDone"></div
      ></transition>
    </section>

    <section class="projects" id="projects">
      <div class="project-card" v-for="(project, num) in projects" :key="num">
        <div class="project-card__number">{{ num + 1 }}</div>
        <div class="project-card__content">
          <div class="project-card__content-title">{{ project.title }}</div>
          <div class="project-card__content-desc">
            {{ project.desc }}
          </div>
          <div class="project-card__buttons">
            <div class="project-card__button" @click="open(project.route)">
              <div class="project-card__button-text">
                <span>подробнее</span>
              </div>
            </div>

            <a
              class="project-card__button"
              :href="project.link"
              target="_blank"
              v-if="project.link"
            >
              <div class="project-card__button-text">перейти</div>
            </a>
          </div>
        </div>
      </div>
      <div class="star">
        <a
          class="star__image"
          href="https://apod.nasa.gov/apod/ap010302.html"
          target="_blank"
        ></a>
        <div class="star__text">
          Изображение молодой звезды, сделанное NASA в день моего рождения
        </div>
      </div>
    </section>

    <section class="contact" id="contact">contact</section>
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */

import GlitchedWriter from "vue-glitched-writer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollTo from "gsap/ScrollToPlugin";
import Parallax from "parallax-js";
import PagePreloader from "@/components/PagePreloader";
gsap.registerPlugin(ScrollTrigger, ScrollTo);

// let tl = gsap.timeline({ paused: true });
let pageTl = gsap.timeline({ paused: true });

export default {
  name: "MainView",
  components: {
    GlitchedWriter,
    PagePreloader,
  },
  data() {
    return {
      scrollPositionBeforeLeaving: 0,
      firstLoad: true,
      scrollAllowed: false,
      helloAnimationDone: false,
      menuAppearingOptions: {
        delay: [200, 1000],
      },
      isLoading: true,

      cards: [
        {
          title: "Образование",
          text: [
            "Сдав ЕГЭ в 2018 году, я поступил в Казань (КИУ) на направление прикладной информатики. Буду честен, мне не понравилось. Именно поэтому после первой сессии я бросил учебу в ВУЗе. Сейчас все открытые источники информации - мои друзья на каждый день :)",
          ],
        },
        {
          title: "Чем я занимаюсь?",
          text: [
            "Frontend разработкой я начал заниматься относительно недавно. В свободное от работы время я предпочитаю пешие и велопрогулки. Так же стараюсь поддерживать в тонусе тело и голову - занимаюсь дома и занимаюсь самообразованием, не только в направлении разработки.",
          ],
        },
        {
          title: "Цели",
          text: [
            "Я хочу попасть в команду единомышленников, которые поделятся бесценным опытом. Общая цель - стать полноценным Frontend разработичком с большим опытом.",
          ],
        },
        {
          title: "Soft skills",
          text: [
            "Технологии, которые я продолжаю изучать - HTML, CSS (SCSS), JS (es6+), Vue 3 (Vuex, Vue router), Git Решения, которых я коснулся - Element-Plus, kaboom.js, GSAP, SVG, jQuery, PHP8",
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

      projects: [
        {
          route: "portfolio",
          title: "Портфолио",
          desc: "Первое, что я решил сделать, освоя HTML/CSS - это сверстать сайт-портфолио в стилистике десктоп приложения. И здесь же и началось изучение JS со всеми сопутствующими начинающему ошибками и неудачными решениями.",

          link: "https://mayflaua.github.io",
        },
        {
          route: "passgen",
          title: "Генератор паролей",
          desc: "Чтобы углубиться в JavaScript, я решил написать генератор паролей. Но сложность была не в алгоритме генерации, а в анимации генерации пароля.",
        },
        {
          route: "kitten",
          title: "Котенок и огурцы",
          desc: "Игра, схожая по механихе с Google Dinosaur game, в которой котенку нужно просто бежать вперед, избегая огурцы и летучих мышей.",
        },
      ],
    };
  },

  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
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
      document.querySelectorAll(".card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            width: 0,
            borderWidth: 0,
          },
          {
            scrollTrigger: {
              scrub: true,
              trigger: ".card:first-child",
              start: `${65 * index}px bottom`,
              endTrigger: ".about__main",
              end: `bottom bottom`,
            },
            borderWidth: 2,
            ease: "power2.inOut",
            width: "100%",
          }
        );
      });
      document
        .querySelectorAll(".card__head-overlay")
        .forEach((overlay, index) => {
          gsap.fromTo(
            overlay,
            { width: "100%" },
            {
              width: "0%",
              ease: "power2.in",
              scrollTrigger: {
                scrub: true,
                trigger: ".card:first-child",
                start: `${65 * index}px bottom`,
                endTrigger: ".about__main",
                end: `bottom bottom`,
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
            trigger: "#projects",
            start: "-10vh bottom",
            end: "-30% center",
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
            trigger: "#projects",
            start: "-5% bottom",
            end: "-20% center",
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
            trigger: "#projects",
            start: "-60% center",
            end: "-30% 60%",
            scrub: true,
          },
        }
      );
    },

    applyParticles() {
      if (!this.isMobile) {
        let parallax = new Parallax(document.querySelector(".particles"));
        gsap.to(".particles", {
          y: "-100%",
          duration: 90,
          ease: "none",
        });
      }
    },

    setScrolling(bool) {
      // disable scrolling if FALSE passed as argument
      if (!bool) {
        console.log("blocked scrolling");
        document.body.style.overflow = "hidden";
        this.scrollAllowed = false;
      } else {
        console.log("unblocked scrolling");
        document.body.style.overflow = "auto";
        this.scrollAllowed = true;
      }
    },

    saidHello() {
      this.helloAnimationDone = true;
      this.setScrolling(true);
    },

    open(route) {
      this.scrollPositionBeforeLeaving = window.scrollY;
      this.setScrolling(false);
      pageTl
        .to(".content", {
          x: "-100%",
          duration: 0.2,
          ease: "power4.easeOut",
        })
        .play()
        .then(() => {
          this.$router.push("/" + route);
          console.log("opening " + route);
        });
    },

    goTo(section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${section}` },
        ease: "power1.inOut",
      });
    },
    // initialaze animations and interactions
    initAll() {
      this.applyParticles();
      this.applyAboutAnimations();
      this.applyAboutQuoteAnimations();
    },
  },

  mounted() {
    window.scrollY == 0 ? this.setScrolling(false) : null;

    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.initAll();
        this.isLoading = false;
      }
    };
  },

  activated() {
    window.scroll(0, this.scrollPositionBeforeLeaving);

    this.firstLoad
      ? (this.firstLoad = false)
      : pageTl.reverse().then(() => {
          document.querySelector(".content").style.transform = "none";
          this.setScrolling(true);
        });
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/particles.scss";

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* main style */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

.content {
  width: 100%;
  min-height: 100vh;
  background: $dark-color;
  color: white;
  overflow: auto;
}

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

/* hello section style */
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
    background: linear-gradient($dark-color 60%, rgb(39, 36, 85));
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

/* about section style */
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
    background: linear-gradient(rgb(39, 36, 85), $dark-color);
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
      margin: 15px auto;
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

/* projects section style */
.projects {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: $dark-color;
  padding: 60px 0 0 0;

  & .project-card {
    display: flex;
    margin: 40px auto;
    width: 100%;
    min-height: 100px;

    &__buttons {
      display: flex;
      margin-top: 12px;
      flex-wrap: wrap;
    }
    &__button {
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      display: block;

      width: 180px;
      margin: 4px 8px 0 0;
      height: 40px;
      background-color: transparent;
      border: 2px solid #9063cd;
      &:after {
        pointer-events: none;
        transition: 0.5s ease-in-out;
        content: "";
        mix-blend-mode: lighten;
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
        background: $purple;
      }
      &-text {
        display: block;
        box-sizing: border-box;
        text-decoration: none;
        color: white;
        font-size: 16px;
        font-weight: 500;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        line-height: 40px;
      }

      &:hover:after {
        width: 100%;
      }
    }

    &__number {
      margin: 0 0 0 4vw;
      min-width: 35px;
      min-height: 100%;
      display: flex;
      align-items: center;
      font-size: 28px;
      font-weight: 600;
      border-right: 5px solid $purple;
    }

    &__content {
      margin: 0 4vw 0 15px;
      width: calc(100% - 40px);

      &-title {
        font-size: 32px;
        font-weight: 500;
      }
      &-desc {
        font-size: clamp(16px, 20px, 28px);
        margin: 15px 0 0 0;
      }
    }

    // &__full-desc {
    //   overflow: hidden;
    //   height: 0;
    //   opacity: 0;
    //   display: flex;
    //   justify-content: space-around;
    //   align-items: center;

    //   &-text {
    //     font-size: 18px;
    //     width: 45%;
    //   }

    //   &-images {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: flex-end;
    //     width: 45%;
    //     border-left: 1px solid $purple;
    //     padding: 40px 0 0 0;

    //     & img {
    //       display: block;
    //       transition: transform 0.3s ease-in-out;
    //       width: 80%;
    //       height: auto;
    //       margin: -40px 0 0 0;

    //       &:hover {
    //         z-index: 50;
    //         transform: scale(1.2) translateX(-30px);
    //       }
    //     }
    //   }
    // }
  }

  & .star {
    width: 100%;
    &__image {
      margin: 0 auto;
      display: block;
      cursor: pointer;

      height: 150px;
      width: 150px;
      background: no-repeat center/contain url("@/assets/star.png");
      position: relative;
      animation: 70s rotate linear infinite;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-48%, -50%);
        width: 68%;
        height: 75%;
        border-radius: 50%;
        box-shadow: 0 0 20px -2px #ed7031;
        animation: 2s shadow linear infinite alternate;

        @keyframes shadow {
          from {
            box-shadow: 0 0 20px -2px #ed7031;
          }
          to {
            box-shadow: 0 0 81px 9px #ed7031;
          }
        }
        @keyframes rotate {
          to {
            transform: rotate(1turn);
          }
        }
      }
    }
    &__text {
      text-align: center;
      width: 100%;
      font-size: 1rem;
      color: lighten($light-color, 20);
      margin: 1em 0 0 0;
    }
  }
}

/* contact section style */
.contact {
  width: 100%;
  min-height: 100vh;
  background-color: $purple;
}

/* media queries */
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

  .projects {
    .project-card {
      &__content-desc {
        font-size: 16px;
      }
      &__full-desc {
        flex-direction: column;

        &-text,
        &-images {
          width: 90%;
        }

        &-images {
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          border-top: 1px solid $purple;
          border-left: none;
          img {
            width: 90%;
            margin: 5px;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .button {
    width: 120px;
    &__text {
      font-size: 14px;
    }
  }
}
</style>
