import { Module, Mutation, VuexModule } from "vuex-module-decorators";

// Types
import { Profile, Profiles } from "@models";

@Module({ name: "profiles", namespaced: true })
export default class ProfileModule extends VuexModule {
  currentProfileKey = "default";
  profileList: Profile[] = [];

  get currentProfile(): Profile {
    // TODO: Handle missing profile???
    return this.profiles[this.currentProfileKey];
  }

  get defaultProfile(): Profile {
    return this.profiles.default;
  }

  // Transform profile list to object and indicate current profile
  get profiles(): Profiles {
    return this.profileList.reduce((accum, profile) => {
      const isCurrent = profile.code === this.currentProfileKey;

      return {
        ...accum,
        [profile.code]: { ...profile, current: isCurrent },
      };
    }, {});
  }

  get profileName(): string {
    return this.currentProfile ? this.currentProfile.name : "N/A";
  }

  @Mutation
  setProfiles(profiles: Profile[]) {
    this.profileList = profiles;
  }

  @Mutation
  setCurrentProfile(name: string): void {
    // Only allow selecting valid profiles
    if (!this.profileList.some((p) => p.code === name)) return;

    this.currentProfileKey = name;
  }
}
