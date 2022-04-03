// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const a = await fakeDB.getUserInfo(req.body.uid);
      const count = a.money;
      return res.status(200).json({ count });
    }
    case 'PATCH': {
      const a = await fakeDB.getUserInfo(req.body.uid);
      const prev = a.money;
      await fakeDB.patchUserInfo(req.body.uid, Number(req.body.count) + Number(prev), 'money');
      return res.status(200).end();
    }
    default:
  }

  return res.status(400).end();
}
