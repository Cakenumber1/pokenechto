// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const list = fakeDB.shop.getIDs();
      if (list) return res.status(200).json(list);
      break;
    }
    default:
  }
  return res.status(400).end();
}
