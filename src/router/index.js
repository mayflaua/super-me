import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import ProjectPortfolio from "@/views/ProjectPortfolio.vue";
import ProjectPassGen from "@/views/ProjectPassGen.vue";
import ProjectKitten from "@/views/ProjectKitten.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: ProjectPortfolio,
  },
  {
    path: "/passgen",
    name: "passgen",
    component: ProjectPassGen,
  },
  {
    path: "/kitten",
    name: "kitten",
    component: ProjectKitten,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
