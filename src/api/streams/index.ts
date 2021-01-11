import { NextApiResponse } from "next";
import youtubedl from "youtube-dl";
import { getStorageDirectory, streamFolderOrFile } from "../storage";
import { ConversionOptions, ConversionType } from "../types";
import { attachment } from "../utils";
import pathToFfmpeg from "ffmpeg-static";

export async function youtubeToStream(
  downloadStartedAt: Date,
  url: string,
  res: NextApiResponse<Blob>,
  options: ConversionOptions
) {
  const outputDirectory = await getStorageDirectory(downloadStartedAt);

  const youtubedlArgs = getYoutubedlArgs(outputDirectory, options);

  await new Promise<void>((resolve, reject) => {
    console.info(
      "Downloading",
      "youtube-dl " + youtubedlArgs.map((a) => `"${a}"`).join(" ")
    );

    youtubedl.exec(url, youtubedlArgs, {}, (err, output) => {
      if (err) {
        reject(err);
      } else {
        console.info(output.join("\n"));
        console.info("Finished download");
        resolve();
      }
    });
  });

  await streamFolderOrFile(outputDirectory, (s, filename) => {
    attachment(res, filename);
    s.pipe(res, { end: true });
  });
}

function getYoutubedlArgs(
  outputToDirectory: string,
  options: ConversionOptions
) {
  let typeArgs = [];
  const outputPattern = `${outputToDirectory}/%(title)s.%(ext)s`;

  switch (options.type) {
    case ConversionType.Audio:
      typeArgs = ["-f bestaudio", "-x", "--audio-quality", "0"];

      if (options.convertTo) {
        typeArgs = [...typeArgs, "--audio-format", options.convertTo];
      }
      break;
    case ConversionType.Video:
      typeArgs = ["-f", "best"];
      if (options.convertTo) {
        typeArgs = [...typeArgs, "--recode-video", options.convertTo];
      }
      break;
    case ConversionType.Subs:
      const formatArgs = options.format ? ["--sub-format", options.format] : [];
      const languageArgs = options.language
        ? ["--sub-lang", options.language.join(",")]
        : ["--all-subs"];
      const autoSubsArgs = options.includeAuto ? ["--write-auto-sub"] : [];

      typeArgs = [
        "--skip-download",
        ...formatArgs,
        ...languageArgs,
        ...autoSubsArgs,
      ];
      break;
    default:
      throw new Error("Not supported conversion type");
  }

  return [
    "--no-playlist",
    "--no-check-certificate",
    "--ffmpeg-location",
    pathToFfmpeg,
    ...typeArgs,
    "-o",
    outputPattern,
  ];
}
