import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// Views
import { BalancingView } from "@views/Balancing";
import { DashboardView } from "@views/Dashboard";
import { ProfileFormView, ProfilesView } from "@views/Profiles";
import { SettingsView } from "@views/Settings";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/balancing",
    name: "balancing",
    component: BalancingView,
  },
  {
    path: "/profiles",
    name: "profiles",
    component: ProfilesView,
  },
  {
    path: "/profiles/new",
    name: "profileAdd",
    component: ProfileFormView,
    props: {
      adding: true,
    },
  },
  {
    path: "/profiles/:code",
    name: "profileDetails",
    component: ProfileFormView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
