import { ipcRenderer } from "electron";

// Types
import { AppPath } from "@typings";

/**
 * Main process utilities
 */
class Background {
  /**
   * Get the app data file path
   * @return App data file path
   */
  static async getPath(path: AppPath = "userData"): Promise<string> {
    return ipcRenderer.invoke("get-file-path", path);
  }

  /**
   * Open a file dialog
   * @return Selected file path
   */
  static async openFolderDialog(): Promise<string> {
    return ipcRenderer.invoke("open-folder-dialog");
  }
}

export default Background;
