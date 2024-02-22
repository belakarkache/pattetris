import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Content from "@/views/Content.vue";
import About from "@/views/About.vue";
import Credits from "@/views/Credits.vue";
import Lesson from "@/components/Lesson.vue";
import { useMainStore } from "@/store/main";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/content", name: "content", component: Content },
  { path: "/about", name: "about", component: About },
  { path: "/credits", name: "credits", component: Credits },
  { path: "/content/:id", name: "lesson", component: Lesson },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "lesson") {
    const unlockedContent = useMainStore().content;
    const lessonId = Number(to.params.id);
    if (
      lessonId &&
      lessonId > 0 &&
      lessonId < 11 &&
      lessonId <= unlockedContent
    ) {
      next();
    } else {
      next({ name: "content" });
    }
  } else {
    next();
  }
});

export default router;
