// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Exception } from 'sass';
import Stripe from 'stripe';

// @ts-ignore
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const { id, amount } = req.body;
      try {
        const payment = await stripe.paymentIntents.create({
          payment_method: id,
          amount,
          currency: 'kzt',
          description: 'PokeCurrency purchase',
          confirm: true,
        });
        res.status(200).json({ status: payment.status });
      } catch (e) {
        res.status(400).send((e as Exception).message);
      }
      break;
    }
    default:
  }
  return res.status(400).end();
}
