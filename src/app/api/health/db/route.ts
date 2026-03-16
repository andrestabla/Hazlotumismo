import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        error: "DATABASE_URL is missing",
      },
      { status: 503 },
    );
  }

  try {
    const result = await getDb().execute(sql`select now() as current_time`);

    return NextResponse.json({
      ok: true,
      time: result.rows[0]?.current_time ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 },
    );
  }
}
