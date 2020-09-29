import Vue from "vue";

// Components
import App from "./App.vue";

// Utilities
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VuetifyPlugin from "./plugins/vuetify";
import ComponentsPlugin from "./plugins/components";

Vue.config.productionTip = false;

Vue.use(ComponentsPlugin);

new Vue({
  router,
  store,
  vuetify: VuetifyPlugin,
  render: (h) => h(App),
}).$mount("#app");
