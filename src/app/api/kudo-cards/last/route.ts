import { NextResponse } from "next/server";

import { fetchLastKudoCards } from "@/app/lib/actions/kudoCard.actions";

export async function GET() {
  try {
    const data = await fetchLastKudoCards();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching last kudo cards:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
