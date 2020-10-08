import { VueConstructor } from "vue/types/vue";

// Components
import * as FormComponents from "@components/form";
import { ConfirmDialog, FormLeaveDialog } from "@components/dialogs";
import {
  ActionBar,
  BackButton,
  PageLayout,
  TitleBar,
} from "@components/layout";

const ComponentsPlugin = {
  install: (Vue: VueConstructor) => {
    // Dialogs
    Vue.component(ConfirmDialog.name, ConfirmDialog);
    Vue.component(FormLeaveDialog.name, FormLeaveDialog);

    // Form components
    Object.keys(FormComponents).forEach((key) => {
      // @ts-ignore
      const component = FormComponents[key];
      Vue.component(component.name, component);
    });

    // Layout components
    Vue.component(ActionBar.name, ActionBar);
    Vue.component(BackButton.name, BackButton);
    Vue.component(PageLayout.name, PageLayout);
    Vue.component(TitleBar.name, TitleBar);
  },
};

export default ComponentsPlugin;
