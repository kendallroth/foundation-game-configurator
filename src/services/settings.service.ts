import { getModule } from "vuex-module-decorators";

// Utilities
import storage from "@storage";
import store from "@store/index";
import { SettingsModule } from "@store/modules";

/**
 * App settings service
 */
export default abstract class SettingsService {
  static settingsModule = getModule(SettingsModule, store);

  /**
   * Load the mod path
   * @return Mod path
   */
  static loadModPath(): string | null {
    const modPath = storage.get("modPath");
    this.settingsModule.setModPath(modPath);
    return modPath;
  }

  /**
   * Set the mod path
   * @param modPath - Mod path
   */
  static setModPath(modPath: string | null): void {
    // TODO: Validate mod path?

    storage.set("modPath", modPath);
    this.settingsModule.setModPath(modPath);
  }
}
