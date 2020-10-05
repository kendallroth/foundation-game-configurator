import { getModule } from "vuex-module-decorators";

// Utilities
import store from "@store/index";
import { BalancingModule } from "@store/modules";

// Types
import { StorageFields } from "@models";

/**
 * Mod balancing service
 */
export default abstract class BalancingService {
  static balancingModule = getModule(BalancingModule, store);

  /**
   * Load the storage settings
   * @return Storage settings
   */
  static loadStorage(): StorageFields {
    // TODO: Load from profile file

    const fields: StorageFields = {
      granaryCapacity: 0,
      warehouseCapacity: 0,
    };

    this.balancingModule.setStorageCapacities(fields);

    return fields;
  }

  /**
   * Set the balancing values
   * @param modPath - Mod path
   */
  static setStorage(fields: StorageFields): void {
    this.balancingModule.setStorageCapacities(fields);
  }
}
