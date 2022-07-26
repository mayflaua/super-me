<template>
  <!-- FIXME: не рендерится если зайти через back без предзагрузки -->
  <!-- пока что вставил релоад в page-reloader если пять сек грузится -->
  <main class="content">
    <page-preloader v-if="isLoading" />
    <transition name="fade">
      <header v-if="helloAnimationDone" class="menu">
        <nav class="menu__list">
          <glitched-writer
            text="обо мне"
            tag="div"
            class="menu__list-item"
            preset="cosmic"
            :options="menuAppearingOptions"
            appear
            @click="goTo('about')"
          />
          <glitched-writer
            text="проекты"
            tag="div"
            class="menu__list-item"
            preset="cosmic"
            :options="menuAppearingOptions"
            appear
            @click="goTo('projects')"
          />
          <glitched-writer
            text="связаться"
            tag="div"
            class="menu__list-item"
            preset="cosmic"
            :options="menuAppearingOptions"
            appear
            @click="goTo('contact')"
          />
        </nav></header
    ></transition>
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
      <transition name="fade">
        <svg
          v-show="helloAnimationDone"
          class="hello__arrow"
          @click="goTo('about')"
        >
          <path d="M0 0 L30 32 L60 0" />
          <path d="M0 20 L30 52 L60 20" />
          <path d="M0 40 L30 72 L60 40" /></svg
      ></transition>
      <!-- background particles -->
      <transition name="fade">
        <div v-show="helloAnimationDone" v-if="!isMobile" class="particles">
          <div data-depth="0.3" class="particle particle1" />
          <div data-depth="0.2" class="particle particle2" />
          <div data-depth="0.1" class="particle particle3" /></div
      ></transition>
      <!-- background gradient -->
      <transition name="fade"
        ><div v-show="helloAnimationDone" class="hello__bg"
      /></transition>
    </section>

    <section id="about" class="about">
      <div class="about__main">
        <div class="about__basics">
          <div class="basics__title">
            Frontend-разработчик с небольшим опытом, но с огромным энтузиазмом.
          </div>
          <p class="basics__subtitle">
            Стараюсь делать полезные, красивые и фунцкиональные
            веб-приложения.<br />Использую Vue 3
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
      <transition name="fade"
        ><div v-show="helloAnimationDone" class="about__bg"
      /></transition>
    </section>

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
            <div class="project-card__button" @click="open(project.route)">
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

    <section id="contact" class="contact">
      <div class="contact__form-wrapper">
        <form action="" class="contact__form">
          <div class="input-wrapper">
            <input
              v-model="formName"
              class="input form__name"
              type="text"
              name="name"
              required
            /><span
              class="input__label"
              :class="formName ? 'input__label--notEmpty' : ''"
              >{{ nameValid ? "ИМЯ" : ">2 СИМВОЛОВ" }}</span
            >
          </div>
          <div class="contact-method">
            <div
              class="input-wrapper"
              :class="
                selectedContactMethod == 'email'
                  ? 'input-wrapper--selected'
                  : ''
              "
            >
              <div
                class="input-radio"
                :class="
                  selectedContactMethod == 'email'
                    ? 'input-radio--selected'
                    : ''
                "
                @click="selectedContactMethod = 'email'"
              />
              <input
                v-model="formEmail"
                type="email"
                class="input form__email"
                name="email"
                required
                @focus="selectedContactMethod = 'email'"
              /><span
                class="input__label"
                :class="formEmail ? 'input__label--notEmpty' : ''"
                >{{
                  emailValid
                    ? "EMAIL"
                    : selectedContactMethod == "email"
                    ? "example@mail.com"
                    : "EMAIL"
                }}</span
              >
            </div>
            <div class="contact-method__divider">/</div>
            <div
              class="input-wrapper"
              :class="
                selectedContactMethod == 'telegram'
                  ? 'input-wrapper--selected'
                  : ''
              "
            >
              <div
                class="input-radio"
                :class="
                  selectedContactMethod == 'telegram'
                    ? 'input-radio--selected'
                    : ''
                "
                @click="selectedContactMethod = 'telegram'"
              />
              <input
                v-model="formTelegram"
                type="text"
                class="input form__telegram"
                name="telegram"
                required
                @focus="selectedContactMethod = 'telegram'"
              /><span
                class="input__label"
                :class="formTelegram ? 'input__label--notEmpty' : ''"
                >{{
                  emailValid
                    ? "TELEGRAM"
                    : selectedContactMethod == "telegram"
                    ? ">4 СИМВОЛОВ"
                    : "TELEGRAM"
                }}</span
              >
            </div>
          </div>

          <div class="input-wrapper">
            <textarea
              v-model="formMessage"
              class="input form__message"
              name="message"
              rows="4"
              required
            /><span
              class="input__label"
              :class="formMessage ? 'input__label--notEmpty' : ''"
              >{{ messageValid ? "СООБЩЕНИЕ" : ">1 СЛОВА" }}</span
            >
          </div>
          <back-button
            class="form__send-btn"
            text="ОТПРАВИТЬ"
            @click.prevent="sendForm"
          />
        </form>
      </div>
    </section>
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
import $ from "jquery";

import GlitchedWriter from "vue-glitched-writer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollTo from "gsap/ScrollToPlugin";
import Parallax from "parallax-js";
import PagePreloader from "@/components/PagePreloader";
gsap.registerPlugin(ScrollTrigger, ScrollTo);

import BackButton from "@/components/BackButton";

// let tl = gsap.timeline({ paused: true });
let pageTl = gsap.timeline({ paused: true });

export default {
  name: "MainView",
  components: {
    GlitchedWriter,
    PagePreloader,
    BackButton,
  },
  data() {
    return {
      scrollPositionBeforeLeaving: 0,
      firstLoad: true,
      scrollAllowed: false,
      helloAnimationDone: false,
      menuAppearingOptions: {
        delay: [30, 60],
      },
      isLoading: true,

      formName: "",
      formEmail: "",
      formMessage: "",
      formTelegram: "",
      selectedContactMethod: "email",

      nameValid: true,
      emailValid: true,
      telegramValid: true,
      messageValid: true,

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
    };
  },

  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
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

  methods: {
    sendForm() {
      if (this.validateForm()) {
        let data = $(".contact__form").serialize();
        data += `&method=${this.selectedContactMethod}`;
        $.ajax({
          url: "https://letmepresentmyself.site/send.php",
          method: "post",
          dataType: "html",
          data: data,
          success: () => console.info("form sent"),
          error: () => console.log("form wasnt sent"),
        });
        this.formName = "";
        this.formEmail = "";
        this.formTelegram = "";
        this.formMessage = "";
        $(".contact__form .invalid").removeClass("invalid");
      }
    },

    validateForm() {
      const [name, email, telegram, message] = $(".contact__form .input");
      // validator
      const validate = {
        name: (el) => el.value.length > 2,
        email: (el) =>
          el.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        telegram: (el) => el.value.length >= 5,
        message: (el) => el.value.split(" ").length > 1,
      };
      // reset inputs validity style
      [name, email, telegram, message].forEach((el) => {
        el.classList.remove("invalid");
      });

      this.nameValid = validate.name(name);
      this.emailValid = validate.email(email);
      this.telegramValid = validate.telegram(telegram);
      this.messageValid = validate.message(message);

      if (!this.nameValid) name.classList.add("invalid");
      if (!this.emailValid) email.classList.add("invalid");
      if (!this.telegramValid) telegram.classList.add("invalid");
      if (!this.messageValid) message.classList.add("invalid");

      // consider only selected contact method
      let results = [this.nameValid, this.messageValid];
      this.selectedContactMethod == "email"
        ? results.push(this.emailValid)
        : results.push(this.telegramValid);

      return results.every((el) => el);
    },

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
      this.applyProjectsAnimation();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/particles.scss";
@import "@/style/colors.scss";

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

/* projects section style */
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

/* contact section style */
.contact {
  width: 100%;
  min-height: 100vh;
  padding: 50px 0 0 0;
  background: linear-gradient($dark-color, $blue);

  &__form-wrapper {
    width: 60%;
    margin: 0 auto;
    .contact__form {
      display: flex;
      flex-direction: column;

      .input-wrapper {
        margin: 25px 0 10px 0;
        position: relative;

        .input__label {
          transition: all 0.3s ease-in-out;
          pointer-events: none;
          font-size: 18px;
          font-weight: 500;
          position: absolute;
          top: 10px;
          left: 5px;

          &--notEmpty {
            top: -12px;
            font-size: 14px;
            color: $purple;
          }
        }
      }
      .form {
        &__send-btn {
          margin: 25px auto 0 auto;
          width: 140px;
        }
        &__name,
        &__email,
        &__message,
        &__telegram {
          background: transparent;
          color: white;
          border: none;
          outline: none;
          border-bottom: 3px solid $purple;
          width: 100%;
          transition: border 0.2s ease;

          &.invalid {
            border-color: rgb(255, 74, 74);
          }

          &:focus ~ .input__label {
            top: -12px;
            font-size: 14px;
            color: $purple;
          }
        }
        &__name,
        &__email,
        &__telegram {
          position: relative;
          height: 40px;
        }

        &__message {
          padding: 10px 5px;
          resize: vertical;
          max-height: 150px;
          min-height: 40px;
        }
      }
    }
  }

  &-method {
    display: flex;
    justify-content: space-between;

    .input-wrapper {
      width: 45%;
      position: relative;

      .input-radio {
        display: none;

        position: absolute;
        height: 20px;
        width: 20px;
        top: 13px;
        left: -40px;
        background: transparent;
        border: 2px solid $purple;
        border-radius: 50%;

        &:before {
          transition: opacity 0.2s ease,
            transform 0.2s cubic-bezier(0.26, 0.15, 0.82, 5);
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          background: $purple;
          animation: 3s flicker infinite alternate;

          opacity: 0;
          transform: scale(0.2);
        }

        &--selected:before {
          opacity: 1;
          transform: none;
        }
      }

      .input,
      .input__label {
        opacity: 0.5;
      }

      &--selected {
        .input,
        .input__label {
          opacity: 1;
        }
      }
    }

    &__divider {
      width: 10%;
      text-align: center;
      margin: 25px 0 10px 0;
      line-height: 40px;
      color: $purple;
      font-weight: 600;
    }
  }
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

  .contact {
    &-method {
      flex-direction: column;

      .input-wrapper {
        width: 100%;

        .input-radio {
          display: block;
        }

        .input,
        .input__label {
          pointer-events: none;
        }
        &--selected {
          .input,
          .input__label {
            pointer-events: auto;
          }
        }
      }

      &__divider {
        display: none;
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

  .contact__form {
    .input-wrapper {
      .input__label {
        font-size: 14px !important;
      }
    }
  }
}
</style>
