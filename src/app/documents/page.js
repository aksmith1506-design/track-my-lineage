import { documents } from "@/data/documents";
import { people } from "@/data/people";
import Link from "next/link";
import { createSlug } from "@/lib/slug";

export default function DocumentsPage() {

  const docs = [...documents].sort((a, b) => b.relevance - a.relevance);

  return (
    <main style={{ maxWidth: "1100px", margin: "auto", padding: "40px" }}>

      <Link href="/" style={{ color: "#0077cc" }}>
        ← Home
      </Link>

      <h1 style={{ marginTop: "20px" }}>Documents</h1>

      <p style={{ color: "#555", marginBottom: "30px" }}>
        A collection of photographs, records, and archival documents related to
        individuals in this genealogy archive.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,180px)",
        gap: "25px"
      }}>

        {docs.map(doc => {

          const person = people[doc.personId];

          return (
            <div key={doc.id} style={{ textAlign: "center" }}>

              <img
                src={`/documents/${doc.fileName}`}
                style={{
                  width: "180px",
                  borderRadius: "6px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.25)"
                }}
              />

              <div style={{
                fontSize: "13px",
                marginTop: "8px"
              }}>
                {doc.description}
              </div>

              {person && (
                <div style={{
                  marginTop: "4px",
                  fontSize: "12px"
                }}>
                  <Link
                    href={`/person/${createSlug(person)}`}
                    style={{ color: "#0077cc" }}
                  >
                    {person.firstName} {person.lastName}
                  </Link>
                </div>
              )}

            </div>
          );

        })}

      </div>

    </main>
  );
}