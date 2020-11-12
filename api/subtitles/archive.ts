import archiver from "archiver";
import { Readable } from "stream";
import { getFilesRecursive } from "./files";
import fs from "fs";
import path from "path";

function getFilename(filePath: string) {
  const pathParts = filePath?.split(path.sep);
  return pathParts?.[pathParts.length - 1];
}

export async function archiveFolderAsStream(
  folderPath: string,
  setupStream: (stream: Readable) => void
) {
  const archive = archiver("zip");

  setupStream(archive);

  console.log('Adding subs', folderPath);
  for await (const file of getFilesRecursive(folderPath)) {
    const stream = fs.createReadStream(file);
    const name = getFilename(file);
    archive.append(stream, { name });
  }

  await archive.finalize();
}
