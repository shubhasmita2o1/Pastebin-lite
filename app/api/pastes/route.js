// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";

// /* ---------- CREATE PASTE ---------- */
// export async function POST(req) {
//   try {
//     const { content, expires_at } = await req.json();

//     const result = await pool.query(
//       `INSERT INTO pastes (content, expires_at)
//        VALUES ($1, $2)
//        RETURNING id`,
//       [content, expires_at || null]
//     );

//     return NextResponse.json({
//       id: result.rows[0].id,
//     });
//   } catch (error) {
//     console.error("CREATE PASTE ERROR:", error);

//     return NextResponse.json(
//       { error: "Failed to create paste" },
//       { status: 500 }
//     );
//   }
// }

// /* ---------- GET ALL PASTES ---------- */
// export async function GET() {
//   try {
//     const result = await pool.query(
//       `SELECT id, content, created_at, expires_at
//        FROM pastes
//        ORDER BY created_at DESC`
//     );

//     return NextResponse.json(result.rows);
//   } catch (error) {
//     console.error("FETCH PASTES ERROR:", error);

//     return NextResponse.json(
//       { error: "Failed to fetch pastes" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import {pool} from "@/lib/db";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req) {
//   try {
//     const { content, expire } = await req.json();

//     if (!content) {
//       return NextResponse.json(
//         { error: "Content required" },
//         { status: 400 }
//       );
//     }

//     let expiresAt = null;

//     if (expire) {
//       const now = new Date();

//       if (expire === "10m") now.setMinutes(now.getMinutes() + 10);
//       if (expire === "1h") now.setHours(now.getHours() + 1);
//       if (expire === "1d") now.setDate(now.getDate() + 1);

//       expiresAt = now;
//     }

//     const id = uuidv4();

//     await pool.query(
//       `INSERT INTO pastes (id, content, expires_at)
//        VALUES ($1, $2, $3)`,
//       [id, content, expiresAt]
//     );

//     return NextResponse.json({ id }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to create paste" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

/* GET all pastes */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT id, content 
       FROM pastes 
       WHERE expires_at IS NULL OR expires_at > now()
       ORDER BY created_at DESC
       LIMIT 20`
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}

/* CREATE paste */
export async function POST(req) {
  try {
    const { content, expire } = await req.json();
    if (!content) {
      return NextResponse.json({ error: "Content required" }, { status: 400 });
    }

    let expiresAt = null;
    if (expire) {
      const now = new Date();
      if (expire === "10m") now.setMinutes(now.getMinutes() + 10);
      if (expire === "1h") now.setHours(now.getHours() + 1);
      if (expire === "1d") now.setDate(now.getDate() + 1);
      expiresAt = now;
    }

    const id = uuidv4();

    await pool.query(
      `INSERT INTO pastes (id, content, expires_at)
       VALUES ($1, $2, $3)`,
      [id, content, expiresAt]
    );

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
