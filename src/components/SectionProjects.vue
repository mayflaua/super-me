<template>
  <section id="projects" class="projects">
    <!-- TODO: make this title krasivoe -->
    <div class="projects__title">
      <svg class="circles" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="5" dy="5" result="offsetblur" />
            <feFlood flood-color="black" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle class="circle circle1" r="30vw" cx="50%" cy="30vw" />
        <circle class="circle circle2" r="20vw" cx="50%" cy="30vw" />
        <circle class="circle circle3" r="10vw" cx="50%" cy="30vw" />
      </svg>
      Проекты
    </div>
    <div
      v-for="(project, num) in projects"
      :key="num"
      class="project-card"
      :class="project.current ? 'project-card--current' : ''"
    >
      <div class="project-card__number">{{ num + 1 }}</div>
      <div class="project-card__content">
        <div class="project-card__overlay" />
        <div class="project-card__content-title">{{ project.title }}</div>
        <div class="project-card__content-desc">
          {{ project.desc }}
        </div>
        <div class="project-card__buttons">
          <div
            class="project-card__button"
            @click="$emit('open', project.route)"
          >
            <div class="project-card__button-text">
              <span>подробнее</span>
            </div>
          </div>

          <a
            v-if="project.link"
            class="project-card__button"
            :href="project.link"
            target="_blank"
          >
            <div class="project-card__button-text">перейти</div>
          </a>
        </div>
      </div>
    </div>
    <div class="star">
      <div class="star__background" />
      <a
        class="star__image"
        href="https://apod.nasa.gov/apod/ap010302.html"
        target="_blank"
      />
      <div class="star__text">
        Изображение молодой звезды, сделанное NASA в день моего рождения
      </div>
    </div>
  </section>
</template>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  emits: ["open"],
  data: () => ({
    projects: [
      {
        route: "portfolio",
        title: "Портфолио",
        desc: "Первое, что я решил сделать, освоя HTML/CSS - это сверстать сайт-портфолио в стилистике десктоп приложения. Здесь же и началось изучение JS со всеми сопутствующими начинающему неудачными решениями.",

        link: "https://mayflaua.github.io",
      },
      {
        route: "passgen",
        title: "Генератор паролей",
        desc: "Чтобы углубиться в JavaScript, я решил написать генератор паролей. Сложность была не в самом алгоритме, а в анимации генерации пароля.",
      },
      {
        route: "kitten",
        title: '"Котенок и огурцы"',
        desc: "Игра, схожая по механихе с Google Dinosaur game, в которой котенку нужно просто бежать вперед, избегая огурцы и летучих мышей.",
      },
      {
        route: "portfolio2",
        title: "Портфолио 2",
        desc: "Вторая версия портфолио, в которой я решил собрать все проекты, убрав дизайн на второй план.",

        link: "https://mayflaua.github.io/me/",
      },
      {
        route: "grocery",
        title: "Список покупок",
        desc: "Немного измененный to do list с использованием Vuex.",
      },
      {
        route: "portfolio3",
        title: "Портфолио 3",
        desc: "Сайт, на котором Вы сейчас находитесь. Третья версия портфолио, в которой дизайн стал намного приоритетнее.",
        // highlights this card
        // current: true,
      },
    ],
  }),

  mounted() {
    this.applyProjectsAnimation();
  },
  methods: {
    applyProjectsAnimation() {
      document.querySelectorAll(".project-card__overlay").forEach((overlay) => {
        gsap.to(overlay, {
          width: "0",
          duration: 0.4,
          scrollTrigger: {
            trigger: overlay,
            toggleActions: "play none play reset",
          },
          ease: "ease",
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/style/colors.scss";

.projects {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: $dark-color;
  padding: 60px 0 0 0;

  &__title {
    font-weight: 600;
    font-size: clamp(28px, 3vw, 40px);
    text-align: center;
    color: $purple;
    position: relative;
    text-shadow: 0 5px 2px black;

    .circles {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      overflow: visible;

      .circle {
        fill: none;
        stroke: $purple;
        stroke-width: 5;
        stroke-dasharray: 20% 0;
        stroke-dashoffset: -20%;
        stroke-opacity: 0.2;
        animation: 60s circle ease-in infinite alternate;
        filter: url(#shadow);

        &2 {
          animation-delay: 30%;
          animation-direction: reverse;
          animation-duration: 30s;
        }
        &3 {
          animation-delay: -30%;
          animation-duration: 40s;
        }
        @keyframes circle {
          to {
            stroke-dasharray: 0 200%;
            stroke-dash-offset: 20%;
          }
        }
      }
    }
  }

  & .project-card {
    display: flex;
    margin: 40px auto;
    width: 100%;
    min-height: 100px;
    &__content {
      position: relative;
      .project-card__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: -20px;
        background-color: $purple;
        z-index: 6;
      }
    }

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
      text-decoration: none;

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

    &--current {
      .project-card__content {
        position: relative;
        .project-card__buttons,
        &-title,
        &-desc {
          z-index: 2;
          position: relative;
        }

        &:after {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          content: "";
          background: linear-gradient(
            45deg,
            transparent 45%,
            rgba($purple, 0.2) 50%,
            transparent 55%
          );
          background-size: 400% 400%;
          animation: 1.5s gradient linear infinite;

          @keyframes gradient {
            from {
              background-position: 0% 50%;
            }
            to {
              background-position: 100% 50%;
            }
          }
        }
      }
    }
  }

  & .star {
    width: 100%;
    padding: 150px 0;
    position: relative;
    &__background {
      box-shadow: 0 0 100px 80px $dark-color inset;
      position: absolute;
      background: url(@/assets/space.jpg);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      mix-blend-mode: lighten;
      background-position: 0% 0%;
      background-size: 50%;
      animation: 120s space ease-in-out infinite alternate;

      @keyframes space {
        0% {
          background-position: 50% 50%;
        }
        25% {
          background-position: 70% 35%;
        }
        50% {
          background-position: 25% 25%;
        }
        75% {
          background-position: 25% 90%;
        }
        100% {
          background-position: 100% 100%;
        }
      }
    }
    &__image {
      margin: 50px auto;
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
      position: relative;
      text-align: center;
      width: 90%;
      font-size: 1rem;
      color: #bbb;
      margin: 1em auto 0 auto;
    }
  }
}
</style>
