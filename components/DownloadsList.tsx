import React from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { Video } from "../utils/types";

export interface DownloadListProps {
  videos: Video[];
}

export function DownloadsList(props: DownloadListProps) {
  return (
    <ListGroup>
      {props.videos.map((video) => (
        <ListGroup.Item key={video.id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>{video.url}</div>

            {video.error ? (
              <div className="text-danger">{video.error}</div>
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Downloading...</span>
              </Spinner>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
