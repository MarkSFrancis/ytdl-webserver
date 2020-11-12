import { NextApiRequest, NextApiResponse } from 'next'
import { downloadVideo } from '../../../../api/download';

export default (req: NextApiRequest, res: NextApiResponse) => {
  downloadVideo(req.query.url as string, res, req.body).catch((e) => {
    console.error("Error downloading video", req.query, e);
    res.statusCode = 500;
    res.end(`An error occurred (${e.message})`);
    res.destroy(e);
  });
};
