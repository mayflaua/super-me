<template>
  <div :style="{ overflow: isAnimating ? 'hidden' : 'auto' }">
    <div class="overlays">
      <div class="overlay overlay1"></div>
      <div class="overlay overlay2">
        <span class="overlay-text">kaboom.js</span>
      </div>
      <div class="overlay overlay3">
        <span class="overlay-text">Котенок</span>
      </div>
      <div class="overlay overlay4">
        <span class="overlay-text">и&nbsp;огурцы</span>
      </div>
    </div>
    <div class="project">
      <div class="project__title">Котенок и огурцы</div>
      <div class="project__desc">
        <div class="project__desc-text">
          Игра-раннер, написанная на JavaScript c использованием библиотеки
          <a href="https://kaboomjs.com/" target="_blank" class="link">
            kaboom.js
          </a>
        </div>
        <div class="project__desc-images project__desc-images--first">
          <video
            playsinline
            autoplay
            muted
            loop
            class="project__desc-image"
            src="@/assets/previews/kitten.webm"
          />
        </div>
        <div class="project__desc-text">
          Чтобы отвлечься от базовых технологий HTML/CSS/JS и пополнить
          портфолио чем-то интересным, я решил сделать Google Dino на свой лад -
          с кошкой и огурцами.<br />Все спрайты, кроме заднего фона нарисованы
          моей девушкой.
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
            :href="item.link"
            target="_blank"
            class="conclusion"
            v-for="item in whatILearnedList"
            :key="item.title"
          >
            <div class="conclusion__title">{{ item.title }}</div>
            <div class="conclusion__desc">{{ item.desc }}</div>
          </a>
        </div>
      </div>
      <img class="kitten" src="@/assets/gif/kitten.gif" />
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
        title: "Использование kaboom.js",
        desc: "для создания игры всего за два дня",
        link: "https://github.com/mayflaua/me/blob/master/games/kitten/script/kitten.js",
      },
      {
        title: "Создание спрайтов из отдельно взятых изображений",
        desc: "для создания эффекта анимации",
        link: "https://github.com/mayflaua/me/blob/master/tools/password/script/password.js",
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
      overlays.reverse().then(() => this.$router.push("/"));
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
              this.applyWhatILearnedAnimations();
            },
          }
        );
    },

    applyAnimations() {
      this.isAnimating = false;

      this.applyWhatILearnedAnimations();
      this.animationsApplied = true;
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
$sky: rgb(137, 206, 248);
$grass: #87b275;
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
      lighten($grass, 10)
    );
  }
  &3 {
    z-index: 12;

    background: linear-gradient(
      to right,
      lighten($grass, 10),
      lighten($sky, 10)
    );
  }
  &4 {
    z-index: 11;

    background: linear-gradient(to right, lighten($sky, 10), $sky);
  }
}
.project {
  background: $grass;
  color: black;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;

  .back-button {
    margin: 110px auto;
  }

  .kitten {
    display: block;
    margin: 0 auto;
    transform: translate(-50px, 110px);
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
    background: linear-gradient(to bottom, $sky 50%, $grass 50%);

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
      color: white;
      text-shadow: 0 0 20px $sky;

      .link {
        color: $purple;
        text-decoration: underline;
      }
    }

    &-images {
      &--first {
        position: relative;
        margin: 60px auto 0 auto;

        .project__desc-image {
          width: 100vw;
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
        color: white;
        text-shadow: 2px 0 15px $sky;
        .box {
          &1,
          &2 {
            box-shadow: 5px 0 205px 5px rgba($sky, 0.5);
            z-index: 10;
            position: absolute;
            width: 70%;
            height: 60px;
            border: 4px solid $sky;
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
          box-shadow: 0 15px 35px 0px rgba($sky, 0.1);

          & > .conclusion__title,
          & > .conclusion__desc {
            background: darken($grass, 10);
          }
        }

        &:hover::before,
        &:hover::after {
          display: block;
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          background: $sky;
          z-index: 1;
          filter: blur(3px);
          animation: 1s a linear infinite;
          box-shadow: 0 0 80px $sky;
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
          background: $grass;
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
          background: $grass;
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

        .image-overlay {
          font-size: 16px;
          opacity: 0.7;
          height: 30px;
          top: -30px;
        }
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
