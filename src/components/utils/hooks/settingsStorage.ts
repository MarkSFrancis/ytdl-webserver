import { useEffect, useState } from "react";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
} from "../../../utils/types";

export enum DownloadType {
  Video = "Video",
  Audio = "Audio",
  Subs = "Subtitles",
}

export interface SettingsStore {
  settings: SavedSettings;
}

export interface SavedSettings {
  audio?: DownloadAudioOptions;
  video?: DownloadVideoOptions;
  subs?: DownloadSubtitlesOptions;
  mode?: DownloadType;
}

export function useSettingsStore(): [
  SettingsStore,
  (settings: Partial<SavedSettings>) => void
] {
  const [settings, setSettings] = useState<{ settings: SavedSettings }>();

  const storageKey = "downloadSettings";
  function loadSettings(): SavedSettings | undefined {
    const textSettings = localStorage.getItem(storageKey);
    if (textSettings) {
      return JSON.parse(textSettings) as SavedSettings;
    }
  }

  function saveSettings(settings: SavedSettings) {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }

  useEffect(() => setSettings({ settings: loadSettings() || {} }), []);

  function updateSettings(patch: Partial<SavedSettings>) {
    setSettings((settings) => {
      const newSettings = {
        ...(settings?.settings || {}),
        ...patch,
      };

      saveSettings(newSettings);
      return {
        settings: newSettings,
      };
    });
  }

  return [settings, updateSettings];
}
