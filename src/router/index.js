import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import ProjectPortfolio from "@/views/ProjectPortfolio.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
