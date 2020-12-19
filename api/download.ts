import { NextApiRequest, NextApiResponse } from "next";
import youtubedl from "youtube-dl";
import downloader from "youtube-dl/lib/downloader";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
} from "../utils/types";
import { setAttachment, youtubeToStream } from "./convert";
import {
  cleanupSubsFolder,
  getSubsSaveDirectory,
  sendSubsStream,
} from "./subtitles";
import { ConversionType } from "./types";

export async function update() {
  console.log("Updating youtube-dl");

  return new Promise<void>((resolve, reject) => {
    downloader((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function updateAndDownload(
  req: NextApiRequest,
  res: NextApiResponse,
  exec: () => Promise<void>
) {
  exec().catch(() =>
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
  return youtubeToStream(url, res, {
    convertTo: options.format || "mp3",
    type: ConversionType.Audio,
  });
}

export async function downloadVideo(
  url: string,
  res: NextApiResponse<Blob>,
  options: DownloadVideoOptions
) {
  return youtubeToStream(url, res, {
    convertTo: options.format,
    type: ConversionType.Video,
  });
}

export async function downloadSubtitles(
  url: string,
  res: NextApiResponse<Blob>,
  options: DownloadSubtitlesOptions
) {
  const metadata = await getMetadata(url);
  const startAt = new Date(1605213600438);
  const downloadAuto = options.language?.toLowerCase() === "auto";
  const subsDir = await getSubsSaveDirectory(startAt);

  return await new Promise<void>((resolve, reject) => {
    youtubedl.getSubs(
      url,
      {
        lang: !downloadAuto && options.language,
        auto: downloadAuto,
        cwd: subsDir,
      },
      (err) => {
        if (err) reject(err);
        else {
          setAttachment(res, metadata, "zip");
          sendSubsStream(startAt, res)
            .then(() => cleanupSubsFolder(startAt))
            .then(() => {
              resolve();
            })
            .catch(reject);
        }
      }
    );
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
