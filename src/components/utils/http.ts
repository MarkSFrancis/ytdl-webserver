import axios from "axios";
import fileSaver from "file-saver";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function downloadPost(url: string, data?: any) {
  const response = await axios({
    url,
    method: "POST",
    responseType: "blob",
    data: data,
  });

  const filename = getFilename(response.headers["content-disposition"]);
  fileSaver.saveAs(response.data, filename);
}

function getFilename(contentDisposition: string): string {
  const filenameSuffix = contentDisposition?.split("filename=")[1];
  const filename = filenameSuffix?.split(";")[0];

  return filename?.replace(/^"+|"+$/g, "");
}
