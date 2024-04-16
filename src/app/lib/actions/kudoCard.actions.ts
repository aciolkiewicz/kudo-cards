"use server";

import KudoCard from "../models/kudoCard.models";
import { connectToDB } from "../mongoose";

interface Parameters {
  data: CardParameters;
}

export async function createKudoCard({ data }: Parameters): Promise<void> {
  connectToDB();

  try {
    await KudoCard.create(data);
  } catch (error: any) {
    throw new Error(`Failed to create Kudo Card: ${error.message}`);
  }
}
