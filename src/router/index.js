import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CartView from "../views/CartView.vue";
import Login from "../views/LoginView.vue";
import StockManagerView from "../views/StockManagerView.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/paniers",
    name: "paniers",
    component: CartView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/storemanager",
    name: "store",
    component: StockManagerView,
    meta: {
      requiresAuth: true,
    },
  },
];

let router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.token == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
