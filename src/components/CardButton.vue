<template>
  <div class="button" @click="showModal" v-if="!link">
    <div class="button__text">{{ text }}</div>
  </div>
  <a class="button" :href="link" target="_blank" v-else>
    <div class="button__text">{{ text }}</div>
  </a>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__content-title">{{ modalTitle }}</div>
      <div class="modal__content-images">
        <img
          :src="require(`@/assets/previews/${img}`)"
          v-for="img in modalImages"
          :key="img"
        />
      </div>
      <div class="modal__content-desc" v-for="p in modalDesc" :key="p">
        {{ p }}
      </div>
    </div>
    <div class="modal__close" @click="hideModal"></div>
  </div>
</template>

<script>
import gsap from "gsap";
let tl = gsap.timeline({ paused: true });

export default {
  data() {
    return {
      modalReady: false,
      scaled: false,
    };
  },
  props: {
    text: { type: String, default: "подробнее" },
    modalTitle: { type: String, required: true },
    modalImages: { type: Array, required: true },
    modalDesc: { type: Array, required: true },

    link: { type: String, default: null },
  },

  methods: {
    showModal() {
      tl.play();
    },

    hideModal() {
      tl.reverse();
    },
  },

  mounted() {
    tl.to(".modal", {
      top: 0,
      duration: 0.5,
      ease: "default",
      display: "block",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.button {
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  display: block;

  width: 180px;
  margin: 0 8px 0 0;
  height: 40px;
  background-color: transparent;
  border: 2px solid #9063cd;
  &:after {
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
  &__text {
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

.modal {
  overflow: auto;
  display: none;
  position: fixed;
  top: -100%;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 481516;
  background: #252525;

  &__content {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 50px;
    &-title {
      text-align: center;
      font-size: 38px;
      font-weight: 600;
    }
    &-images {
      margin: 30px auto;
      width: 80%;
      min-height: 150px;

      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;

      & img {
        transition: 0.5s ease;
        display: block;
        width: 450px;
        margin: 15px;

        &:hover {
          transform: scale(1.2);
        }
      }
    }

    &-desc {
      text-align: center;
      margin: 25px auto;
      width: 80%;
      font-size: 22px;
    }
  }

  &__close {
    cursor: pointer;
    position: absolute;
    top: 30px;
    right: 8%;
    width: 40px;
    height: 40px;
    background: transparent;
    transition: 0.1s ease;
    opacity: 0.7;

    &:hover {
      transform: rotate(360deg);
      opacity: 1;
      &:before,
      &:after {
        background: $purple;
      }
    }

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
      height: 2px;
      background: white;
      border-radius: 2px;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }
}

@media (max-width: 900px) {
  .modal__content-desc {
    width: 100%;
    font-size: 20px;
  }
}

@media (max-width: 500px) {
  .modal__content-images img {
    width: 350px;
  }
  .modal__content-desc {
    font-size: 18px;
  }

  .button {
    width: 120px;
    &__text {
      font-size: 14px;
    }
  }
}
@media (max-width: 370px) {
  .modal__content-images img {
    width: 250px;
    margin: 7px;
  }
}
</style>
