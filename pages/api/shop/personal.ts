// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const ids = await fakeDB.shop.getUserIDsShop(req.body.uid); // fakeDB.shop.getIDs();
      if (ids) return res.status(200).json({ ids });
      break;
    }
    default:
  }
  return res.status(400).end();
}
