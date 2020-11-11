import { NextApiResponse } from "next";
import youtubedl from "youtube-dl";
import downloader from "youtube-dl/lib/downloader";
import {
  DownloadAudioOptions,
  DownloadSubtitlesOptions,
  DownloadVideoOptions,
} from "../utils/types";
import { youtubeToStream } from "./convert";
import { setAttachment } from "./convert/filename";
import { ConversionType } from "./types";

export async function update() {
  return new Promise((resolve, reject) => {
    downloader((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
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
  return await new Promise((resolve, reject) => {
    resolve();
    // youtubedl.getSubs(
    //   url,
    //   {
    //     lang: options.language || "en",
    //   },
    //   (err, output) => {
    //     if (err) reject(err);
    //     else {
    //       setAttachment(res, metadata, options.format);
    //       res.send(new Blob(output));
    //       resolve();
    //     }
    //   }
    // );
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
