import React from "react";
import { Form } from "react-bootstrap";

export interface AudioSettingsProps {
  format: string;
  onFormatChanged: (format: string) => void;
}

export function AudioSettings(props: AudioSettingsProps) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Format</Form.Label>
        <Form.Control
          type="text"
          value={props.format}
          onChange={(e) => props.onFormatChanged(e.target.value)}
          placeholder="mp3"
        ></Form.Control>
      </Form.Group>
    </Form>
  );
}
