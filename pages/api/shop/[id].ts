// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import server from 'pages/api/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const pokemon = await server.shop.getPokeByID(req.body.target, req.body.pid);
      if (pokemon) return res.status(200).json({ ...pokemon, pid: req.body.pid });
      break;
    }
    case 'PATCH': {
      const { uid, poke, price } = req.body.data;
      const info = await server.getUserInfo(uid);
      const count = info.money;
      const bestiary = new Set(info.bestiary as number[]);
      const diff = count - price;
      if (diff >= 0) {
        const result = await server.shop.buyPoke(poke, uid, diff, bestiary);
        return res.status(result).end();
      }
      return res.status(402).end();
    }
    default:
  }
  return res.status(400).end();
}
