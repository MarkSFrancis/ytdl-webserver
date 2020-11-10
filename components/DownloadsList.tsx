import React from "react";
import { Video } from "../utils/types";

export interface DownloadListProps {
  videos: Video[];
  onClear: () => void;
}

export function DownloadsList(props: DownloadListProps) {
  return (
    <ul className="downloadList">
      {props.videos.map((video) => (
        <li key="video.id" className="downloadList__item">
          <span className="video__name">{video.url}</span>

          {video.downloading ? (
            <div className="spinner">
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
          ) : (
            <span className="video__link">✔</span>
          )}
        </li>
      ))}
      {!!props.videos.length && (
        <li className="downloadList__clear" onClick={() => props.onClear()}>
          Clear completed
        </li>
      )}
    </ul>
  );
}
