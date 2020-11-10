import React from "react";
import { Form } from 'react-bootstrap';

export interface VideoSettingsProps {
  format: string;
  onFormatChanged: (format: string) => void;
}

export function VideoSettings(props: VideoSettingsProps) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Format</Form.Label>
        <Form.Control
          type="text"
          value={props.format}
          onChange={(e) => props.onFormatChanged(e.target.value)}
          placeholder="mp4"
        ></Form.Control>
      </Form.Group>
    </Form>
  );
}
