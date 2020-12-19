import { NextApiResponse } from 'next';
import youtubedl from 'youtube-dl';
import sanitize from "sanitize-filename";
import { attachment } from '../utils';

function sanitizeFilename(filename: string) {
  const sanitized = sanitize(filename);

  // Remove characters that are incompatible with the Content-Disposition header
  return sanitized.normalize("NFD").replace(/[\u0300-\u036f]|\u2019/g, "");
}

export function getFilenameFromMeta(meta: youtubedl.Info, overrideExtension?: string) {
  const info = meta as { title?: string; uploader?: string; ext?: string };
  const filename = info.title || "download";
  const extension = overrideExtension || info.ext;

  return sanitizeFilename(`${filename}${extension ? `.${extension}` : ""}`);
}

export function setAttachment(response: NextApiResponse, meta: youtubedl.Info, overrideExtension?: string) {
  const filename = getFilenameFromMeta(meta, overrideExtension);

  console.log('filename', filename);
  attachment(response, filename);
}
