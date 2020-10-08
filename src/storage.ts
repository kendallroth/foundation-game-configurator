import Store from "electron-store";

// Must set as constant so TypeScript does not warn about schema typings!
// Taken from: https://github.com/sindresorhus/electron-store/issues/120#issuecomment-643614701
// NOTE: Had to disable schema as it was throwing type errors with no data...!
/*const schema = {
  modPath: {
    type: "string",
    default: "",
  },
} as const;*/

const store = new Store({
  defaults: {
    currentProfile: "default",
    modPath: "",
  },
  name: "settings",
});

export default store;
