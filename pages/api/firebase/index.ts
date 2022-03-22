// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const results = fakeDB.inventory.getByPage(Number(req.query.page));
      if (results) {
        return res.status(200).json({
          count: fakeDB.inventory.getLength(),
          results,
        });
      }
      break;
    }
    default:
  }

  return res.status(400).end();
}
