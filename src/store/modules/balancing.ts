import { Module, Mutation, VuexModule } from "vuex-module-decorators";

// Types
import { StorageFields } from "@models";

@Module({ name: "balancing", namespaced: true })
export default class BalancingModule extends VuexModule {
  granaryCapacity = 200;
  warehouseCapacity = 200;

  @Mutation
  setStorageCapacities(fields: StorageFields): void {
    this.granaryCapacity = fields.granaryCapacity;
    this.warehouseCapacity = fields.warehouseCapacity;
  }
}
