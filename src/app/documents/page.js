import { documents } from "@/data/documents";
import { people } from "@/data/people";
import Link from "next/link";
import { createSlug } from "@/lib/slug";

export default function DocumentsPage() {
  const docs = [...documents].sort((a, b) => b.relevance - a.relevance);

  return (
    <main style={{ maxWidth: "1100px", margin: "auto", padding: "30px 20px" }}>
      <Link href="/" style={{ color: "#0077cc" }}>← Home</Link>

      <h1 style={{ marginTop: "20px" }}>Documents</h1>

      <p style={{ color: "#555", marginBottom: "30px", maxWidth: "700px" }}>
        A collection of photographs, records, and archival documents related to
        individuals in this genealogy archive.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "25px"
        }}
      >
        {docs.map(doc => {
          const linkedPeople = (doc.personIds || [])
            .map(id => people[id])
            .filter(Boolean);

          return (
            <div key={doc.id} style={{ textAlign: "center" }}>
              {/* Image links to dedicated document page */}
              <Link href={`/document/${doc.id}`}>
                <img
                  src={`/documents/${doc.fileName}`}
                  alt={doc.description}
                  style={{
                    width: "100%",
                    borderRadius: "6px",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                    cursor: "pointer"
                  }}
                />
              </Link>

              <div style={{ fontSize: "13px", marginTop: "8px", fontWeight: "500" }}>
                {doc.description}
              </div>

              {linkedPeople.length > 0 && (
                <div style={{ marginTop: "6px", fontSize: "12px", color: "#555" }}>
                  {linkedPeople.map((person, i) => (
                    <span key={person.id}>
                      <Link
                        href={`/person/${createSlug(person)}`}
                        style={{ color: "#0077cc" }}
                      >
                        {person.firstName} {person.lastName}
                      </Link>
                      {i < linkedPeople.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}