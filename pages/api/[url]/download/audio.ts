import { NextApiRequest, NextApiResponse } from "next";
import {
  downloadAudio,
  updateAndDownload,
} from "../../../../api/download";

export default (req: NextApiRequest, res: NextApiResponse) => {
  updateAndDownload(req, res, () =>
    downloadAudio(req.query.url as string, res, req.body)
  );
};
