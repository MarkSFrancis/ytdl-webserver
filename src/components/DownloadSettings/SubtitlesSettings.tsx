import React from "react";
import { Form } from "react-bootstrap";
import { DownloadSubtitlesOptions } from "../../api/types";

export interface SubtitlesSettingsProps {
  settings: DownloadSubtitlesOptions;
  onSettingsChanged: (settings: DownloadSubtitlesOptions) => void;
}

export function SubtitlesSettings(props: SubtitlesSettingsProps) {
  function update<T extends keyof DownloadSubtitlesOptions>(
    setting: T,
    value: DownloadSubtitlesOptions[T]
  ) {
    props.onSettingsChanged({
      ...props.settings,
      [setting]: value,
    });
  }

  return (
    <>
      <Form.Group>
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          value={props.settings.language}
          onChange={(e) => update("language", e.target.value)}
          placeholder="All languages"
        ></Form.Control>
      </Form.Group>
    </>
  );
}
