import { NextResponse } from "next/server";

import { cardColors, cardTitles } from "@/constants";

export async function GET() {
  try {
    const config = {
      cardTitles: cardTitles.map(title => title.name),
      cardColors: cardColors.map(color => color.name),
    };

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}