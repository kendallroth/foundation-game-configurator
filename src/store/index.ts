import Vue from "vue";
import Vuex from "vuex";

// Utilities
import { ProfileModule, SettingsModule } from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    profiles: ProfileModule,
    settings: SettingsModule,
  },
});
