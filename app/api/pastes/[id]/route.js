// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";

// export async function GET(request, { params }) {
//   try {
//     const { id } = await params; 
//     const result = await pool.query(
//       `SELECT id, content, created_at, expires_at
//        FROM pastes
//        WHERE id = $1`,
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { error: "Paste not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(result.rows[0]);
//   } catch (error) {
//     console.error("FETCH PASTE BY ID ERROR:", error);

//     return NextResponse.json(
//       { error: "Failed to fetch paste" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req, { params }) {
//   try {
//     const { id } = params;

//     const result = await pool.query(
//       `SELECT id, content, expires_at
//        FROM pastes
//        WHERE id = $1
//        AND (expires_at IS NULL OR expires_at > NOW())`,
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { error: "Paste not found or expired" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to fetch paste" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// /**
//  * GET single paste by id
//  */
// export async function GET(req, { params }) {
//   try {
//     const { id } = params; // ✅ correct usage

//     const result = await pool.query(
//       `
//       SELECT id, content, expires_at
//       FROM pastes
//       WHERE id = $1
//         AND (expires_at IS NULL OR expires_at > now())
//       `,
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { error: "Paste not found or expired" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to fetch paste" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import pool from "@/lib/db"; // ✅ now works

// export async function GET(req, { params }) {
//   try {
//     const { id } = params;

//     const result = await pool.query(
//       `
//       SELECT id, content, expires_at
//       FROM pastes
//       WHERE id = $1
//         AND (expires_at IS NULL OR expires_at > now())
//       `,
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { error: "Paste not found or expired" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to fetch paste" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params; // ✅ FIX

    const result = await pool.query(
      `
      SELECT id, content, expires_at
      FROM pastes
      WHERE id = $1
        AND (expires_at IS NULL OR expires_at > now())
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Paste not found or expired" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch paste" },
      { status: 500 }
    );
  }
}
