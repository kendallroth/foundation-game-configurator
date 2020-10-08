// Utilities
import { version } from "../package.json";

type ConfigType = {
  /**
   * Mod profile directory name
   */
  profileDirectory: string;
  /**
   * App version
   */
  version: string;
};

const config: ConfigType = {
  profileDirectory: "profiles",
  version,
};

export default config;
