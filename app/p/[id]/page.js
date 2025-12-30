import { notFound } from "next/navigation";

export default async function PastePage(props) {
  const id = props.params.id;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://pastebinlite-mauve.vercel.app";

  const res = await fetch(`${baseUrl}/api/pastes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const paste = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
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
    </main>
  );
}
