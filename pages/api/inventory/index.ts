// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fakeDB from "../fakeDB";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "HEAD":
      res.setHeader("x-inventory-pages-length", fakeDB.inventory.getPages());
      return res.status(200).end();
    default:
      return res.status(400).end();
  }
}
