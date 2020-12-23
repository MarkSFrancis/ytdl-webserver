import { NextApiRequest, NextApiResponse } from "next";
import {
  downloadAudio,
  executeDownload,
} from "../../../../api/download";

export default (req: NextApiRequest, res: NextApiResponse) => {
  return executeDownload(req, res, () =>
    downloadAudio(req.query.url as string, res, req.body)
  );
};
