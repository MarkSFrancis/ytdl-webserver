import { NextApiRequest, NextApiResponse } from "next";
import youtubedl from "youtube-dl";
import downloader from "youtube-dl/lib/downloader";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
} from "../utils/types";
import { clearDownloads } from "./storage/files";
import { youtubeToStream } from "./streams";
import { ConversionType } from "./types";

export async function update() {
  console.info("Updating youtube-dl");

  return new Promise<void>((resolve, reject) => {
    downloader((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * Performs various cleanup and update actions before and after executing a download, as well as automatic retries when downloads fail
 * @param req The HTTP request for the download
 * @param res The HTTP response for the download
 * @param exec The action to download the data
 */
export async function executeDownload(
  req: NextApiRequest,
  res: NextApiResponse,
  exec: () => Promise<void>
) {
  // Delete downloads more than 1 week old
  await clearDownloads(1000 * 60 * 60 * 24 * 7).catch((e) =>
    console.error("Error cleaning up old downloads", e)
  );

  await exec().catch(() =>
    update()
      .then(() => exec())
      .catch((e: Error) => {
        console.error("Error downloading", req.query, e);
        res.statusCode = 500;
        res.end(`An error occurred (${e.message})`);
        res.destroy(e);
      })
  );
}

export function downloadAudio(
  url: string,
  res: NextApiResponse<Blob>,
  options: DownloadAudioOptions
) {
  return youtubeToStream(new Date(), url, res, {
    convertTo: options.format || "mp3",
    type: ConversionType.Audio,
  });
}

export async function downloadVideo(
  url: string,
  res: NextApiResponse<Blob>,
  options: DownloadVideoOptions
) {
  return youtubeToStream(new Date(), url, res, {
    convertTo: options.format,
    type: ConversionType.Video,
  });
}

export async function downloadSubtitles(
  url: string,
  res: NextApiResponse<Blob>,
  options: DownloadSubtitlesOptions
) {
  const downloadAuto = options.language?.toLowerCase() === "auto";
  return youtubeToStream(new Date(), url, res, {
    includeAuto: downloadAuto,
    language: downloadAuto
      ? []
      : options.language
      ? [options.language]
      : undefined,
    type: ConversionType.Subs,
  });
}

export async function getMetadata(url: string) {
  return new Promise<youtubedl.Info>((resolve, reject) => {
    youtubedl.getInfo(url, (err, output) => {
      if (err) reject(err);
      else resolve(output);
    });
  });
}
