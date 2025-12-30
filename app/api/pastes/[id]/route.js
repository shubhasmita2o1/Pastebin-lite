import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params; 
    const result = await pool.query(
      `SELECT id, content, created_at, expires_at
       FROM pastes
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Paste not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("FETCH PASTE BY ID ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch paste" },
      { status: 500 }
    );
  }
}
