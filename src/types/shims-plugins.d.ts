import Vue from "vue";

// Types
import { Snackbar } from "@typings/app";

// Augment Vue instance with plugins
declare module "vue/types/vue" {
  interface Vue {
    // Snackbar plugin
    /**
     * Normal notification
     * @param text    - Snackbar text
     * @param options - Snackbar options
     */
    $notify: (text: string, options?: Partial<Snackbar>) => void;
    /**
     * Close the notification
     */
    $notifyClose: () => void;
    /**
     * Error notification
     * @param text    - Snackbar text
     * @param options - Snackbar options
     */
    $notifyError: (text: string, options?: Partial<Snackbar>) => void;
    /**
     * Informative notification
     * @param text    - Snackbar text
     * @param options - Snackbar options
     */
    $notifyInfo: (text: string, options?: Partial<Snackbar>) => void;
    /**
     * Warning notification
     * @param text    - Snackbar text
     * @param options - Snackbar options
     */
    $notifyWarning: (text: string, options?: Partial<Snackbar>) => void;
  }
}
