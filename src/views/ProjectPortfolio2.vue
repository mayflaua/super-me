<template>
  <div :style="{ overflow: isAnimating ? 'hidden' : 'auto' }">
    <div class="overlays">
      <div class="overlay overlay1"></div>
      <div class="overlay overlay2">
        <span class="overlay-text">HTML</span>
      </div>
      <div class="overlay overlay3">
        <span class="overlay-text">CSS</span>
      </div>
      <div class="overlay overlay4"><span class="overlay-text">Vue</span></div>
    </div>
    <div class="project">
      <div class="project__title">Портфолио #2</div>
      <div class="project__desc">
        <div class="project__desc-text">
          Изначально сайт был задуман как сборник проектов и реализован без
          фреймворка, и это получилось плохо - были пробемы с организацией
          файлов и путей к ним, а так же много повторяющегося кода.
        </div>
        <div class="project__desc-images project__desc-images--first">
          <img
            class="project__desc-image"
            src="@/assets/previews/portfolio2_1.jpg"
          />
          <div class="project__desc-image-wrapper">
            <img
              class="project__desc-image project__desc-image--overlaying"
              src="@/assets/previews/portfolio2_2.jpg"
            />
          </div>
        </div>
        <div class="project__desc-text">
          Существующие проблемы я решил исправить с помощью фрейморка. С этого
          момента я начал изучать Vue, параллельно переводя сайт на него.
        </div>
      </div>
      <div class="project__desc-conclusions">
        <div class="project__desc-headline project__desc-headline--first">
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

    whatILearnedList: [
      {
        title: "Использование Vue для создания SPA",
        desc: "с использованием Vue router",
        link: "https://github.com/mayflaua/me/tree/master/src",
      },
      {
        title: "Сборка и публикация сайта",
        desc: "на хостинг (был на текущем домене)",
        link: "https://mayflaua.github.io/me",
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
    applyWhatILearnedAnimations() {
      // animate boxes to side lines
      const opts1 = {
        x: 0,
        y: 0,
        width: 0,
        scrollTrigger: {
          trigger: ".project__desc-conclusions",
          start: "-50px center",
          end: "+=70px",
          scrub: 0.5,
        },
      };
      // extend line heights
      const opts2 = {
        height: document.querySelector(".project__desc-conclusions")
          .offsetHeight,
        borderWidth: 2,
        "box-shadow": "5px 0 205px 5px rgba(255, 255, 255, 0.6)",
        scrollTrigger: {
          scrub: 0.5,
          trigger: ".project__desc-conclusions",
          start: "10% center",
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
          start: "150% bottom",
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
      this.applyWhatILearnedAnimations();
      this.applyImageAnimation();
    },
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
      lighten(#ffaa00, 5)
    );
  }
  &3 {
    z-index: 12;

    background: linear-gradient(
      to right,
      lighten(#ffaa00, 10),
      lighten(#ffaa00, 5)
    );
  }
  &4 {
    z-index: 11;

    background: linear-gradient(to right, lighten(#ffaa00, 5), #ffaa00);
  }
}
.project {
  background-color: white;
  color: black;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

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
    background-color: lighten($purple, 10);
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
      font-size: 26px;
    }

    &-images {
      &--first {
        position: relative;
        margin: 60px auto 0 auto;
        transition: 1s ease-in-out;

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
            border-bottom: 5px solid #ffaa00;
          }
        }
      }
    }

    &-headline {
      width: 100%;
      text-align: center;
      font-size: clamp(14px, 3.5vw, 32px);
      font-weight: 600;

      &--first {
        position: relative;

        .box {
          &1,
          &2 {
            box-shadow: 5px 0 205px 5px rgba(#ffd073, 0.1);
            z-index: 10;
            position: absolute;
            width: 70%;
            height: 60px;
            border: 4px solid #ffd073;
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

    &-conclusions {
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
          box-shadow: 0 15px 35px 0px rgba(#ffaa00, 0.1);

          & > .conclusion__title,
          & > .conclusion__desc {
            background: lighten(#ffbf40, 20);
          }
        }

        &:hover::before,
        &:hover::after {
          display: block;
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          background: #ffaa00;
          z-index: 1;
          filter: blur(3px);
          box-shadow: 0 0 80px #ffaa00;

          animation: 1s a linear infinite;
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
          transition: background 1s;
          z-index: 2;
          position: relative;
          width: 100%;
          padding: 15px 0 10px 0;
          text-align: center;
          font-size: clamp(12px, 3vw, 30px);
          font-weight: 600;
          color: #ffaa00;
          background: white;
        }

        &__desc {
          color: black;
          transition: background 1s;
          z-index: 2;
          position: relative;
          padding: 0 0 15px 0;
          background: white;
          width: 100%;
          font-size: clamp(12px, 1.8vw, 24px);
          text-align: center;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .project {
    &__desc {
      &-text {
        font-size: 22px;
        width: 85%;
        margin: 0 auto;
      }
      &-images {
        margin: 30px auto;
      }
    }
  }
}
@media (max-width: 650px) {
  .project {
    &__desc {
      &-text {
        margin: 30px auto;
      }
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
        font-size: 18px;
      }
    }
  }
}
</style>
