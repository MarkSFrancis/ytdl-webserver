import { NextApiRequest, NextApiResponse } from 'next'
import { downloadAudio } from '../../../../api/download';

export default (req: NextApiRequest, res: NextApiResponse) => {
  downloadAudio(req.query.url as string, res, req.body).catch((e: Error) => {
    console.error("Error downloading audio", req.query, e);
    res.statusCode = 500;
    res.end(`An error occurred (${e.message})`);
    res.destroy(e);
  });
};
