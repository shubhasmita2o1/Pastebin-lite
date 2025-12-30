// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const [content, setContent] = useState("");
//   const router = useRouter();

//   async function createPaste() {
//     const res = await fetch("/api/pastes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content }),
//     });

//     const data = await res.json();

//     if (data.id) {
//       router.push(`/p/${data.id}`);
//     }
//   }

//   return (
//     <main style={{ maxWidth: 800, margin: "40px auto" }}>
//       <h1>Pastebin Lite</h1>

//       <textarea
//         rows={12}
//         style={{ width: "100%", padding: 10 }}
//         placeholder="Write your paste here..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />

//       <button
//         onClick={createPaste}
//         style={{ marginTop: 10, padding: "10px 20px" }}
//       >
//         Create Paste
//       </button>
//     </main>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function HomePage() {
  const [content, setContent] = useState("");
  const [expire, setExpire] = useState("");
  const [pastes, setPastes] = useState([]);
  const [createdLink, setCreatedLink] = useState("");

  useEffect(() => {
    fetch("/api/pastes")
      .then((res) => res.json())
      .then(setPastes);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, expire }),
    });

    if (!res.ok) return alert("Failed");

    const { id } = await res.json();
    setCreatedLink(`${window.location.origin}/p/${id}`);
    setContent("");
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "900px",
        margin: "auto",
        color: "#fff",
      }}
    >
      {/* <h2 style={{ color: "red", textAlign: "center" }}>
  DEPLOY TEST – SHOULD BE RED
</h2> */}

      <h1 style={{ marginBottom: "1rem" }}>Pastebin Lite</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#111",
          padding: "1.5rem",
          borderRadius: "8px",
        }}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your paste here..."
          required
          style={{
            width: "100%",
            height: "200px",
            padding: "1rem",
            fontSize: "1rem",
            background: "#333",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "6px",
            resize: "vertical",
          }}
        />

        {/* DROPDOWN + BUTTON ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          <select
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
            style={{
              padding: "0.6rem 0.8rem",
              background: "#222",
              color: "#fff",
              border: "1px solid #555",
              borderRadius: "6px",
              fontSize: "0.95rem",
            }}
          >
            <option value="">Never expire</option>
            <option value="10m">10 minutes</option>
            <option value="1h">1 hour</option>
            <option value="1d">1 day</option>
          </select>

          <button
            type="submit"
            style={{
              padding: "0.65rem 1.5rem",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Create Paste
          </button>
        </div>
      </form>

      {/* CREATED LINK */}
      {createdLink && (
        <div
          style={{
            marginTop: "1.5rem",
            background: "#111",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <p style={{ marginBottom: "0.5rem" }}>Paste created:</p>

          <code style={{ wordBreak: "break-all", color: "#9ca3af" }}>
            {createdLink}
          </code>

          <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={() => navigator.clipboard.writeText(createdLink)}
              style={btnStyle}
            >
              Copy Link
            </button>

            <Link href={createdLink}>
              <button style={btnStyle}>Save Paste</button>
            </Link>
          </div>
        </div>
      )}

      {/* RECENT PASTES */}
      <h2 style={{ marginTop: "2rem" }}>Recent Pastes</h2>

      <ul style={{ marginTop: "0.75rem" }}>
        {pastes.map((p) => (
          <li key={p.id} style={{ marginBottom: "0.4rem" }}>
            <Link href={`/p/${p.id}`} style={{ color: "#93c5fd" }}>
              {p.content.slice(0, 40)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

const btnStyle = {
  padding: "0.5rem 1rem",
  background: "#374151",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
