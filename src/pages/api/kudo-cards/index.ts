import type { NextApiRequest, NextApiResponse } from "next";

import {
  createKudoCard,
  fetchKudoCards,
} from "@/app/lib/actions/kudoCard.actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { choosenDate } = req.query;
    if (!choosenDate) {
      return res.status(400).json({ error: "Missing choosenDate" });
    }
    const data = await fetchKudoCards(choosenDate as string);
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const data = await createKudoCard({ data: req.body });
    return res.status(201).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
