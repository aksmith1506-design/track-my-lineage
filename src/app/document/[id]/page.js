import { documents } from "@/data/documents";
import { people } from "@/data/people";
import { createSlug } from "@/lib/slug";
import Link from "next/link";

// Let Next.js know all possible dynamic routes
export async function generateStaticParams() {
  return documents.map(doc => ({ id: doc.id }));
}

// Async page to handle Next.js App Router quirk
export default async function DocumentPage({ params }) {
  const { id } = await params; // App Router requires await for async pages sometimes
  const doc = documents.find(d => d.id === id);

  if (!doc) return <div>Document not found</div>;

  const linkedPeople = (doc.personIds || [])
    .map(pid => people[pid])
    .filter(Boolean);

  return (
    <main style={{ maxWidth: "900px", margin: "auto", padding: "30px 20px" }}>
      <Link href="/documents" style={{ color: "#0077cc" }}>← Documents</Link>

      <h1 style={{ marginTop: "20px" }}>{doc.description}</h1>

      <img
        src={`/documents/${doc.fileName}`}
        alt={doc.description}
        style={{
          width: "100%",
          maxHeight: "600px",
          objectFit: "contain",
          borderRadius: "6px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
          marginTop: "20px"
        }}
      />

      {linkedPeople.length > 0 && (
        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <strong>Related People:</strong>{" "}
          {linkedPeople.map((person, i) => (
            <span key={person.id}>
              <Link href={`/person/${createSlug(person)}`} style={{ color: "#0077cc" }}>
                {person.firstName} {person.lastName}
              </Link>
              {i < linkedPeople.length - 1 && ", "}
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: "10px", fontSize: "12px", color: "#555" }}>
        File Name: {doc.fileName} | Type: {doc.type} | Relevance: {doc.relevance}
      </div>
    </main>
  );
}