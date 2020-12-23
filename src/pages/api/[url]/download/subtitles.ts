import { NextApiRequest, NextApiResponse } from "next";
import { downloadSubtitles, executeDownload } from "../../../../api/download";

export default (req: NextApiRequest, res: NextApiResponse) => {
  return executeDownload(req, res, () =>
    downloadSubtitles(req.query.url as string, res, req.body)
  );
};
