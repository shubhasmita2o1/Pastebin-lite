// import { notFound } from "next/navigation";

// export default async function PastePage(props) {
//   const id = props.params.id;

//   const baseUrl =
//     process.env.NEXT_PUBLIC_BASE_URL || "https://pastebinlite-mauve.vercel.app";

//   const res = await fetch(`${baseUrl}/api/pastes/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     notFound();
//   }

//   const paste = await res.json();

//   return (
//     <main style={{ padding: "2rem" }}>
//       <h1>Paste</h1>
//       <pre
//         style={{
//           background: "#111",
//           color: "#0f0",
//           padding: "1rem",
//           borderRadius: "6px",
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         {paste.content}
//       </pre>
//     </main>
//   );
// }

// import { notFound } from "next/navigation";

// export default async function PastePage({ params }) {
//   const { id } = await params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/pastes/${id}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) notFound();

//   const paste = await res.json();

//   return (
//     <main style={{ padding: "2rem" }}>
//       <h1>Paste</h1>
//       <pre
//         style={{
//           background: "#111",
//           color: "#0f0",
//           padding: "1rem",
//           borderRadius: "6px",
//         }}
//       >
//         {paste.content}
//       </pre>
//     </main>
//   );
// }

// import { notFound } from "next/navigation";

// export default async function PastePage({ params }) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/pastes/${params.id}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) notFound();

//   const paste = await res.json();

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Paste</h1>
//       <pre
//         style={{
//           background: "#111",
//           padding: "1rem",
//           borderRadius: "6px",
//           color: "#0f0",
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         {paste.content}
//       </pre>
//     </main>
//   );
// }

// import { notFound } from "next/navigation";

// export default async function PastePage({ params }) {
//   const { id } = params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/pastes/${id}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     notFound();
//   }

//   const paste = await res.json();

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Paste</h1>

//       <pre
//         style={{
//           background: "#111",
//           color: "#0f0",
//           padding: "1rem",
//           borderRadius: "6px",
//           overflowX: "auto",
//         }}
//       >
//         {paste.content}
//       </pre>

//       {paste.expires_at && (
//         <p style={{ marginTop: "1rem", opacity: 0.7 }}>
//           Expires at: {new Date(paste.expires_at).toLocaleString()}
//         </p>
//       )}
//     </main>
//   );
// }

// import { notFound } from "next/navigation";

// export default async function PastePage({ params }) {
//   const { id } = params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/pastes/${id}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     notFound();
//   }

//   const paste = await res.json();

//   return (
//     <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
//       <h1>Paste</h1>

//       <pre
//         style={{
//           background: "#111",
//           color: "#0f0",
//           padding: "1rem",
//           borderRadius: "6px",
//           overflowX: "auto",
//         }}
//       >
//         {paste.content}
//       </pre>

//       {paste.expires_at && (
//         <p style={{ marginTop: "1rem", opacity: 0.7 }}>
//           Expires at: {new Date(paste.expires_at).toLocaleString()}
//         </p>
//       )}
//     </main>
//   );
// }

import { notFound } from "next/navigation";

export default async function PastePage({ params }) {
  const { id } = await params; // ✅ FIX

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
          color: "#f0f0f0",
          padding: "1rem",
          borderRadius: "6px",
          overflowX: "auto",
        }}
      >
        {paste.content}
      </pre>

      {paste.expires_at && (
        <p style={{ marginTop: "1rem", opacity: 0.7 }}>
          Expires at: {new Date(paste.expires_at).toLocaleString()}
        </p>
      )}
    </main>
  );
}
