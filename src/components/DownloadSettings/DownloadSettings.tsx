import React from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { DownloadType, SavedSettings } from "../utils/hooks/settingsStorage";
import { AudioSettings } from "./AudioSettings";
import { SubtitlesSettings } from "./SubtitlesSettings";
import { VideoSettings } from "./VideoSettings";

export interface DownloadSettingsProps {
  settings: SavedSettings;
  onSettingsChanged: (settings: SavedSettings) => void;
  isValid: boolean;
}

export function DownloadSettings(props: DownloadSettingsProps) {
  function update<T extends keyof SavedSettings>(
    key: T,
    newSettings: SavedSettings[T]
  ) {
    props.onSettingsChanged({
      ...props.settings,
      [key]: newSettings,
    });
  }

  return (
    <Tabs
      defaultActiveKey={props.settings.mode ?? DownloadType.Audio}
      onSelect={(t: DownloadType) => update("mode", t)}
    >
      <Tab
        eventKey={DownloadType.Audio}
        title="Audio"
        style={{ background: "white" }}
      >
        <TabContents {...props}>
          <AudioSettings
            settings={props.settings.audio || {}}
            onSettingsChanged={(s) => update("audio", s)}
          />
        </TabContents>
      </Tab>
      <Tab
        eventKey={DownloadType.Video}
        title="Video"
        style={{ background: "white" }}
      >
        <TabContents {...props}>
          <VideoSettings
            settings={props.settings.video || {}}
            onSettingsChanged={(s) => update("video", s)}
          />
        </TabContents>
      </Tab>
      <Tab
        eventKey={DownloadType.Subs}
        title="Subtitles"
        style={{ background: "white" }}
      >
        <TabContents {...props}>
          <SubtitlesSettings
            settings={props.settings.subs || {}}
            onSettingsChanged={(s) => update("subs", s)}
          />
        </TabContents>
      </Tab>
    </Tabs>
  );
}

function TabContents(props: {
  children: React.ReactElement;
  isValid: boolean;
}) {
  return (
    <div className="p-4">
      {props.children}
      <Button type="submit" variant="primary" disabled={!props.isValid}>
        Download
      </Button>
    </div>
  );
}
