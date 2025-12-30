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

// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [content, setContent] = useState("");
//   const [pasteUrl, setPasteUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function createPaste() {
//     if (!content.trim()) return;

//     setLoading(true);

//     const res = await fetch("/api/pastes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ content }),
//     });

//     const data = await res.json();

//     if (data.id) {
//       const url = `${window.location.origin}/p/${data.id}`;
//       setPasteUrl(url);
//       setContent("");
//     }

//     setLoading(false);
//   }

//   function copyLink() {
//     navigator.clipboard.writeText(pasteUrl);
//     alert("Link copied!");
//   }

//   return (
//     <main style={{ maxWidth: "700px", margin: "40px auto" }}>
//       <h1>Pastebin Lite</h1>

//       <textarea
//         placeholder="Write your paste here..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         rows={10}
//         style={{ width: "100%", padding: "10px" }}
//       />

//       <br />
//       <br />

//       <button onClick={createPaste} disabled={loading}>
//         {loading ? "Creating..." : "Create Paste"}
//       </button>

//       {pasteUrl && (
//         <div style={{ marginTop: "20px" }}>
//           <p><strong>Share this link:</strong></p>
//           <input
//             value={pasteUrl}
//             readOnly
//             style={{ width: "100%", padding: "8px" }}
//           />
//           <br />
//           <br />
//           <button onClick={copyLink}>Copy Link</button>
//         </div>
//       )}
//     </main>
//   );
// }


// import Link from "next/link";

// export default async function HomePage() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/pastes`,
//     { cache: "no-store" }
//   );

//   const pastes = await res.json();

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Pastebin Lite</h1>

//       {/* Create Paste Form */}
//       <form
//         action="/api/pastes"
//         method="post"
//         style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//       >
//         <textarea
//           name="content"
//           placeholder="Write your paste here..."
//           required
//           style={{ height: "180px", padding: "1rem" }}
//         />

//         <button type="submit">Create Paste</button>
//       </form>

//       {/* Paste List */}
//       <h2 style={{ marginTop: "2rem" }}>Recent Pastes</h2>

//       {pastes.length === 0 && <p>No pastes yet</p>}

//       <ul style={{ marginTop: "1rem" }}>
//         {pastes.map((paste) => (
//           <li key={paste.id} style={{ marginBottom: "0.75rem" }}>
//             <Link href={`/p/${paste.id}`}>
//               {paste.content.slice(0, 50)}
//               {paste.content.length > 50 && "..."}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function HomePage() {
//   const [content, setContent] = useState("");
//   const [pastes, setPastes] = useState([]);
//   const router = useRouter();

//   // Fetch recent pastes
//   useEffect(() => {
//     async function loadPastes() {
//       const res = await fetch("/api/pastes", { cache: "no-store" });
//       const data = await res.json();
//       setPastes(data);
//     }

//     loadPastes();
//   }, []);

//   // Create paste
//   async function handleSubmit(e) {
//     e.preventDefault();

//     const res = await fetch("/api/pastes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content }),
//     });

//     if (!res.ok) {
//       alert("Failed to create paste");
//       return;
//     }

//     const { id } = await res.json();
//     router.push(`/p/${id}`);
//   }

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Pastebin Lite</h1>

//       {/* Create Paste */}
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//       >
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write your paste here..."
//           required
//           style={{ height: "180px", padding: "1rem" }}
//         />

//         <button type="submit">Create Paste</button>
//       </form>

//       {/* Recent Pastes */}
//       <h2 style={{ marginTop: "2rem" }}>Recent Pastes</h2>

//       {pastes.length === 0 && <p>No pastes yet</p>}

//       <ul style={{ marginTop: "1rem" }}>
//         {pastes.map((paste) => (
//           <li key={paste.id} style={{ marginBottom: "0.75rem" }}>
//             <Link href={`/p/${paste.id}`}>
//               {paste.content.slice(0, 50)}
//               {paste.content.length > 50 && "..."}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function HomePage() {
//   const [content, setContent] = useState("");
//   const [pastes, setPastes] = useState([]);
//   const [createdLink, setCreatedLink] = useState("");
//   const [expire, setExpire] = useState("");


//   // Fetch recent pastes
//   useEffect(() => {
//     fetch("/api/pastes", { cache: "no-store" })
//       .then((res) => res.json())
//       .then(setPastes);
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const res = await fetch("/api/pastes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content,expire }),
//     });

//     if (!res.ok) {
//       alert("Failed to create paste");
//       return;
//     }

//     const { id } = await res.json();
//     const link = `${window.location.origin}/p/${id}`;

//     setCreatedLink(link);
//     setContent("");
//   }

//   function copyLink() {
//     navigator.clipboard.writeText(createdLink);
//     alert("Link copied!");
//   }

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Pastebin Lite</h1>

//       {/* Create Paste */}
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//       >
        
//         {/* <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write your paste here..."
//           required
//           style={{ height: "180px", padding: "1rem" }}
//         />

//         <button type="submit">Create Paste</button> */}


//         <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Write your paste here..."
//         required
//         style={{ height: "180px", padding: "1rem" }}
//         />

//         <select
//           value={expire}
//           onChange={(e) => setExpire(e.target.value)}
//           style={{ padding: "0.5rem" }}
//         >
//           <option value="">Never expire</option>
//           <option value="10m">10 minutes</option>
//           <option value="1h">1 hour</option>
//           <option value="1d">1 day</option>
//         </select>

//         <button type="submit">Create Paste</button>

//       </form>

//       {/* Created link */}
//       {createdLink && (
//         <div
//           style={{
//             marginTop: "1.5rem",
//             padding: "1rem",
//             background: "#111",
//             borderRadius: "6px",
//           }}
//         >
//           <p>Paste created:</p>
//           <code style={{ wordBreak: "break-all" }}>{createdLink}</code>

//           <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem" }}>
//             <button onClick={copyLink}>Copy Link</button>
//             <Link href={createdLink}>
//               <button>Save Paste</button>
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Recent Pastes */}
//       <h2 style={{ marginTop: "2rem" }}>Recent Pastes</h2>

//       {pastes.length === 0 && <p>No pastes yet</p>}

//       <ul>
//         {pastes.map((paste) => (
//           <li key={paste.id}>
//             <Link href={`/p/${paste.id}`}>
//               {paste.content.slice(0, 50)}
//               {paste.content.length > 50 && "..."}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function HomePage() {
//   const [content, setContent] = useState("");
//   const [pastes, setPastes] = useState([]);
//   const [createdLink, setCreatedLink] = useState("");
//   const [expire, setExpire] = useState("");

//   // Fetch recent pastes
//   async function loadPastes() {
//     const res = await fetch("/api/pastes", { cache: "no-store" });
//     const data = await res.json();
//     setPastes(data);
//   }

//   useEffect(() => {
//     loadPastes();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const res = await fetch("/api/pastes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content, expire }),
//     });

//     if (!res.ok) {
//       alert("Failed to create paste");
//       return;
//     }

//     const { id } = await res.json();
//     const link = `${window.location.origin}/p/${id}`;

//     setCreatedLink(link);
//     setContent("");
//     setExpire("");

//     // refresh recent pastes
//     loadPastes();
//   }

//   function copyLink() {
//     navigator.clipboard.writeText(createdLink);
//     alert("Link copied!");
//   }

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Pastebin Lite</h1>

//       {/* Create Paste */}
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//       >
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write your paste here..."
//           required
//           style={{ height: "180px", padding: "1rem" }}
//         />

//         {/* Expire dropdown */}
//         <select
//           value={expire}
//           onChange={(e) => setExpire(e.target.value)}
//           style={{ padding: "0.5rem" }}
//         >
//           <option value="">Never expire</option>
//           <option value="10m">10 minutes</option>
//           <option value="1h">1 hour</option>
//           <option value="1d">1 day</option>
//         </select>

//         <button type="submit" disabled={!content.trim()}>
//           Create Paste
//         </button>
//       </form>

//       {/* Created link */}
//       {createdLink && (
//         <div
//           style={{
//             marginTop: "1.5rem",
//             padding: "1rem",
//             background: "#111",
//             borderRadius: "6px",
//           }}
//         >
//           <p>Paste created:</p>
//           <code style={{ wordBreak: "break-all" }}>{createdLink}</code>

//           <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem" }}>
//             <button onClick={copyLink}>Copy Link</button>

//             <Link
//               href={createdLink}
//               style={{
//                 padding: "0.5rem 1rem",
//                 background: "#333",
//                 borderRadius: "4px",
//                 textDecoration: "none",
//                 color: "white",
//               }}
//             >
//               Open Paste
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Recent Pastes */}
//       <h2 style={{ marginTop: "2rem" }}>Recent Pastes</h2>

//       {pastes.length === 0 && <p>No pastes yet</p>}

//       <ul>
//         {pastes.map((paste) => (
//           <li key={paste.id}>
//             <Link href={`/p/${paste.id}`}>
//               {paste.content.slice(0, 50)}
//               {paste.content.length > 50 && "..."}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function HomePage() {
//   const [content, setContent] = useState("");
//   const [expire, setExpire] = useState("");
//   const [pastes, setPastes] = useState([]);
//   const [createdLink, setCreatedLink] = useState("");

//   useEffect(() => {
//     fetch("/api/pastes")
//       .then((res) => res.json())
//       .then(setPastes);
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const res = await fetch("/api/pastes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content, expire }),
//     });

//     if (!res.ok) return alert("Failed");

//     const { id } = await res.json();
//     setCreatedLink(`${window.location.origin}/p/${id}`);
//     setContent("");
//   }

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Pastebin Lite</h1>

//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write your paste here..."
//           required
//           style={{ height: "180px", width: "100%" }}
//         />

//         <select value={expire} onChange={(e) => setExpire(e.target.value)}>
//           <option value="">Never expire</option>
//           <option value="10m">10 minutes</option>
//           <option value="1h">1 hour</option>
//           <option value="1d">1 day</option>
//         </select>

//         <button type="submit">Create Paste</button>
//       </form>

//       {createdLink && (
//         <div>
//           <p>{createdLink}</p>
//           <button onClick={() => navigator.clipboard.writeText(createdLink)}>
//             Copy Link
//           </button>
//           <Link href={createdLink}><button>Save Paste</button></Link>
//         </div>
//       )}

//       <h2>Recent Pastes</h2>
//       <ul>
//         {pastes.map((p) => (
//           <li key={p.id}>
//             <Link href={`/p/${p.id}`}>
//               {p.content.slice(0, 40)}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

<h1>Pastebin lite</h1>

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
      <h2 style={{ color: "red", textAlign: "center" }}>
  DEPLOY TEST – SHOULD BE RED
</h2>

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
