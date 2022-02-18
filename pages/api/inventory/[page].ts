// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';
import { naturalNumberPattern } from 'helpers/inventoryHelpers';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (naturalNumberPattern.test(req.query.page as string)) {
        const result = fakeDB.inventory.getByPage(Number(req.query.page));
        if (result) return res.status(200).json(result);
      }
    default:
      res.status(400).end();
  }
}
