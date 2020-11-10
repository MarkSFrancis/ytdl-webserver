export interface Video {
  id: number;
  url: string;
  downloading: boolean;
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
