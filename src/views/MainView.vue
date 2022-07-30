<template>
  <!-- FIXME: не рендерится если зайти через back без предзагрузки -->
  <!-- пока что вставил релоад в page-reloader если пять сек грузится -->
  <main class="content">
    <page-preloader v-if="isLoading" />
    <transition name="fade">
      <page-menu v-if="helloAnimationDone" @clicked="goTo"
    /></transition>
    <section-hello
      :is-mobile="isMobile"
      :is-loading="isLoading"
      @said-hello="saidHello"
      @arrow-clicked="goTo('about')"
    />
    <section-about :hello-animation-done="helloAnimationDone" />

    <section-projects @open="open" />
    <section id="contact" class="contact">
      <div class="contact__form-wrapper">
        <form action="" class="contact__form">
          <div class="input-wrapper">
            <input
              v-model="formName"
              class="input form__name"
              :class="formSending ? 'form__name--formSending' : ''"
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
                :class="
                  formSending && selectedContactMethod == 'email'
                    ? 'form__email--formSending'
                    : ''
                "
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
                :class="
                  formSending && selectedContactMethod == 'telegram'
                    ? 'form__telegram--formSending'
                    : ''
                "
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
              :class="formSending ? 'form__message--formSending' : ''"
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
            v-if="!formSending"
            class="form__send-btn"
            text="ОТПРАВИТЬ"
            @click.prevent="sendForm"
          />
          <form-loader v-if="formSending" class="form-loader" />
        </form>
      </div>
      <transition name="modal">
        <div v-show="thanksModalVisible" class="thanks-modal">
          <div class="thanks-modal__title">Спасибо, форма отправлена.</div>
          <div class="thanks-modal__subtitle">Вскоре я отвечу.</div>
          <back-button
            class="thanks-modal__close"
            text="ЗАКРЫТЬ"
            @click="hideThanksModal"
          /></div
      ></transition>
    </section>
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
import $ from "jquery";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollTo from "gsap/ScrollToPlugin";
import PagePreloader from "@/components/PagePreloader";
gsap.registerPlugin(ScrollTrigger, ScrollTo);

import PageMenu from "@/components/PageMenu";
import SectionHello from "@/components/SectionHello";
import SectionAbout from "@/components/SectionAbout";
import SectionProjects from "@/components/SectionProjects";
import BackButton from "@/components/BackButton";
import FormLoader from "@/components/FormLoader";

let pageTl = gsap.timeline({ paused: true });

export default {
  name: "MainView",
  components: {
    PagePreloader,
    BackButton,
    FormLoader,
    PageMenu,
    SectionHello,
    SectionAbout,
    SectionProjects,
  },
  data() {
    return {
      scrollPositionBeforeLeaving: 0,
      firstLoad: true,
      scrollAllowed: false,
      helloAnimationDone: false,

      isLoading: true,

      formName: "",
      formEmail: "",
      formMessage: "",
      formTelegram: "",
      selectedContactMethod: "email",
      formSending: false,
      thanksModalVisible: false,

      nameValid: true,
      emailValid: true,
      telegramValid: true,
      messageValid: true,
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
    showThanksModal() {
      this.formSending = false;
      this.setScrolling(false);
      this.thanksModalVisible = true;
    },
    hideThanksModal() {
      this.setScrolling(true);
      this.thanksModalVisible = false;
    },
    sendForm() {
      if (this.validateForm()) {
        this.formSending = true;
        let data = $(".contact__form").serialize();
        data += `&method=${this.selectedContactMethod}`;
        $.ajax({
          url: "https://letmepresentmyself.site/send.php",
          method: "post",
          dataType: "html",
          data: data,
          success: () => this.showThanksModal(),
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
    saidHello() {
      this.helloAnimationDone = true;
      this.setScrolling(true);
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
        scrollTo: { y: `#${section}`, autoKill: true },
        ease: "power1.inOut",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  filter: blur(100px);
}

/* main style */
* {
  box-sizing: border-box;
}

.content {
  width: 100%;
  min-height: 100vh;
  background: $dark-color;
  color: white;
  overflow: auto;
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
        &-loader {
          margin: 25px auto 0 auto;
        }
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

          &--formSending {
            animation: 0.3s border-flashing ease-in-out infinite alternate;
            pointer-events: none;

            @keyframes border-flashing {
              to {
                border-color: darken($purple, 30);
              }
            }
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

  .thanks-modal {
    width: clamp(200px, 70vw, 900px);
    height: clamp(150px, 40vh, 400px);
    position: fixed;
    border: 3px solid $purple;
    background: rgba($blue, 0.8);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px $purple;
    z-index: 100;

    &__title,
    &__subtitle {
      text-align: center;
      width: 100%;
      color: white;
      font-weight: 600;
    }

    &__title {
      margin: 30px 0 0 0;
      font-size: clamp(24px, 1.5vw, 32px);
    }
    &__subtitle {
      margin: 15px 0 0 0;
      font-size: clamp(22px, 1.3vw, 30px);
    }

    &__close {
      margin: 0 auto;
    }
  }
}

/* media queries */
@media (max-width: 768px) {
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
