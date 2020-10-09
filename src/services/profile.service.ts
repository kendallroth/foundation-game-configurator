import { getModule } from "vuex-module-decorators";

// Types
import { Profile } from "@models";

// Utilities
import storage from "@storage";
import store from "@store/index";
import { ProfileModule } from "@store/modules";
import Main from "@utilities/main";

/**
 * App profiles service
 */
export default abstract class ProfileService {
  static profileModule = getModule(ProfileModule, store);

  /**
   * Load the mod profiles (from local profile directory)
   * @return Mod profiles
   */
  static async loadProfiles(): Promise<Profile[]> {
    const profiles = await Main.getProfiles();

    this.profileModule.setProfiles(profiles);

    return profiles;
  }

  /**
   * Get the current profile
   * @param  updateCache - Whether local cache should be updated
   * @return Current profile code
   */
  static getCurrentProfile(updateCache: boolean = false): string {
    const currentProfile = storage.get("currentProfile", "default");

    // Local cache may not always need to be updated when getting stored current profile!
    // This is likely only necessary when initially loading app!
    if (updateCache) {
      this.profileModule.setCurrentProfile(currentProfile);
    }

    return currentProfile;
  }

  /**
   * Set the current profile
   * @param profile - Profile code
   */
  static setCurrentProfile(profile: string): void {
    // TODO: See if there is any necessary cleanup before switching profiles???

    storage.set("currentProfile", profile);
    this.profileModule.setCurrentProfile(profile);
  }
}
