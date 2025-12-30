import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

/* ---------- CREATE PASTE ---------- */
export async function POST(req) {
  try {
    const { content, expires_at } = await req.json();

    const result = await pool.query(
      `INSERT INTO pastes (content, expires_at)
       VALUES ($1, $2)
       RETURNING id`,
      [content, expires_at || null]
    );

    return NextResponse.json({
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("CREATE PASTE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create paste" },
      { status: 500 }
    );
  }
}

/* ---------- GET ALL PASTES ---------- */
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, content, created_at, expires_at
       FROM pastes
       ORDER BY created_at DESC`
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("FETCH PASTES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch pastes" },
      { status: 500 }
    );
  }
}
