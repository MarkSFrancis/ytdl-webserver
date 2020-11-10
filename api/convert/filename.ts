import { NextApiResponse } from 'next';
import youtubedl from 'youtube-dl';
import { attachment } from '../utils';

export function getFilenameFromMeta(meta: youtubedl.Info, overrideExtension?: string) {
  const info = meta as { title?: string; uploader?: string; ext?: string };
  const filename = info.title || "download";
  const extension = overrideExtension || info.ext;

  return `${filename}${extension ? `.${extension}` : ""}`;
}

export function setAttachment(response: NextApiResponse, meta: youtubedl.Info, overrideExtension?: string) {
  const filename = getFilenameFromMeta(meta, overrideExtension);

  attachment(response, filename);
}
