import { Readable, Writable } from "stream";
export * from "../utils/types";

export interface ConversionStreams {
  input: Readable;
  output: Writable;
}

export enum ConversionType {
  Audio = "audio",
  Video = "video",
}
export type ConversionOptions = AudioConversion | VideoConversion;

export interface VideoConversion {
  convertTo?: string;
  type: ConversionType.Video;
}

export interface AudioConversion {
  convertTo: string;
  type: ConversionType.Audio;
}
