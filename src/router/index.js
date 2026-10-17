import { createRouter, createWebHashHistory } from "vue-router";
import GameView from "@/views/GameView.vue";
import { useProgressStore } from "@/stores/progress";
import { PATTERNS, findPattern } from "@/data/patterns";

const APP_TITLE = "Pattetris";
const HOME_TITLE = `${APP_TITLE}: aprenda design patterns jogando`;

const routes = [
  { path: "/", name: "game", component: GameView },
  {
    path: "/colecao",
    name: "collection",
    component: () => import("@/views/CollectionView.vue"),
    meta: { title: "Coleção" },
  },
  {
    path: "/colecao/:slug",
    name: "lesson",
    component: () => import("@/views/LessonView.vue"),
    props: true,
  },
  { path: "/content", redirect: { name: "collection" } },
  {
    path: "/content/:id",
    redirect: (to) => {
      const pattern = PATTERNS[Number(to.params.id) - 1];
      return pattern ? { name: "lesson", params: { slug: pattern.slug } } : { name: "collection" };
    },
  },
  { path: "/:pathMatch(.*)*", redirect: { name: "game" } },
];

const titleFor = (route) => {
  const page = route.name === "lesson" ? findPattern(route.params.slug)?.title : route.meta.title;
  return page ? `${page}: ${APP_TITLE}` : HOME_TITLE;
};

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: (to, from, saved) => saved ?? { top: 0 },
});

router.beforeEach((to) => {
  if (to.name === "lesson" && !useProgressStore().isUnlocked(to.params.slug)) {
    return { name: "collection" };
  }
});

router.afterEach((to) => {
  document.title = titleFor(to);
});

export default router;
