import React, { FormEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import validator from "validator";
import { DownloadAudioOptions, DownloadSubtitlesOptions, DownloadVideoOptions } from '../api/types';
import { DownloadSettings } from "./DownloadSettings";
import { DownloadType, useSettingsStore } from "./utils/hooks/settingsStorage";

export interface NewDownloadProps {
  onDownloadAudio: (url: string, options?: DownloadAudioOptions) => void;
  onDownloadVideo: (url: string, options?: DownloadVideoOptions) => void;
  onDownloadSubtitles: (url: string, options?: DownloadSubtitlesOptions) => void;
}

export function NewDownload(props: NewDownloadProps) {
  const [url, setUrl] = useState("");
  const [settings, setSettings] = useSettingsStore();
  const [isValid, setIsValid] = useState(false);

  function validate() {
    if (url.length === 0) {
      return false;
    }

    return validator.isURL(url);
  }

  useEffect(() => {
    setIsValid(validate());
  }, [url]);

  function startDownload(e: FormEvent) {
    e.preventDefault();

    switch (settings.settings.mode) {
      case DownloadType.Audio: {
        const audioSettings = settings.settings.audio;
        props.onDownloadAudio(url, audioSettings);
        break;
      }
      case DownloadType.Video: {
        const videoSettings = settings.settings.video;
        props.onDownloadVideo(url, videoSettings);
        break;
      }
      case DownloadType.Subs: {
        const subSettings = settings.settings.subs;
        props.onDownloadSubtitles(url, subSettings);
        break;
      }
    }
  }

  return (
    <Form
      className="d-flex justify-content-center"
      onSubmit={(e) => startDownload(e)}
    >
      <div style={{ flexBasis: "500px" }}>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            autoFocus
            placeholder="https://www.youtube.com/watch?v=video_id"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Settings</Form.Label>
          {settings && (
            <DownloadSettings
              settings={settings.settings}
              onSettingsChanged={(s) => setSettings(s)}
              isValid={isValid}
            />
          )}
        </Form.Group>
      </div>
    </Form>
  );
}
