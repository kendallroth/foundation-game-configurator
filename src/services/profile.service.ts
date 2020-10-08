import { promises as fs } from "fs";
import path from "path";
import { getModule } from "vuex-module-decorators";

// Types
import { Profile } from "@models";

// Utilities
import config from "@config";
import storage from "@storage";
import store from "@store/index";
import { ProfileModule } from "@store/modules";
import Background from "@utilities/background";

// Data
import defaultProfileJson from "@data/profiles/default.json";

const defaultProfileFile = "default.json";

/**
 * App profiles service
 */
export default abstract class ProfileService {
  static profileModule = getModule(ProfileModule, store);

  /**
   * Ensure a profile directory exists (with at least default config)
   * @param  profilePath - Profile path
   */
  private static async checkProfiles(profilePath: string): Promise<void> {
    let hasProfileDirectory = false;
    try {
      const profilePathStats = await fs.lstat(profilePath);
      hasProfileDirectory = profilePathStats.isDirectory();
    } catch (e) {
      // NOTE: Ignore errors (handled by default value)
    }

    // Create directory if it does not exist (ie. initially)
    if (!hasProfileDirectory) {
      // eslint-disable-next-line no-console
      console.log("Creating profile directory", profilePath);
      await fs.mkdir(profilePath);
    }

    // NOTE: Always overrwrite default profile? (only changes when app updates...)
    const defaultProfilePath = path.join(profilePath, defaultProfileFile);
    await fs.writeFile(
      defaultProfilePath,
      JSON.stringify(defaultProfileJson, null, 2)
    );
  }

  /**
   * Read profile files
   * @param  profilePath - Profile directory path
   * @return             - Parsed profiles
   */
  private static async readProfiles(profilePath: string): Promise<Profile[]> {
    const fileNames = await fs.readdir(profilePath);

    const profiles: Profile[] = [];
    for (const name of fileNames) {
      let json;
      try {
        const file = await fs.readFile(path.join(profilePath, name), "utf8");
        json = JSON.parse(file);
      } catch {
        // eslint-disable-next-line no-console
        console.error("Error parsing profile file", name);
        continue;
      }

      profiles.push(json);
    }

    return profiles;
  }

  /**
   * Load the mod profiles (from local profile directory)
   * @return Mod profiles
   */
  static async loadProfiles(): Promise<Profile[]> {
    const appPath = await Background.getPath("userData");
    const profilePath = path.join(appPath, config.profileDirectory);

    await this.checkProfiles(profilePath);

    // QUESTION: Do not associate "current profile" in case it is different in Redux???
    const profiles = await this.readProfiles(profilePath);
    this.profileModule.setProfiles(profiles);

    return profiles;
  }

  /**
   * Get the current profile
   * @param  updateCache - Whether local cache should be update
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
