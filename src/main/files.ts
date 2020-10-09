import { app } from "electron";
import { promises as fs } from "fs";
import path from "path";

// Types
import { Profile } from "@models";

// Utilities
// import config from "@config";
import config from "../config";

// Data
// import defaultProfileJson from "@data/profiles/default.json";
import defaultProfileJson from "../data/profiles/default.json";

const defaultProfileFile = "default.json";

class Files {
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
    const appPath = app.getPath("userData");
    const profilePath = path.join(appPath, config.profileDirectory);

    await this.checkProfiles(profilePath);

    // QUESTION: Do not associate "current profile" in case it is different in Redux???
    return this.readProfiles(profilePath);
  }
}

export default Files;
