// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";

// export async function GET() {
//   try {
//     await pool.query("SELECT 1");
//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     return NextResponse.json(
//       { ok: false, error: "Database not reachable" },
//       { status: 500 }
//     );
//   }
// }
export async function GET(req, { params }) {
  const { id } = params; // ✅ NO await here

  const result = await pool.query(
    `SELECT id, content, created_at, expires_at
     FROM pastes
     WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(result.rows[0]);
}
