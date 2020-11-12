import { NextApiRequest, NextApiResponse } from 'next'
import { downloadSubtitles } from '../../../../api/download';

export default (req: NextApiRequest, res: NextApiResponse) => {
  downloadSubtitles(req.query.url as string, res, req.body).catch((e) => {
    console.error("Error downloading subtitles", req.query, e);
    res.statusCode = 500;
    res.end(`An error occurred (${e.message})`);
    res.destroy(e);
  });
};
