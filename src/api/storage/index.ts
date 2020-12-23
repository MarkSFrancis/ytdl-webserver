import { existsSync as pathExists, promises as fs, createReadStream } from "fs";
import { Readable } from "stream";
import { archiveFolderAsStream } from "./archive";
import { basename } from "path";
import { getDownloadFolder, getFilesRecursive } from "./files";

export async function getStorageDirectory(downloadStartedAt: Date) {
  const dir = getDownloadFolder(downloadStartedAt);
  if (!pathExists(dir)) {
    await fs.mkdir(dir, { recursive: true });
  }

  return dir;
}

export function streamFile(
  path: string,
  setupStream: (stream: Readable) => Promise<void> | void
) {
  const file = createReadStream(path);
  setupStream(file);
}

export function streamFolderAsArchive(
  path: string,
  setupStream: (stream: Readable) => Promise<void> | void
) {
  return archiveFolderAsStream(path, setupStream);
}

/**
 * Streams a folder as a zip file if it has multiple files, or as a single file if it only contains one file
 * @param path The path to stream
 */
export async function streamFolderOrFile(
  path: string,
  setupStream: (
    stream: Readable,
    filename: string,
    isArchive: boolean
  ) => Promise<void> | void
): Promise<void> {
  let allFiles: string[] = [];
  for await (let file of getFilesRecursive(path)) {
    allFiles.push(file);
  }

  if (allFiles.length === 1) {
    const filename = basename(allFiles[0]);

    return streamFile(allFiles[0], (s) => setupStream(s, filename, false));
  } else {
    const filename = `${basename(path)}.zip`;

    return streamFolderAsArchive(path, (s) => setupStream(s, filename, true));
  }
}
