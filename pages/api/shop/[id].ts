// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const pokemon = await fakeDB.shop.getPokeByID(req.body.target, req.body.uid);
      if (pokemon) return res.status(200).json(pokemon);
      break;
    }
    case 'PATCH': {
      // if (fakeDB.money >= 500) {
      if (600 >= 500) {
        fakeDB.buyPoke(String(req.query.id), 500);
        return res.status(200).end();
      }
      return res.status(402).end();
    }
    default:
  }
  return res.status(400).end();
}
