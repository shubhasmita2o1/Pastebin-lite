import { notFound } from "next/navigation";

export default async function PastePage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const paste = await res.json();

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Paste</h1>

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

      <p style={{ marginTop: "1rem", color: "#888" }}>
        Created at: {new Date(paste.created_at).toLocaleString()}
      </p>
    </main>
  );
}
