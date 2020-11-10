import { ChildProcess, spawn } from "child_process";
import pathToFfmpeg from "ffmpeg-static";
import { Readable } from "stream";
import { ConversionType } from "../types";

export interface FfmpegConversionOptions {
  type: ConversionType,
  convertTo: string;
}

export function ffmpegConvert(
  input: Readable,
  options: FfmpegConversionOptions
): ChildProcess {
  const ffmpegProc = spawn(pathToFfmpeg, [
    "-f",
    "mp4",
    "-i",
    "-",
    ...(options.type === ConversionType.Video ? [] : ["-vn"]), // Tells ffmpeg to skip video streams
    "-f",
    options.convertTo,
    "-",
  ]);

  input.pipe(ffmpegProc.stdin);

  return ffmpegProc;
}
