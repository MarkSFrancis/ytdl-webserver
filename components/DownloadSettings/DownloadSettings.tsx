import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
} from "../../api/types";
import { AudioSettings } from "./AudioSettings";
import { SubtitlesSettings } from "./SubtitlesSettings";
import { VideoSettings } from "./VideoSettings";

export type DownloadType = "Video" | "Audio" | "Subtitles";
export type DownloadOptions =
  | DownloadAudioOptions
  | DownloadVideoOptions
  | DownloadSubtitlesOptions;

export interface DownloadSettingsProps {
  settings: DownloadOptions;
  onSettingsChanged: (settings: DownloadOptions) => void;
  downloadType: DownloadType;
  onDownloadTypeChanged: (type: DownloadType) => void;
}

export function DownloadSettings(props: DownloadSettingsProps) {
  const [audioFormat, setAudioFormat] = useState<string>();
  const [videoFormat, setVideoFormat] = useState<string>();
  const [subsFormat, setSubsFormat] = useState<string>();
  const [subsLanguage, setSubsLanguage] = useState<string>();

  function onSettingChanged(key: string, newSettings: DownloadOptions) {
    if (key === props.downloadType) {
      props.onSettingsChanged(newSettings);
    }
  }

  return (
    <Tabs defaultActiveKey="audio">
      <Tab eventKey="audio" title="Audio" style={{ background: "white" }}>
        <div className="p-4">
          <AudioSettings
            format={audioFormat}
            onFormatChanged={(f) => setAudioFormat(f)}
          />
        </div>
      </Tab>
      <Tab eventKey="video" title="Video" style={{ background: "white" }}>
        <div className="p-4">
          <VideoSettings
            format={videoFormat}
            onFormatChanged={(f) => setVideoFormat(f)}
          />
        </div>
      </Tab>
      <Tab
        eventKey="subtitles"
        title="Subtitles"
        style={{ background: "white" }}
      >
        <div className="p-4">
          <SubtitlesSettings
            format={subsFormat}
            onFormatChanged={(f) => setSubsFormat(f)}
            language={subsLanguage}
            onLanguageChanged={(l) => setSubsLanguage(l)}
          />
        </div>
      </Tab>
    </Tabs>
  );
}
