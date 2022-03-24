// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { auth, db } from 'myFirebase/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import fakeDB from 'pages/api/fakeDB';

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const results = fakeDB.inventory.getByPage(Number(req.query.page));
      if (results) {
        return res.status(200).json({
          count: fakeDB.inventory.getLength(),
          results,
        });
      }
      break;
    }
    default:
  }

  return res.status(400).end();
}
