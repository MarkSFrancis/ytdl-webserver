import { NextApiRequest, NextApiResponse } from "next";
import { downloadVideo, executeDownload } from "../../../../api/download";

export default (req: NextApiRequest, res: NextApiResponse) => {
  return executeDownload(req, res, () =>
    downloadVideo(req.query.url as string, res, req.body)
  );
};
