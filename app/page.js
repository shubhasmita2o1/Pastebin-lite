// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className={styles.intro}>
//           <h1>To get started, edit the page.js file.</h1>
//           <p>
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className={styles.secondary}
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

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

//   // ✅ Fetch recent pastes
//   useEffect(() => {
//     async function loadPastes() {
//       const res = await fetch("/api/pastes", { cache: "no-store" });
//       const data = await res.json();
//       setPastes(data);
//     }

//     loadPastes();
//   }, []);

//   // ✅ Create paste
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [pastes, setPastes] = useState([]);
  const [createdLink, setCreatedLink] = useState("");

  // Fetch recent pastes
  useEffect(() => {
    fetch("/api/pastes", { cache: "no-store" })
      .then((res) => res.json())
      .then(setPastes);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      alert("Failed to create paste");
      return;
    }

    const { id } = await res.json();
    const link = `${window.location.origin}/p/${id}`;

    setCreatedLink(link);
    setContent("");
  }

  function copyLink() {
    navigator.clipboard.writeText(createdLink);
    alert("Link copied!");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Pastebin Lite</h1>

      {/* Create Paste */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your paste here..."
          required
          style={{ height: "180px", padding: "1rem" }}
        />

        <button type="submit">Create Paste</button>
      </form>

      {/* Created link */}
      {createdLink && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#111",
            borderRadius: "6px",
          }}
        >
          <p>Paste created:</p>
          <code style={{ wordBreak: "break-all" }}>{createdLink}</code>

          <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem" }}>
            <button onClick={copyLink}>Copy Link</button>
            <Link href={createdLink}>
              <button>Save Paste</button>
            </Link>
          </div>
        </div>
      )}

      {/* Recent Pastes */}
      <h2 style={{ marginTop: "2rem" }}>Recent Pastes</h2>

      {pastes.length === 0 && <p>No pastes yet</p>}

      <ul>
        {pastes.map((paste) => (
          <li key={paste.id}>
            <Link href={`/p/${paste.id}`}>
              {paste.content.slice(0, 50)}
              {paste.content.length > 50 && "..."}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
