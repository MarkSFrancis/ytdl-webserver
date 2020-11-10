import React from "react";
import { Form } from "react-bootstrap";

export interface SubtitlesSettingsProps {
  language: string;
  onLanguageChanged: (language: string) => void;
  format: string;
  onFormatChanged: (format: string) => void;
}

export function SubtitlesSettings(props: SubtitlesSettingsProps) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          value={props.language}
          onChange={(e) => props.onLanguageChanged(e.target.value)}
          placeholder="en"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Format</Form.Label>
        <Form.Control
          type="text"
          value={props.format}
          onChange={(e) => props.onFormatChanged(e.target.value)}
          placeholder="srt"
        ></Form.Control>
      </Form.Group>
    </Form>
  );
}
