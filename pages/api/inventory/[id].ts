// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const pokemon = await fakeDB.inventory
        .getCollectionItemById2(req.query.id as string, req.body.uid as string);
      if (pokemon) return res.status(200).json(pokemon);
      break;
    }
    case 'DELETE': {
      await fakeDB.inventory.deleteCollectionItem2(req.query.id as string, req.body.uid as string);
      return res.status(200).end();
    }
    case 'PATCH': {
      const info = await fakeDB.getUserInfo(req.body.uid);
      const count = info.berries;
      const diff = count - 1;
      if (diff >= 0) {
        await fakeDB.inventory
          .patchCollectionItem2(req.query.id as string, req.body.uid as string, diff);
        return res.status(200).end();
      }
      return res.status(402).end();
      // const pokemon = fakeDB.inventory.getCollectionItemById(req.query.id as string);
      // if (pokemon) {
      //   if (true) {
      //     // eslint-disable-next-line no-param-reassign
      //     // fakeDB.mushrooms -= 1;
      //     pokemon.stats.forEach((stat) => {
      //       const randNumber = Math.ceil(Math.random() * 10);
      //       if (stat.statVal + randNumber > 300) {
      //         // eslint-disable-next-line no-param-reassign
      //         stat.statVal = 300;
      //       } else {
      //         // eslint-disable-next-line no-param-reassign
      //         stat.statVal += randNumber;
      //       }
      //     });
    }
    default:
  }

  return res.status(400).end();
}
