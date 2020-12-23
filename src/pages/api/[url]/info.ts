import { NextApiRequest, NextApiResponse } from 'next'
import { getMetadata } from '../../../api/download';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.info("Getting metadata", req.query.url);

  getMetadata(req.query.url as string).then(meta => {
    res.send(meta);
  }).catch(e => {
    console.error("Error downloading metadata", req.query, e);
    res.destroy(e);
  });
};
