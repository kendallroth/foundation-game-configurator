import Vue from "vue";
import { Plugin as FragmentPlugin } from "vue-fragment";

// Components
import App from "./App.vue";

// Utilities
import "@utilities/classComponentHooks";
import "@utilities/registerServiceWorker";
import router from "./router";
import store from "./store";

// Plugins
import ComponentsPlugin from "./plugins/components";
import VuetifyPlugin from "./plugins/vuetify";
import SnackbarPlugin from "./plugins/snackbar";
import VeeValidatePlugin from "./plugins/veeValidate";

Vue.config.productionTip = false;

Vue.use(ComponentsPlugin);
Vue.use(FragmentPlugin);
Vue.use(SnackbarPlugin);
Vue.use(VeeValidatePlugin);

new Vue({
  router,
  store,
  vuetify: VuetifyPlugin,
  render: (h) => h(App),
}).$mount("#app");
