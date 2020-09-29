import { VueConstructor } from "vue/types/vue";

// Components
import { ActionBar } from "@components/layout";

const ComponentsPlugin = {
  install: (Vue: VueConstructor) => {
    Vue.component(ActionBar.name, ActionBar);
  },
};

export default ComponentsPlugin;
