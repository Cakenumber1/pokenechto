// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { naturalNumberPattern } from 'helpers/inventoryHelpers';
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (naturalNumberPattern.test(req.query.page as string)) {
      const result = fakeDB.inventory.getByPage(Number(req.query.page));
      if (result) return res.status(200).json(result);
    }
  }
  return res.status(400).end();
}
