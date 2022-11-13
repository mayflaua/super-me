<template>
  <div :style="{ overflow: isAnimating ? 'hidden' : 'auto' }">
    <div class="overlays">
      <div class="overlay overlay1"></div>
      <div class="overlay overlay2">
        <span class="overlay-text">Vue3</span>
      </div>
      <div class="overlay overlay3">
        <span class="overlay-text">Nuxt3</span>
      </div>
      <div class="overlay overlay4">
        <span class="overlay-text">Supabase</span>
      </div>
    </div>
    <div class="project">
      <div class="project__title">FeelComfy</div>
      <div class="project__desc">
        <div class="project__desc-text">
          Решив двигаться дальше, я выбрал изучить Nuxt, создав интернет магазин
          с функционалом, как в настоящих маркетах.
        </div>

        <div class="project__desc-images project__desc-images--first">
          <img
            class="project__desc-image"
            src="@/assets/previews/feelcomfy.jpg"
          />
          <div class="project__desc-image-wrapper">
            <img
              class="project__desc-image project__desc-image--overlaying"
              src="@/assets/previews/feelcomfy2.jpg"
            />
          </div>
        </div>

        <div class="project__design">
          <div class="project__desc-headline project__desc-headline--design">
            Дизайн
          </div>
          <div class="project__desc-text">
            Изучив полулярные маркетплейсы, я выбрал повторить дизайн
            KazanExpress, т.к посчитал его относительно простым. Позже,
            некоторые части интерфейса постиг редизайн - примером послужили
            такие магазины, как
            <a class="link link--ozon" href="https://ozon.ru">Ozon</a> и
            <a class="link link--yamarket" href="https://market.yandex.ru"
              >Яндекс.Маркет</a
            >.<br />
            Основным цветом был выбран пурпурный. (Как цвет фона этой страницы)
          </div>
        </div>

        <div class="project__dev">
          <div class="project__desc-headline project__desc-headline--dev">
            Разработка
          </div>
          <div v-for="item in devItems" :key="item" class="project__dev-item">
            <div class="project__desc-label">{{ item.title }}</div>
            <div class="project__desc-text project__desc-text--smaller">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>

      <div class="project__desc-conclusions">
        <div class="project__desc-headline project__desc-headline--wil">
          Чему я научился?
          <div class="box1"></div>
          <div class="box2"></div>
        </div>
        <div class="conclusions">
          <a
            v-for="item in whatILearnedList"
            :key="item.title"
            :href="item.link"
            target="_blank"
            class="conclusion"
          >
            <div class="conclusion__title">{{ item.title }}</div>
            <div class="conclusion__desc">{{ item.desc }}</div>
          </a>
        </div>
      </div>
      <back-button class="back-button" @click="back" />
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import BackButton from "@/components/BackButton.vue";

let overlays;
let wilTl;
export default {
  components: {
    BackButton,
  },
  data: () => ({
    isAnimating: true,

    devItems: [
      {
        title: "Vue 3",
        desc: "для создания Single Page Application как фреймворк, который я изучаю",
      },
      {
        title: "Pinia",
        desc: "как замена устаревшему Vuex",
      },
      {
        title: "Nuxt 3",
        desc: "для реализации ServerSide Rendering",
      },
      {
        title: "TypeScript",
        desc: "",
      },
      {
        title: "Supabase",
        desc: "backend as a service, для авторизации и хранения данных в базе",
      },
      {
        title: "Nuxt Modules",
        desc: "Nuxt Image, Nuxt Color Mode",
      },
      {
        title: "Vitest",
        desc: "для юнит-тестирования",
      },
      {
        title: "ImageKit",
        desc: "для хранения и оптимизации изображений",
      },
    ],

    whatILearnedList: [
      {
        title: "Примененять Nuxt 3",
        desc: "для рендеринга страницы на сервере",
        link: "https://v3.nuxtjs.org/",
      },
      {
        title: "Интегрировать backend",
        desc: "при помощи supabase",
        link: "https://supabase.com/",
      },
      {
        title: "Тестировать pinia stores",
        desc: "с vitest",
        link: "https://github.com/mayflaua/feelcomfy/tree/master/tests",
      },
      {
        title: "Оптимизировать показатели Lighthouse",
        desc: "Ленивая загрузка изображений вне viewport, ленивая загрузка компонентов вне viewport используя IntersectionObserver, использование современных форматов для шрифтов, client-side rendering частей интерфейса, зависящих от состояния авторизации",
        link: "https://pagespeed.web.dev/report?url=https%3A%2F%2Ffeelcomfy.netlify.app%2F",
      },
      {
        title: "Использовать TypeScript",
        desc: "для описания типов во избежание ошибок при разработке",
        link: "https://github.com/mayflaua/feelcomfy/tree/master/",
      },
    ],
  }),

  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 0);
      this.setScrolling(false);
      overlays = gsap.timeline();
      wilTl = gsap.timeline();
      this.applyOverlayAnimation();

      overlays.play().then(() => this.setScrolling(true));
    });
  },
  beforeUnmount() {
    overlays.kill();
    wilTl.kill();
  },

  methods: {
    setScrolling(bool) {
      // disable scrolling if FALSE passed as argument
      if (!bool) {
        console.log("blocked scrolling");
        document.body.style.overflow = "hidden";
      } else {
        console.log("unblocked scrolling");
        document.body.style.overflow = "auto";
      }
    },
    back() {
      overlays.reverse().then(() => this.$router.go(-1));
      this.setScrolling(false);
    },
    applyDevAnimations() {
      // dev list items anims
      const opts = {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.6,
        scrollTrigger: {
          trigger: ".project__dev",
          start: "center bottom",
        },
      };

      gsap.from(".project__dev-item", opts);
    },

    applyOverlayAnimation() {
      overlays
        .to(".overlay", {
          width: "0vw",
          duration: 0.3,
          stagger: 0.3,
        })
        .fromTo(
          ".project__desc",
          {
            opacity: 0,
            y: 100,
            duration: 0.5,
          },
          {
            opacity: 1,
            y: 0,
            onComplete: () => {
              this.applyAnimations();
            },
          }
        );
    },

    applyWhatILearnedAnimations() {
      // animate boxes to side lines
      const opts1 = {
        x: 0,
        y: 0,
        width: 0,
        scrollTrigger: {
          trigger: ".project__desc-conclusions",
          start: "-50px center",
          end: "+=100px",
          scrub: 0.5,
        },
      };
      // extend line heights
      const opts2 = {
        height: document.querySelector(".project__desc-conclusions")
          .offsetHeight,
        borderWidth: 2,
        "box-shadow": "5px 0 205px 5px rgba(0, 0, 0, 0.6)",
        scrollTrigger: {
          scrub: 0.5,
          trigger: ".project__desc-conclusions",
          start: "50px center",
          endTrigger: ".project",
          end: "bottom bottom",
        },
      };
      // what i learned list items anims
      const opts3 = {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.6,
        scrollTrigger: {
          trigger: ".conclusions",
          start: "50% bottom",
        },
      };
      wilTl
        .to(".box1", {
          left: 15,
          ...opts1,
        })
        .to(".box1", opts2);
      wilTl
        .to(".box2", {
          left: "unset",
          right: 15,
          ...opts1,
        })
        .to(".box2", opts2);
      gsap.from(".conclusion", opts3);
    },

    applyImageAnimation() {
      gsap.from(".project__desc-image-wrapper", {
        width: 0,
        scrollTrigger: {
          scrub: true,
          trigger: ".project__desc-images",
          start: "40% center",
          end: "60% center",
        },
      });
    },

    applyAnimations() {
      this.isAnimating = false;
      this.applyImageAnimation();
      this.applyDevAnimations();
      this.applyWhatILearnedAnimations();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";
// FeelComfy accent color
$fc: #6e6edf;

.overlay {
  overflow: hidden;
  font-size: 64px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;

  &-text {
    color: white;
    position: absolute;
    top: 50vh;
    margin-left: 20px;
  }

  &1 {
    z-index: 14;
    background: linear-gradient(to right, $fc, lighten($fc, 5));
  }
  &2 {
    z-index: 13;

    background: linear-gradient(
      to right,
      lighten($fc, 5),
      lighten($light-color, 5)
    );
  }
  &3 {
    z-index: 12;

    background: linear-gradient(
      to right,
      lighten($light-color, 5),
      $default-color
    );
  }
  &4 {
    z-index: 11;

    background: linear-gradient(to right, $default-color, $dark-color);
  }
}
.project {
  background: $fc;
  color: white;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  .wakatime-badge {
    display: block;
    text-align: center;
  }

  .back-button {
    margin: 110px auto;
  }

  &__title {
    color: white;
    width: 100%;
    text-align: center;
    font-size: clamp(24px, 3vw, 42px);
    font-weight: 600;
    padding: 15px 0 10px 0;
    border-bottom: 1px solid $purple;
    background-color: darken($purple, 10);
    animation: flicker 1s infinite;
  }

  &__desc {
    opacity: 1;
    transform: none;
    padding: 60px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-text {
      font-weight: 500;
      width: 70%;
      text-align: center;
      margin: 50px auto 0 auto;
      font-size: clamp(14px, 2.3vw, 26px);

      &--smaller {
        font-size: clamp(14px, 1.8vw, 22px);
        font-weight: 400;
        margin: 10px auto 0 auto;
      }
    }

    &-headline {
      width: 100%;
      text-align: center;
      font-size: clamp(18px, 3.5vw, 32px);
      font-weight: 600;

      &--wil {
        position: relative;

        .box {
          &1,
          &2 {
            box-shadow: 5px 0 205px 5px rgba(white, 0.1);
            z-index: 10;
            position: absolute;
            width: 70%;
            height: 60px;
            border: 4px solid white;
            top: 50%;
            left: 50%;
          }

          &1 {
            transform: translate(-45%, -40%);
          }
          &2 {
            transform: translate(-55%, -60%);
          }
        }
      }
    }

    &-images {
      &--first {
        position: relative;
        margin: 60px auto 0 auto;

        .project__desc-image-wrapper {
          position: absolute;
          width: 75vw;
          top: 0;
          left: 0;
          overflow: hidden;
        }

        .project__desc-image {
          width: 75vw;

          &--overlaying {
            border-bottom: 5px solid $purple;
          }
        }
      }
    }
  }

  &__design {
    margin-top: 60px;

    .project__desc-text {
      margin-top: 20px;

      .link {
        color: black;
        text-decoration: underline;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }

        &--ozon {
          color: #005bff;
        }

        &--yamarket {
          color: #ffcc00;
        }
      }
      .color {
        transition: background 0.2s;
        &--purple:hover {
          background: $purple;
        }
      }
    }
  }

  &__dev {
    margin-top: 60px;

    .project__desc-label {
      margin: 15px 0 0 0;
      color: darken($fc, 10);
      font-weight: 500;
      font-size: clamp(16px, 3vw, 28px);
      text-align: center;
      width: 100%;
    }
  }

  &__desc-conclusions {
    margin: 15% 0 0 0;
    .conclusion {
      &s {
        width: calc(95% - 35px);
        margin: 70px auto 0 auto;
      }
      display: block;
      text-decoration: none;
      cursor: pointer;
      width: 100%;
      max-height: 120px;
      margin: 35px 0 0 0;
      position: relative;
      transition: box-shadow 1s;

      &:hover {
        box-shadow: 0 15px 35px 0px rgba(white, 0.1);

        & > .conclusion__title,
        & > .conclusion__desc {
          background: darken($fc, 10);
        }
      }

      &:hover::before,
      &:hover::after {
        display: block;
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        background: white;
        z-index: 1;
        filter: blur(3px);
        animation: 1s a linear infinite;
        box-shadow: 0 0 80px white;
      }
      &:hover:after {
        animation-delay: -0.5s;
      }

      @keyframes a {
        0%,
        100% {
          top: -2px;
          left: -2px;
        }
        25% {
          top: -2px;
          left: calc(100% - 48px);
        }
        50% {
          top: calc(100% - 48px);
          left: calc(100% - 48px);
        }
        75% {
          top: calc(100% - 48px);
          left: -2px;
        }
      }

      &__title {
        color: white;
        transition: background 1s;
        z-index: 2;
        position: relative;
        padding: 15px 0 10px 0;
        width: 100%;
        background: $fc;
        font-weight: 600;
        font-size: clamp(12px, 3vw, 30px);
        text-align: center;
      }

      &__desc {
        color: darken(white, 10);
        transition: background 1s;
        z-index: 2;
        position: relative;
        padding: 0 0 15px 0;
        background: $fc;
        width: 100%;
        font-size: clamp(12px, 1.8vw, 24px);
        text-align: center;
      }
    }
  }
}
@media (max-width: 768px) {
  .project {
    &__desc {
      &-text {
        width: 85%;
        margin: 0 auto;
      }
    }
  }
}
@media (max-width: 650px) {
  .project {
    &__desc {
      &-conclusions {
        margin: 60% 0 0 0;
        .conclusion {
          &s {
            margin: 40px auto 0 auto;
          }
          margin: 15px 0 0 0;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .project {
    &__desc {
      &-text {
        width: 90%;
      }
    }
  }
}
</style>
