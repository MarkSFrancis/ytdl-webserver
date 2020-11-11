export interface Video {
  id: number;
  url: string;
  error?: string;
}

export interface DownloadAudioOptions {
  format?: string;
}

export interface DownloadVideoOptions {
  format?: string;
}

export interface DownloadSubtitlesOptions {
  language?: string;
  format?: string;
}
