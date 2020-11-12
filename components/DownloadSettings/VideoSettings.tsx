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

  const formats = ["avi", "flv", "mkv", "mp4", "webm"];

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
