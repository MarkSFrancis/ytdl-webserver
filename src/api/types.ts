import { Readable, Writable } from "stream";
export * from "../utils/types";

export interface ConversionStreams {
  input: Readable;
  output: Writable;
}

export enum ConversionType {
  Audio = "audio",
  Video = "video",
  Subs = "subs",
}
export type ConversionOptions = AudioConversion | VideoConversion | SubtitlesConversion;

export interface VideoConversion {
  convertTo?: string;
  type: ConversionType.Video;
}

export interface AudioConversion {
  convertTo?: string;
  type: ConversionType.Audio;
}

export interface SubtitlesConversion {
  language?: string[];
  includeAuto: boolean;
  format?: string;
  type: ConversionType.Subs;
}
