// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import server from 'pages/api/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PATCH': {
      const result = 'lose';
      console.log(req.body);
      await server.mail.sendMail(req.body.data);
      return res.status(200).json(result);
    }
    default:
  }
  return res.status(400).end();
}
