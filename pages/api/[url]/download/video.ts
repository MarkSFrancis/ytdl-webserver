import { NextApiRequest, NextApiResponse } from "next";
import { downloadVideo, updateAndDownload } from "../../../../api/download";

export default (req: NextApiRequest, res: NextApiResponse) => {
  updateAndDownload(req, res, () =>
    downloadVideo(req.query.url as string, res, req.body)
  );
};
