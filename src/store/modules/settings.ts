import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ name: "settings", namespaced: true })
export default class SettingsModule extends VuexModule {
  modPath: string | null = null;

  get hasModPath(): boolean {
    return Boolean(this.modPath);
  }

  @Mutation
  setModPath(path: string | null): void {
    this.modPath = path;
  }
}
