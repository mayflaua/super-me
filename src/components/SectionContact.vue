<template>
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
              selectedContactMethod == 'email' ? 'input-wrapper--selected' : ''
            "
          >
            <div
              class="input-radio"
              :class="
                selectedContactMethod == 'email' ? 'input-radio--selected' : ''
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
    <div class="bg">
      <div class="bg__line"></div>
      <div class="links">
        <a
          href="https://github.com/mayflaua"
          target="_blank"
          class="link link--gh"
        ></a>
        <a
          href="mailto:num1carbon@gmail.com"
          target="_blank"
          class="link link--email"
        ></a>
        <a href="https://t.me/pogas" target="_blank" class="link link--tg"></a>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import FormLoader from "@/components/FormLoader";
import BackButton from "@/components/BackButton";

export default {
  components: {
    FormLoader,
    BackButton,
  },
  emits: ["modal-open", "modal-close"],
  data: () => ({
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
  }),

  methods: {
    showThanksModal() {
      this.formSending = false;
      this.$emit("modal-open");
      this.thanksModalVisible = true;
    },
    hideThanksModal() {
      this.$emit("modal-close");
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
  },
};
</script>

<style lang="scss">
@import "@/style/colors.scss";

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  filter: blur(100px);
}

.contact {
  width: 100%;
  min-height: 100vh;
  padding: 50px 0 0 0;
  background: $dark-color;
  position: relative;

  &__form-wrapper {
    width: 60%;
    margin: 0 auto;
    .contact__form {
      position: relative;
      z-index: 2;

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
    z-index: 2;
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
          top: 5px;
          left: 5px;
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
      margin: 0 10px;
    }

    &__title {
      margin: 30px 0 0 0;
      font-size: clamp(20px, 1.5vw, 32px);
    }
    &__subtitle {
      margin: 15px 0 0 0;
      font-size: clamp(18px, 1.3vw, 30px);
    }

    &__close {
      margin: 0 auto;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10px;
    }
  }

  .bg {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    perspective: 300px;
    perspective-origin: 50% 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    background: linear-gradient($dark-color 60%, $blue);

    &__line {
      width: 200%;
      height: 130%;
      position: absolute;
      top: -30%;
      bottom: -30%;
      left: -50%;

      background: -webkit-linear-gradient($purple, transparent 2px),
        -webkit-linear-gradient(left, $purple, transparent 2px);
      background-size: 100px 100px, 100px 100px;

      transform: rotateX(60deg);
      animation: 4s moving linear infinite;

      box-shadow: 0 400px 1000px $dark-color inset;
    }
    @keyframes moving {
      from {
        background-position: 0px 0px, 0px 0px;
      }
      to {
        background-position: 0px -100px, 0 100px;
      }
    }

    .links {
      position: relative;
      z-index: 2;
      width: 30%;
      height: 100px;

      display: flex;
      justify-content: space-around;
      align-items: center;

      perspective: 150px;

      &:hover:before {
        opacity: 1;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 32px;
        background: $purple;

        animation: 3s flicker infinite alternate;
        transition: opacity 0.5s ease-out;

        opacity: 0.7;

        transform: rotateX(60deg);
        transform-style: preserve-3d;
      }

      .link {
        display: block;
        width: 32px;
        height: 32px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.8;
        transition: opacity 0.3s ease, transform 0.5s ease-out;

        &--gh {
          background-image: url("@/assets/icons/github.png");
        }
        &--email {
          background-image: url("@/assets/icons/email.png");
        }
        &--tg {
          background-image: url("@/assets/icons/telegram.png");
        }

        &:hover {
          opacity: 1;
          transform: translateY(-5px);
        }
      }
    }
  }
}

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
    .bg {
      perspective: 200px;
    }
  }
}

@media (max-width: 500px) {
  .contact {
    .contact__form {
      .input-wrapper {
        .input__label {
          font-size: 14px !important;
        }
      }
    }

    .bg {
      .links {
        width: 60%;
      }

      &__line {
        background-size: 100px 30px, 30px 100px;
      }
    }
  }
}
</style>
