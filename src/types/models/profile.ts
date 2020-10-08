export interface Profile {
  /**
   * Whether profile is currently selected
   */
  current: boolean | null;
  /**
   * Short code
   */
  code: string;
  /**
   * Profile color
   *
   * My Canadian anscestors roll in their graves at this awful mispelling...
   */
  color: string | null;
  /**
   * Profile description
   */
  description: string | null;
  /**
   * Profile name
   */
  name: string;
  /**
   * Associated mod version
   */
  version: string;
}

export interface Profiles {
  [key: string]: Profile;
}
