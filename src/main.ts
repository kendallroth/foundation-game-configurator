import Vue from "vue";

// Components
import App from "./App.vue";

// Utilities
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Plugins
import ComponentsPlugin from "./plugins/components";
import VuetifyPlugin from "./plugins/vuetify";
import VeeValidatePlugin from "./plugins/veeValidate";

Vue.config.productionTip = false;

Vue.use(ComponentsPlugin);
Vue.use(VeeValidatePlugin);

new Vue({
  router,
  store,
  vuetify: VuetifyPlugin,
  render: (h) => h(App),
}).$mount("#app");
