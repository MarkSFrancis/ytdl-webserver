import { promises as fs } from "fs";
import path from "path";
import rimraf from "rimraf";

export const subsDirectory = path.resolve(process.cwd(), ".temp", "subs");

export function getFilesFolder(startedOn: Date) {
  const folderId = (+startedOn).toString();

  return path.join(subsDirectory, folderId);
}

export async function getFiles(startedOn: Date): Promise<string[]> {
  const dir = getFilesFolder(startedOn);

  const files: string[] = [];
  for (const subItem of await fs.readdir(dir, { withFileTypes: true })) {
    if (subItem.isFile()) files.push(subItem.name);
  }

  return files;
}

export async function clearFiles(maxAgeMs?: number) {
  const subfolders = await fs.readdir(subsDirectory, { withFileTypes: true });
  const deleteBefore = +new Date() - (maxAgeMs || 0);

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
    await new Promise((resolve, reject) => {
      rimraf(path.join(subsDirectory, subfolder.name), (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
}

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
