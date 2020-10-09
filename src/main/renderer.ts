/**
 * Communication with renderer processes
 */

import { app, BrowserWindow, dialog, ipcMain } from "electron";

// Types
import { Profile } from "@models";
import { AppPath } from "@typings";

// Utilities
import Files from "./files";

// Open a directory picker
ipcMain.handle("open-folder-dialog", async (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) return null;

  const result = await dialog.showOpenDialog(window, {
    properties: ["openDirectory"],
  });

  const { filePaths } = result;

  if (!filePaths || !filePaths.length) return null;

  // Only a single directory should be selected
  return filePaths[0];
});

// Load the app profiles
ipcMain.handle(
  "load-profiles",
  async (): Promise<Profile[]> => {
    return Files.loadProfiles();
  }
);

// Save an app profile
ipcMain.handle(
  "save-profile",
  async (): Promise<void> => {
    // TODO: Save a profile
  }
);

// Get the app data file path
ipcMain.handle("get-file-path", (e, pathType: AppPath = "userData"): string => {
  return app.getPath(pathType);
});
