import { NextApiRequest, NextApiResponse } from "next";
import { downloadSubtitles, updateAndDownload } from "../../../../api/download";

export default (req: NextApiRequest, res: NextApiResponse) => {
  updateAndDownload(req, res, () =>
    downloadSubtitles(req.query.url as string, res, req.body)
  );
};
