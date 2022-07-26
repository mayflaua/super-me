import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import ProjectPortfolio from "@/views/ProjectPortfolio.vue";
import ProjectPortfolio2 from "@/views/ProjectPortfolio2.vue";
import ProjectPassGen from "@/views/ProjectPassGen.vue";
import ProjectKitten from "@/views/ProjectKitten.vue";
import ProjectGrocery from "@/views/ProjectGrocery.vue";
import ProjectPortfolio3 from "@/views/ProjectPortfolio3.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    meta: { title: "Данил" },
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: ProjectPortfolio,
    meta: { title: "Портфолио" },
  },
  {
    path: "/passgen",
    name: "passgen",
    component: ProjectPassGen,
    meta: { title: "Генератор паролей" },
  },
  {
    path: "/kitten",
    name: "kitten",
    component: ProjectKitten,
    meta: { title: "Котенок и огурцы" },
  },
  {
    path: "/portfolio2",
    name: "portfolio2",
    component: ProjectPortfolio2,
    meta: { title: "Портфолио 2" },
  },
  {
    path: "/grocery",
    name: "grocery",
    component: ProjectGrocery,
    meta: { title: "Список покупок" },
  },
  {
    path: "/portfolio3",
    name: "portfolio3",
    component: ProjectPortfolio3,
    meta: { title: "Портфолио 3" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "pagenotfound",
    component: PageNotFound,
    meta: { title: "Страница не найдена" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
