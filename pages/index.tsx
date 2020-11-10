import React, { useState } from "react";
import { downloadPost } from "../components/utils/http";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
  Video,
} from "../utils/types";
import { DownloadIcon } from "../components/DownloadIcon";
import { DownloadsList } from "../components/DownloadsList";
import { Footer } from "../components/Footer";
import { NewDownload } from "../components/NewDownload";
import { Container, Jumbotron } from "react-bootstrap";
import Head from "next/head";

export function IndexPage() {
  const [downloads, setDownloads] = useState<Video[]>([]);

  function clearCompletedVideos() {
    setDownloads((videos) => videos.filter((v) => v.downloading));
  }

  async function download(
    apiUrl: string,
    body?:
      | DownloadSubtitlesOptions
      | DownloadAudioOptions
      | DownloadVideoOptions
  ) {
    const newVideo: Video = {
      id: +new Date(),
      url: apiUrl,
      downloading: true,
    };

    setDownloads((videos) => [...videos, newVideo]);

    await downloadPost(apiUrl, body);
    setDownloads((videos) =>
      videos.map((video) => {
        if (video !== newVideo) return video;
        return { ...newVideo, downloading: false };
      })
    );
  }

  function downloadAudio(url: string, format?: string) {
    const apiUrl = `/api/${encodeURIComponent(url)}/audio`;
    download(apiUrl, {
      format,
    });
  }

  function downloadVideo(url: string, format?: string) {
    const apiUrl = `/api/${encodeURIComponent(url)}/video`;
    download(apiUrl, {
      format,
    });
  }

  function downloadSubtitles(url: string, language?: string, format?: string) {
    const apiUrl = `/api/${encodeURIComponent(url)}/subtitles`;
    download(apiUrl, {
      format,
      language,
    });
  }

  return (
    <>
      <Head>
        <title>Youtube Download</title>
      </Head>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ minHeight: "100vh" }}
      >
        <div></div>
        <Container>
          <Jumbotron className="d-flex justify-content-center flex-column">
            <div className="mb-4">
              <DownloadIcon />
            </div>
            <NewDownload
              onDownloadAudio={(url, format) => downloadAudio(url, format)}
              onDownloadVideo={(url, format) => downloadVideo(url, format)}
              onDownloadSubtitles={(url, language, format) =>
                downloadSubtitles(url, language, format)
              }
            />
            <DownloadsList
              videos={downloads}
              onClear={() => clearCompletedVideos()}
            />
          </Jumbotron>
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default IndexPage;
