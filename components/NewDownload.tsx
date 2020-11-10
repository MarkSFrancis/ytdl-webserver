import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import validator from "validator";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
} from "../api/types";
import {
  DownloadOptions,
  DownloadSettings,
  DownloadType,
} from "./DownloadSettings";
import { useMounted } from "./utils/hooks";

export interface DownloadFormProps {
  onDownloadAudio: (url: string, format?: string) => void;
  onDownloadVideo: (url: string, format?: string) => void;
  onDownloadSubtitles: (
    url: string,
    language?: string,
    format?: string
  ) => void;
}

export function NewDownload(props: DownloadFormProps) {
  const isMounted = useMounted();
  const [url, setUrl] = useState("");
  const [type, setType] = useState<DownloadType>("Audio");
  const [settings, setSettings] = useState<DownloadOptions>();
  const [error, setError] = useState("");

  function showError(msg: string) {
    setError(msg);
    setTimeout(() => {
      // Check message hasn't changed
      if (isMounted() && error === msg) {
        setError("");
      }
    }, 2000);
  }

  function validate() {
    if (url.length === 0) {
      return false;
    }

    if (!validator.isURL(url)) {
      showError("Invalid URL");
      return false;
    } else return true;
  }

  function startDownload(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    switch (type) {
      case "Audio": {
        const audioSettings = settings as DownloadAudioOptions;
        props.onDownloadAudio(url, audioSettings.format);
        break;
      }
      case "Video": {
        const videoSettings = settings as DownloadVideoOptions;
        props.onDownloadVideo(url, videoSettings.format);
        break;
      }
      case "Subtitles": {
        const subSettings = settings as DownloadSubtitlesOptions;
        props.onDownloadSubtitles(
          url,
          subSettings.language,
          subSettings.format
        );
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
          <Form.Control
            autoFocus
            placeholder="https://www.youtube.com/watch?v=video_id"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <div className="my-4">
          <DownloadSettings
            settings={settings}
            onSettingsChanged={(s) => setSettings(s)}
            downloadType={type}
            onDownloadTypeChanged={(t) => setType(t)}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="primary"
            onClick={() => setType("Audio")}
          >
            Download
          </Button>
        </div>
      </div>
    </Form>
  );
}
