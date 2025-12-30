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

"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [pasteUrl, setPasteUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function createPaste() {
    if (!content.trim()) return;

    setLoading(true);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    if (data.id) {
      const url = `${window.location.origin}/p/${data.id}`;
      setPasteUrl(url);
      setContent("");
    }

    setLoading(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(pasteUrl);
    alert("Link copied!");
  }

  return (
    <main style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1>Pastebin Lite</h1>

      <textarea
        placeholder="Write your paste here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{ width: "100%", padding: "10px" }}
      />

      <br />
      <br />

      <button onClick={createPaste} disabled={loading}>
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {pasteUrl && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Share this link:</strong></p>
          <input
            value={pasteUrl}
            readOnly
            style={{ width: "100%", padding: "8px" }}
          />
          <br />
          <br />
          <button onClick={copyLink}>Copy Link</button>
        </div>
      )}
    </main>
  );
}
