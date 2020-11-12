import React from "react";
import { Form } from "react-bootstrap";
import { DownloadAudioOptions } from "../../api/types";

export interface AudioSettingsProps {
  settings: DownloadAudioOptions;
  onSettingsChanged: (settings: DownloadAudioOptions) => void;
}

export function AudioSettings(props: AudioSettingsProps) {
  function update<T extends keyof DownloadAudioOptions>(
    setting: T,
    value: DownloadAudioOptions[T]
  ) {
    props.onSettingsChanged({
      ...props.settings,
      [setting]: value,
    });
  }

  const formats = [
    "aac",
    "flac",
    "flv",
    "m4a",
    "mp3",
    "ogg",
    "opus",
    "wav",
    "webm",
  ];

  return (
    <Form.Group>
      <Form.Label>Format</Form.Label>
      <Form.Control
        as="select"
        custom
        onChange={(e) => update("format", e.target.value)}
        value={props.settings.format}
      >
        {formats.map((f) => (
          <option key={f} selected={props.settings.format === f}>
            {f}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
