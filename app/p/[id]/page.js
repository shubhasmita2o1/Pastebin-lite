import { notFound } from "next/navigation";
import { pool } from "@/lib/db";

export default async function PastePage({ params }) {
  const { id } = params;

  const result = await pool.query(
    `
    SELECT content, created_at
    FROM pastes
    WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    notFound();
  }

  const paste = result.rows[0];

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Paste</h1>

      <p style={{ color: "#888" }}>
        Created at: {new Date(paste.created_at).toLocaleString()}
      </p>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "1rem",
          borderRadius: "6px",
          whiteSpace: "pre-wrap",
        }}
      >
        {paste.content}
      </pre>
    </main>
  );
}
