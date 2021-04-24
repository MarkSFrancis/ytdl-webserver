import { existsSync, promises as fs } from "fs";
import path from "path";
import rimraf from "rimraf";

export const downloadsDirectory = path.resolve(
  process.cwd(),
  ".temp",
  "downloads"
);

/**
 * Gets the folder in which downloads started on a specific date will be stored
 * @param startedOn The date on which the download started
 */
export function getDownloadFolder(startedOn: Date) {
  const folderId = (+startedOn).toString();

  return path.join(downloadsDirectory, folderId);
}

/**
 * Non-recursively gets files for downloads started on a specific date
 * @param startedOn The date to get downloads for
 */
export async function getFiles(startedOn: Date): Promise<string[]> {
  const dir = getDownloadFolder(startedOn);

  const files: string[] = [];
  for (const subItem of await fs.readdir(dir, { withFileTypes: true })) {
    if (subItem.isFile()) files.push(subItem.name);
  }

  return files;
}

/**
 * Clears old downloads
 * @param maxAgeMs Any downloads more than this number of milliseconds old will be cleared
 */
export async function clearDownloads(maxAgeMs = 0) {
  if (!existsSync(downloadsDirectory)) {
    return;
  }

  const subfolders = await fs.readdir(downloadsDirectory, {
    withFileTypes: true,
  });
  const deleteBefore = +new Date() - maxAgeMs;

  const oldSubFolders = subfolders.filter((s) => {
    if (!s.isDirectory()) return false;

    try {
      const createdOn = parseInt(s.name);
      if (typeof maxAgeMs === "number" && deleteBefore >= createdOn) {
        return true;
      }
    } catch {}
    return false;
  });

  for (const subfolder of oldSubFolders) {
    await new Promise<void>((resolve, reject) => {
      rimraf(path.join(downloadsDirectory, subfolder.name), (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
}

/**
 * Recursively gets files from a specified path
 * @param directory The directory to get files within
 */
export async function* getFilesRecursive(
  directory: string
): AsyncGenerator<string> {
  const subItems = await fs.readdir(directory, { withFileTypes: true });

  for (const subItem of subItems) {
    const subPath = path.join(directory, subItem.name);

    if (subItem.isDirectory()) {
      yield* getFilesRecursive(subPath);
    } else {
      yield subPath;
    }
  }
}

/**
 * Fixes the format of downloaded files, e.g. including replacing `_` with ` `
 * @param startedOn The date on which the download started
 */
export async function fixDownloadedFilenames(startedOn: Date) {
  const folder = getDownloadFolder(startedOn);
  for (const filePath in getFilesRecursive(folder)) {
    await fixDownloadedFilename(filePath);
  }
}

/**
 * Fixes the format of downloaded files, e.g. including replacing `_` with ` `
 * @param filePath The path to fix
 */
export function fixDownloadedFilename(filePath: string) {
  const dirname = path.dirname(filePath);
  const extname = path.extname(filePath);
  const basename = path.basename(filePath, extname);

  const cleanedBasename = basename.replaceAll(/_/, " ");
  if (cleanedBasename === basename) {
    return;
  }

  return fs.rename(filePath, path.join(dirname, `${cleanedBasename}${extname}`));
}
