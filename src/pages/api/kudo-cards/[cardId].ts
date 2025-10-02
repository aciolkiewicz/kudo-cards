import type { NextApiRequest, NextApiResponse } from "next";

import { addHeart, fetchKudoCard } from "@/app/lib/actions/kudoCard.actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cardId } = req.query;

  if (!cardId || typeof cardId !== "string") {
    return res.status(400).json({ error: "Missing or invalid cardId" });
  }

  if (req.method === "GET") {
    const data = await fetchKudoCard({ cardId });
    return res.status(200).json(data);
  }

  if (req.method === "PATCH") {
    const { hearts } = req.body;
    if (typeof hearts !== "number") {
      return res.status(400).json({ error: "Missing or invalid hearts" });
    }
    const data = await addHeart({ cardId, hearts });
    return res.status(200).json(data);
  }

  res.setHeader("Allow", ["GET", "PATCH"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
