import { NextRequest, NextResponse } from "next/server";

import {
  createKudoCard,
  fetchKudoCards,
} from "@/app/lib/actions/kudoCard.actions";
import { UserValidation } from "@/app/lib/validations/kudoCard.validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const choosenDate = searchParams.get("choosenDate");

    if (!choosenDate) {
      return NextResponse.json(
        { error: "Missing choosenDate" },
        { status: 400 }
      );
    }

    const data = await fetchKudoCards(choosenDate);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ENV_KUDO_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API not configured" },
        { status: 503 }
      );
    }

    const authHeader = request.headers.get("authorization");
    const providedKey = authHeader?.replace("Bearer ", "");

    if (!providedKey || providedKey !== apiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const validation = UserValidation.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validation.error.issues },
        { status: 400 }
      );
    }

    const result = await createKudoCard({ data: validation.data });

    if (typeof result === "object" && "error" in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
