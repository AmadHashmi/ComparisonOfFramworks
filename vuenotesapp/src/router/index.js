import { createRouter, createWebHistory } from "vue-router";

import NotesList from "../views/NotesList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/notes",
      name: "notes",
      component: () => import("../views/NotesList.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreateNote.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("../views/CreateNote.vue"),
    },
    {
      path: "/note/:id",
      name: "note",
      component: () => import("../views/CreateNote.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/notes",
    },
  ],
});

export default router;
