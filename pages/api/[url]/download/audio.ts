import { NextApiRequest, NextApiResponse } from 'next'
import { downloadAudio } from '../../../../api/download';

export default (req: NextApiRequest, res: NextApiResponse) => {
  downloadAudio(req.query.url as string, res, req.body).catch((e) => {
    console.error("Error downloading audio", req.query, e);
    res.destroy(e);
  });
};
