import type { NextApiRequest, NextApiResponse } from "next";

import { fetchLastKudoCards } from "@/app/lib/actions/kudoCard.actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await fetchLastKudoCards();
    return res.status(200).json(data);
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
