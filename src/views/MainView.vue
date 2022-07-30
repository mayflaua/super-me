<template>
  <!-- FIXME: не рендерится если зайти через back без предзагрузки -->
  <!-- пока что вставил релоад в page-reloader если пять сек грузится -->
  <main class="content">
    <page-preloader v-if="isLoading" />
    <transition name="fade">
      <page-menu
        v-if="helloAnimationDone"
        :current-section="currentSection"
        @clicked="goTo"
    /></transition>
    <section-hello
      :is-mobile="isMobile"
      :is-loading="isLoading"
      @said-hello="saidHello"
      @arrow-clicked="goTo('about')"
    />
    <section-about :hello-animation-done="helloAnimationDone" />

    <section-projects @open="open" />
    <section-contact
      @modal-open="setScrolling(false)"
      @modal-close="setScrolling(true)"
    />
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollTo from "gsap/ScrollToPlugin";
import PagePreloader from "@/components/PagePreloader";
gsap.registerPlugin(ScrollTrigger, ScrollTo);

import PageMenu from "@/components/PageMenu";
import SectionHello from "@/components/SectionHello";
import SectionAbout from "@/components/SectionAbout";
import SectionProjects from "@/components/SectionProjects";
import SectionContact from "@/components/SectionContact";

let pageTl = gsap.timeline({ paused: true });

export default {
  name: "MainView",
  components: {
    PagePreloader,
    PageMenu,
    SectionHello,
    SectionAbout,
    SectionProjects,
    SectionContact,
  },
  data() {
    return {
      scrollPositionBeforeLeaving: 0,
      firstLoad: true,
      scrollAllowed: false,
      helloAnimationDone: false,

      isLoading: true,

      currentSection: "",
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

    document.addEventListener("scroll", this.getCurrentSection);
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
    getCurrentSection() {
      const about = document.getElementById("about").getBoundingClientRect();
      const projects = document
        .getElementById("projects")
        .getBoundingClientRect();
      const contact = document
        .getElementById("contact")
        .getBoundingClientRect();

      if (
        about.y <= about.height / 2 &&
        about.bottom >= about.height / 2 &&
        this.currentSection != "about"
      ) {
        this.currentSection = "about";
      }
      if (
        projects.y <= about.height / 2 &&
        projects.bottom >= about.height / 2 &&
        this.currentSection != "projects"
      ) {
        console.log("projects");
        this.currentSection = "projects";
      }
      if (
        contact.y <= contact.height / 2 &&
        contact.bottom >= contact.height / 2 &&
        this.currentSection != "contact"
      ) {
        console.log("contact");

        this.currentSection = "contact";
      }
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
</style>
