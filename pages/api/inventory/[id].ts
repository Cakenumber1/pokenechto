// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import server from 'pages/api/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const pokemon = await server.inventory
        .getCollectionItemById2(req.query.id as string, req.body.uid as string);
      if (pokemon) return res.status(200).json(pokemon);
      break;
    }
    case 'DELETE': {
      await server.inventory.deleteCollectionItem2(req.query.id as string, req.body.uid as string);
      return res.status(200).end();
    }
    case 'PATCH': {
      const info = await server.getUserInfo(req.body.uid);
      const count = info.berries;
      const diff = count - 1;
      if (diff >= 0) {
        await server.inventory
          .patchCollectionItem2(req.query.id as string, req.body.uid as string, diff);
        return res.status(200).end();
      }
      return res.status(402).end();
    }
    default:
  }

  return res.status(400).end();
}
