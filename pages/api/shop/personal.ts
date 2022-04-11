// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const pids = await fakeDB.shop.getUserIDsShop(req.body.uid); // fakeDB.shop.getIDs();
      if (pids) return res.status(200).json({ pids });
      break;
    }
    default:
  }
  return res.status(400).end();
}
