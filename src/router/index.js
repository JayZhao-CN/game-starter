import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("../components/MainPage.vue"),
  }
];

const router = new VueRouter({
  routes
});

export default router;
