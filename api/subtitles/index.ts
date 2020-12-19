import { existsSync as pathExists, promises as fs } from "fs";
import { NextApiResponse } from "next";
import { archiveFolderAsStream } from "./archive";
import { getFilesFolder } from "./files";
import rimraf from "rimraf";

export { clearFiles as clearSubsFiles } from "./files";

export async function getSubsSaveDirectory(downloadStartedAt: Date) {
  const dir = getFilesFolder(downloadStartedAt);
  if (!pathExists(dir)) {
    await fs.mkdir(dir);
  }

  return dir;
}

export async function sendSubsStream(
  downloadStartedAt: Date,
  res: NextApiResponse
) {
  const folder = await getSubsSaveDirectory(downloadStartedAt);

  return await archiveFolderAsStream(folder, (a) => a.pipe(res));
}

export async function cleanupSubsFolder(downloadStartedAt: Date) {
  const folder = await getSubsSaveDirectory(downloadStartedAt);

  return await new Promise<void>((resolve, reject) =>
    rimraf(folder, (err) => (err ? reject(err) : resolve()))
  );
}
