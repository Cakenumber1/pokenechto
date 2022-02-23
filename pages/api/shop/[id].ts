// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const pokemon = fakeDB.shop.getPokeByID(String(req.query.id));
      if (pokemon) return res.status(200).json(pokemon);
      break;
    }
    case 'PATCH': {
      if (fakeDB.money >= 500) {
        fakeDB.buyPoke(String(req.query.id), 500);
        // todo: no response
        return res.status(200).end();
      } else {
        return res.status(402).end();
      }
    }
    default:
  }
  return res.status(400).end();
}
