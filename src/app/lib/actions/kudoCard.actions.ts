"use server";

import KudoCard from "../models/kudoCard.models";
import { connectToDB } from "../mongoose";

interface CreateCardParameters {
  data: CardParameters;
}

interface fetchKudoCardParameters {
  cardId: string;
}

interface AddHeartParameters {
  cardId: string;
  hearts: number;
}

type ErrorResponse = { error: string };

async function sendKudoToSlack({
  recipient,
  message,
  id,
}: {
  recipient: string;
  message: string;
  id: string;
}) {
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `🎉 New Kudo Card for ${recipient}:`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${message}*\n<https://kudo-cards-adi.netlify.app/kudo-card/${id}|View Kudo Card>`,
          },
        },
      ],
    }),
  });
}

function toPlainCard(card: any): CardParameters {
  return {
    ...card,
    _id: card._id?.toString(),
    created:
      card.created instanceof Date ? card.created.toISOString() : card.created,
  };
}

export async function createKudoCard({
  data,
}: CreateCardParameters): Promise<CardParameters | ErrorResponse> {
  connectToDB();

  try {
    if (data.from === "") data.from = "John Doe: The Unsung Hero";
    const createdKudoCard = await KudoCard.create(data);
    sendKudoToSlack({
      recipient: data.to,
      message: `${data.for}`,
      id: createdKudoCard._id.toString(),
    });
    return toPlainCard(createdKudoCard.toObject());
  } catch (error: any) {
    return { error: `Failed to create Kudo Card: ${error.message}` };
  }
}

export async function fetchKudoCards(
  choosenDate: string
): Promise<CardParameters[] | ErrorResponse> {
  connectToDB();

  // Guard against missing or invalid date
  if (!choosenDate || isNaN(new Date(choosenDate).getTime())) {
    return { error: "Invalid or missing date parameter." };
  }

  try {
    const startMonth = new Date(choosenDate);
    const endMonth = new Date(choosenDate);
    endMonth.setMonth(endMonth.getMonth() + 1);
    endMonth.setDate(0);

    const startMonthUTC = startMonth.toISOString();
    const endMonthUTC = endMonth.toISOString();

    const kudoCards = await KudoCard.find({
      created: {
        $gte: startMonthUTC,
        $lt: endMonthUTC,
      },
    })
      .lean()
      .sort({ created: -1 });

    return kudoCards.map(toPlainCard);
  } catch (error: any) {
    return { error: `Failed to get Kudo Cards: ${error.message}` };
  }
}

export async function fetchLastKudoCards(): Promise<
  CardParameters[] | ErrorResponse
> {
  connectToDB();

  try {
    const kudoCards = await KudoCard.find()
      .lean()
      .sort({ created: -1 })
      .limit(10);

    return kudoCards.map(toPlainCard);
  } catch (error: any) {
    return { error: `Failed to get last Kudo Cards: ${error.message}` };
  }
}

export async function fetchKudoCard({
  cardId,
}: fetchKudoCardParameters): Promise<CardParameters | ErrorResponse> {
  connectToDB();

  try {
    const kudoCard = await KudoCard.findById(cardId).lean();

    return toPlainCard(kudoCard);
  } catch (error: any) {
    return { error: `Failed to get Kudo Card ${cardId}: ${error.message}` };
  }
}

export async function addHeart({
  cardId,
  hearts,
}: AddHeartParameters): Promise<number | ErrorResponse> {
  connectToDB();

  try {
    const updatedKudoCard = await KudoCard.findOneAndUpdate(
      { _id: cardId },
      {
        hearts: hearts + 1,
      }
    );

    return updatedKudoCard.hearts + 1;
  } catch (error: any) {
    return { error: `Failed to add heart: ${error.message}` };
  }
}
