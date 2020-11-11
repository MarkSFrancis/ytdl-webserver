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

  return (
    <Form.Group>
      <Form.Label>Format</Form.Label>
      <Form.Control
        type="text"
        value={props.settings.format}
        onChange={(e) => update("format", e.target.value)}
        placeholder="mp3"
      ></Form.Control>
    </Form.Group>
  );
}
