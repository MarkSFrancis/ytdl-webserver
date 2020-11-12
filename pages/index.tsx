import { AxiosError } from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { DownloadIcon } from "../components/DownloadIcon";
import { DownloadsList } from "../components/DownloadsList";
import { Footer } from "../components/Footer";
import { NewDownload } from "../components/NewDownload";
import { downloadPost } from "../components/utils/http";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
  Video,
} from "../utils/types";

export function IndexPage() {
  const [downloads, setDownloads] = useState<Video[]>([]);

  async function download(
    url: string,
    type: string,
    body?:
      | DownloadSubtitlesOptions
      | DownloadAudioOptions
      | DownloadVideoOptions
  ) {
    const newVideo: Video = {
      id: +new Date(),
      url: url,
    };

    setDownloads((videos) => [...videos, newVideo]);

    downloadPost(`/api/${encodeURIComponent(url)}/download/${type}`, body)
      .then(() => {
        setDownloads((videos) => videos.filter((video) => video !== newVideo));
      })
      .catch((e: AxiosError) => {
        setDownloads((videos) =>
          videos.map((v) => {
            if (v !== newVideo) return v;
            return {
              ...v,
              error: e.message,
            };
          })
        );
      });
  }

  function downloadAudio(url: string, options?: DownloadAudioOptions) {
    download(url, "audio", options);
  }

  function downloadVideo(url: string, options?: DownloadVideoOptions) {
    download(url, "video", options);
  }

  function downloadSubtitles(url: string, options?: DownloadSubtitlesOptions) {
    download(url, "subtitles", options);
  }

  const footerHeight = "56px";
  return (
    <>
      <Head>
        <title>Youtube Download</title>
      </Head>
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <Jumbotron
            className="d-flex justify-content-center"
            style={{
              minHeight: `calc(100vh - ${footerHeight})`,
              marginBottom: footerHeight,
            }}
          >
            <div className="d-flex flex-column" style={{ flexBasis: "500px" }}>
              <div>
                <DownloadIcon />
              </div>
              <div className="mt-4">
                <NewDownload
                  onDownloadAudio={(url, options) => downloadAudio(url, options)}
                  onDownloadVideo={(url, options) => downloadVideo(url, options)}
                  onDownloadSubtitles={(url, options) =>
                    downloadSubtitles(url, options)
                  }
                />
              </div>
              <div>
                <hr />
                <DownloadsList videos={downloads} />
              </div>
            </div>
          </Jumbotron>
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default IndexPage;
