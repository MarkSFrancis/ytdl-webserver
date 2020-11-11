import { NextApiResponse } from "next";
import youtubedl from "youtube-dl";
import { ConversionOptions, ConversionStreams } from "../types";
import { FfmpegConversionOptions, ffmpegConvert } from "./ffmpeg";
import { setAttachment } from "./filename";

const youtubedlArgs = ["--no-playlist", "--no-check-certificate", "-f", "best"];

export async function youtubeToStream(
  url: string,
  output: NextApiResponse<Blob>,
  options: ConversionOptions
) {
  const videoStream = youtubedl(url, youtubedlArgs, {});

  return new Promise((resolve, reject) => {
    videoStream.on("error", (err) => {
      reject(err);
    });

    videoStream.on("info", (i) => {
      setAttachment(output, i, options.convertTo);
    });

    if (options.convertTo) {
      pipeFfmpeg(
        {
          input: videoStream,
          output,
        },
        {
          convertTo: options.convertTo,
          type: options.type,
        }
      )
        .then((r) => resolve(r))
        .catch((e) => reject(e));
    } else {
      videoStream.pipe(output);
    }
  });
}

function pipeFfmpeg(
  streams: ConversionStreams,
  options: FfmpegConversionOptions
) {
  const errOut: string[] = [];

  const conversion = ffmpegConvert(streams.input, options);
  conversion.stderr.on("data", (content: Buffer) => {
    const err = content.toString("utf-8");
    errOut.push(err);
  });

  return new Promise((resolve, reject) => {
    conversion.on("exit", (code: number) => {
      if (code !== 0) reject(errOut);
      else resolve();
    });

    conversion.stdout.pipe(streams.output);
  });
}
