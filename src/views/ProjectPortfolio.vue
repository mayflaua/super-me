<template>
  <div>
    <div class="overlays">
      <div class="overlay overlay1"></div>
      <div class="overlay overlay2">
        <span class="overlay-text">HTML</span>
      </div>
      <div class="overlay overlay3">
        <span class="overlay-text">CSS</span>
      </div>
      <div class="overlay overlay4"><span class="overlay-text">JS</span></div>
    </div>
    <div class="project">
      <div class="project__title">Портфолио</div>
      <div class="project__desc">
        <div class="project__desc-text">
          Упор был на практику верстки, дизайн был взят из Figma. Начинал еще не
          зная JS совсем, начав изучать его дойдя до реализации змейки на
          главной странице. Код был взят из открытых источников, после чего был
          изменен и доработан под макет.
          <img
            class="project__desc-image project__desc-image--first"
            src="@/assets/previews/portfolio1.jpg"
          />
        </div>
      </div>
      <div @click="back">назад</div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

let tl = gsap.timeline({ paused: true });
export default {
  data: () => ({}),

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
      tl.reverse().then(() => this.$router.push("/"));
      this.setScrolling(false);
    },
    applyAnimations() {
      tl.to(".overlay", {
        width: "0vw",
        duration: 0.3,
        stagger: 0.3,
      });
    },
  },

  mounted() {
    this.applyAnimations();
  },

  activated() {
    tl.play().then(() => this.setScrolling(true));
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
  height: 100vh;

  &-text {
    color: white;
    position: absolute;
    top: 50%;
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
      lighten($purple, 10)
    );
  }
  &3 {
    z-index: 12;

    background: linear-gradient(
      to right,
      lighten($purple, 10),
      lighten($purple, 15)
    );
  }
  &4 {
    z-index: 11;

    background: linear-gradient(
      to right,
      lighten($purple, 15),
      lighten($purple, 20)
    );
  }
}
.project {
  background-color: $dark-color;
  color: white;
  min-height: 100vh;
  width: 100%;

  &__title {
    width: 100%;
    text-align: center;
    font-size: clamp(24px, 3vw, 42px);
    font-weight: 500;
    padding: 15px 0 10px 0;
    border-bottom: 1px solid $purple;
    background-color: darken($purple, 30);
    animation: flicker 1s infinite;
  }

  &__desc {
    display: flex;
    justify-content: space-between;
    &-text {
      font-weight: 500;
      width: 70%;
      text-align: center;
      margin: 150px auto;
      padding: 0 25px;
      font-size: 26px;
    }

    &-image {
      display: block;
      margin: 160px auto;
      width: 80%;
      transition: 1s ease-in-out;
      box-shadow: 0 0 20+6px 2px rgba(#fff, 0.4);

      &:hover {
        transform: scale(1.2);
        animation: 3s flicker infinite;
      }
    }
  }
}
</style>
