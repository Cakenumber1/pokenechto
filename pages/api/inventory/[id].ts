// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const pokemon = fakeDB.inventory.getCollectionItemById(req.query.id as string);
      if (pokemon) return res.status(200).json(pokemon);
      break;
    }
    case 'DELETE': {
      fakeDB.inventory.deleteCollectionItem(req.query.id as string);
      return res.status(200).end();
    }
    case 'PATCH': {
      const pokemon = fakeDB.inventory.getCollectionItemById(req.query.id as string);
      if (pokemon) {
        if (true) {
          // eslint-disable-next-line no-param-reassign
          // fakeDB.mushrooms -= 1;
          pokemon.stats.forEach((stat) => {
            const randNumber = Math.ceil(Math.random() * 10);
            if (stat.statVal + randNumber > 300) {
              // eslint-disable-next-line no-param-reassign
              stat.statVal = 300;
            } else {
              // eslint-disable-next-line no-param-reassign
              stat.statVal += randNumber;
            }
          });
          return res.status(200).end();
        }
      }
      break;
    }
    default:
  }

  return res.status(400).end();
}
