import { useCallback, useState } from "react";
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

export interface SavedSettings {
  audio: DownloadAudioOptions;
  video: DownloadVideoOptions;
  subs: DownloadSubtitlesOptions;
  mode: DownloadType;
}

export function useSettingsStore(
  defaultSettings?: SavedSettings
): [SavedSettings, (settings: Partial<SavedSettings>) => void] {
  const storageKey = "downloadSettings";

  const loadSettings = useCallback(() => {
    let stored: Partial<SavedSettings> = {};
    const textSettings = localStorage.getItem(storageKey);
    if (textSettings) {
      stored = JSON.parse(textSettings) as SavedSettings;
    }

    return {
      ...defaultSettings,
      ...(stored ?? {}),
    };
  }, [defaultSettings, storageKey]);

  const saveSettings = useCallback(
    (settings: SavedSettings) => {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    },
    [storageKey]
  );

  const [settings, setSettings] = useState<SavedSettings>(() => loadSettings());

  const updateSettings = useCallback((patch: Partial<SavedSettings>) => {
    setSettings((settings) => {
      const newSettings = {
        ...settings,
        ...patch,
      };

      saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  return [settings, updateSettings];
}
