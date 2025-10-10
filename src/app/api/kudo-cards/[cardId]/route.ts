import { NextRequest, NextResponse } from "next/server";

import { addHeart, fetchKudoCard } from "@/app/lib/actions/kudoCard.actions";

export async function GET(
  request: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { cardId } = params;

    if (!cardId) {
      return NextResponse.json(
        { error: "Missing or invalid cardId" },
        { status: 400 }
      );
    }

    const data = await fetchKudoCard({ cardId });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching kudo card:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { cardId } = params;

    if (!cardId) {
      return NextResponse.json(
        { error: "Missing or invalid cardId" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { hearts } = body;

    if (typeof hearts !== "number") {
      return NextResponse.json(
        { error: "Missing or invalid hearts" },
        { status: 400 }
      );
    }

    const data = await addHeart({ cardId, hearts });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating kudo card:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
