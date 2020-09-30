import Vue from "vue";
import Vuex from "vuex";

// Utilities
import { SettingsModule } from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings: SettingsModule,
  },
});
