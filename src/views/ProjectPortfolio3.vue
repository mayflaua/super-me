<template>
  <div :style="{ overflow: isAnimating ? 'hidden' : 'auto' }">
    <div class="overlays">
      <div class="overlay overlay1"></div>
      <div class="overlay overlay2">
        <span class="overlay-text"></span>
      </div>
      <div class="overlay overlay3">
        <span class="overlay-text"></span>
      </div>
      <div class="overlay overlay4"><span class="overlay-text"></span></div>
    </div>
    <div class="project">
      <div class="project__title">Портфолио #3</div>
      <div class="project__desc">
        <div class="project__desc-text">
          Осознав, что сборник проектов на сайте с простым дизайном мне не
          подходит, я решил начать этот проект.
        </div>
        <div class="project__design">
          <div class="project__desc-headline project__desc-headline--design">
            Дизайн
          </div>
          <div class="project__desc-text">
            Посмотрев сайты-портфолио других разработчиков, вдохновление я взял
            у
            <a
              class="link link--prashantsani"
              href="https://prashantsani.com/"
              target="_blank"
              >Prashant Sani</a
            >.<br />Основная цветовая палитра состоит из пяти цветов: три
            градации темно-серого,
            <span class="color color--purple">аметистовый</span> и
            ультрамариново-синий.<br />Макет рисовался в голове по мере его
            создания.
          </div>
        </div>
        <div class="project__dev">
          <div class="project__desc-headline project__desc-headline--dev">
            Разработка
          </div>
          <div class="project__dev-item" v-for="item in devItems" :key="item">
            <div class="project__desc-label">{{ item.title }}</div>
            <div class="project__desc-text project__desc-text--smaller">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
      <back-button class="back-button" @click="back" />
      <a
        class="wakatime-badge"
        href="https://wakatime.com/badge/user/5aa1588b-ee5e-4d91-b681-13a0fe45ba60/project/1d14b5ff-3820-4dda-b918-5419c9b99307"
        ><img
          src="https://wakatime.com/badge/user/5aa1588b-ee5e-4d91-b681-13a0fe45ba60/project/1d14b5ff-3820-4dda-b918-5419c9b99307.svg?style=for-the-badge"
          alt="wakatime"
      /></a>
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
        title: "Parallax.js",
        desc: "для реализации эффекта параллакса частиц на экране приветствия",
      },
      {
        title: "GSAP",
        desc: "для анимирования элементов страницы",
      },
      {
        title: "Glitched Writer",
        desc: "для анимирования приветственного текста и элементов навигации",
      },
      {
        title: "PHP + jQuery",
        desc: "для отправки формы обратной связи",
      },
    ],
  }),

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
    applyAnimations() {
      this.isAnimating = false;
      this.applyDevAnimations();
    },
  },

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
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";
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
    background: linear-gradient(to right, $purple, lighten($purple, 5));
  }
  &2 {
    z-index: 13;

    background: linear-gradient(
      to right,
      lighten($purple, 5),
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
  background: $blue;
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
            box-shadow: 5px 0 205px 5px rgba($purple, 0.1);
            z-index: 10;
            position: absolute;
            width: 70%;
            height: 60px;
            border: 4px solid $purple;
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
  }

  &__design {
    margin-top: 60px;

    .project__desc-text {
      margin-top: 20px;

      .link {
        color: $purple;
        text-decoration: underline;
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
      color: lighten($purple, 10);
      font-size: clamp(16px, 3vw, 28px);
      text-align: center;
      width: 100%;
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
