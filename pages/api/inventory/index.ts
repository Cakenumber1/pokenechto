// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { auth, db } from 'myFirebase/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import server from 'pages/api/server';

// const loadPokemons = async () => {
//   const map = new Map();
//   await db.collection('users').doc(auth.uid).collection('inventory')
//     .get()
//     .then((querySnapshot: any) => {
//       querySnapshot.forEach((doc: any) => {
//         map.set(doc.id, doc.data());
//       });
//     });
//   return map;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const [len, results] = await server.inventory
        .getByPage2(Number(req.query.page), req.body.data.uid);
      if (results) {
        return res.status(200).json({
          count: len,
          results,
        });
      }
      break;
    }
    default:
  }

  return res.status(400).end();
}
