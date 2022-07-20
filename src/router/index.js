import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import ProjectPortfolio from "@/views/ProjectPortfolio.vue";
import ProjectPortfolio2 from "@/views/ProjectPortfolio2.vue";
import ProjectPassGen from "@/views/ProjectPassGen.vue";
import ProjectKitten from "@/views/ProjectKitten.vue";
import ProjectGrocery from "@/views/ProjectGrocery.vue";

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
  {
    path: "/portfolio2",
    name: "portfolio2",
    component: ProjectPortfolio2,
  },
  {
    path: "/grocery",
    name: "grocery",
    component: ProjectGrocery,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
