import { notFound } from "next/navigation";

export default async function PastePage(props) {
  const id = props.params.id;

  const res = await fetch(`/api/pastes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const paste = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Paste</h1>
      <pre>{paste.content}</pre>
    </main>
  );
}
