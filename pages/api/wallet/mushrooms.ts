// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import server from 'pages/api/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const a = await server.getUserInfo(req.body.uid);
      const count = a.berries;
      return res.status(200).json({ count });
    }
    case 'PATCH': {
      const a = await server.getUserInfo(req.body.uid);
      const prev = a.berries;
      await server.patchUserInfo(req.body.uid, Number(req.body.count) + Number(prev), 'berries');
      return res.status(200).end();
    }
    default:
  }

  return res.status(400).end();
}
