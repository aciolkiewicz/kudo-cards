"use server";

import KudoCard from "../models/kudoCard.models";
import { connectToDB } from "../mongoose";

interface CreateCardParameters {
  data: CardParameters;
}

export async function createKudoCard({
  data,
}: CreateCardParameters): Promise<void> {
  connectToDB();

  try {
    await KudoCard.create(data);
  } catch (error: any) {
    throw new Error(`Failed to create Kudo Card: ${error.message}`);
  }
}

export async function fetchKudoCards(): Promise<CardParameters[]> {
  connectToDB();

  try {
    const kudoCards = await KudoCard.find({});
    return kudoCards as CardParameters[];
  } catch (error: any) {
    throw new Error(`Failed to get Kudo Cards: ${error.message}`);
  }
}
