import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// Views
import Balancing from "@views/Balancing";
import Dashboard from "@views/Dashboard";
import Settings from "@views/Settings";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/balancing",
    name: "Balancing",
    component: Balancing,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
