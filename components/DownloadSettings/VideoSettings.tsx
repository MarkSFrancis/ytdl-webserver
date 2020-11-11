import React from "react";
import { Form } from "react-bootstrap";
import { DownloadVideoOptions } from "../../utils/types";

export interface VideoSettingsProps {
  settings: DownloadVideoOptions;
  onSettingsChanged: (settings: DownloadVideoOptions) => void;
}

export function VideoSettings(props: VideoSettingsProps) {
  function update<T extends keyof DownloadVideoOptions>(
    setting: T,
    value: DownloadVideoOptions[T]
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
        placeholder="mp4"
      ></Form.Control>
    </Form.Group>
  );
}
