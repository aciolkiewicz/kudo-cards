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
    const currentDate = new Date();

    const oneMonthBefore = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );

    const oneMonthBeforeUTC = oneMonthBefore.toISOString();
    const currentDateUTC = currentDate.toISOString();

    const kudoCards = await KudoCard.find({
      created: {
        $gte: oneMonthBeforeUTC,
        $lt: currentDateUTC,
      },
    }).sort({ created: -1 });

    return kudoCards as CardParameters[];
  } catch (error: any) {
    throw new Error(`Failed to get Kudo Cards: ${error.message}`);
  }
}
