import Vue from "vue";
import { VueConstructor } from "vue/types/vue";

// Types
import { Snackbar } from "@typings/app";

// NOTE: Use Vue Observable to track snackbar state (without Vuex)
const snackbarStore = Vue.observable({
  text: "",
  visible: false,
}) as Snackbar;

const close = (): void => {
  snackbarStore.visible = false;
};

const showSnackbar = (text: string, options: Partial<Snackbar> = {}): void => {
  const closeDelay = snackbarStore.visible ? 200 : 0;

  snackbarStore.visible = false;

  // NOTE: Wait until previous snackbar has closed to avoid flickering/jumps
  setTimeout(() => {
    Object.keys(options).forEach((key) => {
      // @ts-ignore
      snackbarStore[key] = options[key];
    });

    snackbarStore.text = text;
    snackbarStore.visible = true;
  }, closeDelay);
};

const notify = (text: string, options: Partial<Snackbar> = {}): void => {
  showSnackbar(text, options);
};
const notifyError = (text: string, options: Partial<Snackbar> = {}): void => {
  showSnackbar(text, { ...options, type: "error" });
};
const notifyInfo = (text: string, options: Partial<Snackbar> = {}): void => {
  showSnackbar(text, { ...options, type: "info" });
};
const notifyWarning = (text: string, options: Partial<Snackbar> = {}): void => {
  showSnackbar(text, { ...options, type: "warning" });
};

const SnackbarPlugin = {
  /**
   * Plugin installation function
   * @param {Object} Vue     - Vue object
   * @param {Object} options - Plugin options
   */
  install: (Vue: VueConstructor) => {
    Vue.prototype.$notify = notify;
    Vue.prototype.$notifyClose = close;
    Vue.prototype.$notifyError = notifyError;
    Vue.prototype.$notifyInfo = notifyInfo;
    Vue.prototype.$notifyWarning = notifyWarning;
  },
};

export default SnackbarPlugin;
export { snackbarStore };
