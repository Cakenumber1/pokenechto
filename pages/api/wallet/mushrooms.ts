// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const { mushrooms: count } = fakeDB;
      return res.status(200).json({ count });
    }
    case 'PATCH': {
      fakeDB.mushrooms = Number(fakeDB.mushrooms) + Number(req.body.count);
      return res.status(200).end();
    }
    default:
  }

  return res.status(400).end();
}
