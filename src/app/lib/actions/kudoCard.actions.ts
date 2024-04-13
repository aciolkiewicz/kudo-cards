"use server";

import { revalidatePath } from "next/cache";

import KudoCard from "../models/kudoCard.models";
import { connectToDB } from "../mongoose";

interface createCardParameters {
  data: CardParameters;
  path: string;
}

export async function createKudoCard({
  data,
  path,
}: createCardParameters): Promise<void> {
  connectToDB();

  try {
    await KudoCard.findOneAndUpdate(data);
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create Kudo Card: ${error.message}`);
  }
}
