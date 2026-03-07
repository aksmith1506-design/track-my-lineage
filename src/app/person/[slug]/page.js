import { people } from "@/data/people";
import Link from "next/link";
import { createSlug } from "@/lib/slug";
import { documents } from "@/data/documents";

export default async function PersonPage({ params }) {

  const { slug } = await params;
  const id = slug.split("-").pop();

  const person = people[id];

  if (!person) {
    return <div style={{ padding: "40px" }}>Person not found</div>;
  }

  const peopleArray = Object.values(people);

  const father = person.fatherId ? people[person.fatherId] : null;
  const mother = person.motherId ? people[person.motherId] : null;

  const spouses = person.spouseIds
    ? person.spouseIds.map(id => people[id]).filter(Boolean)
    : [];

  const children = peopleArray.filter(
    p => p.fatherId === id || p.motherId === id
  );

  const siblings = peopleArray.filter(p =>
    p.id !== id &&
    (
      (person.fatherId && p.fatherId === person.fatherId) ||
      (person.motherId && p.motherId === person.motherId)
    )
  );

  const personDocs = documents
    .filter(doc => doc.personId === id)
    .sort((a, b) => b.relevance - a.relevance);

  const mainPortrait = personDocs.find(doc =>
    /\.(jpe?g|png|gif|webp)$/i.test(doc.fileName)
  );

  function PersonLink({ p }) {
    return (
      <Link href={`/person/${createSlug(p)}`} style={{ color: "#0077cc" }}>
        {p.firstName} {p.lastName}
      </Link>
    );
  }

  return (
    <main style={{ maxWidth: "1000px", margin: "auto", padding: "40px" }}>

      <Link href="/" style={{ color: "#0077cc" }}>← Home</Link>

      {/* HEADER */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: "40px",
        marginTop: "25px"
      }}>

        {/* PORTRAIT */}

        <div>
          {mainPortrait && (
            <img
              src={`/documents/${mainPortrait.fileName}`}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)"
              }}
            />
          )}
        </div>

        {/* BASIC INFO */}

        <div>

          <h1 style={{ marginBottom: "10px" }}>
            {person.firstName} {person.lastName}
          </h1>

          <p>
            <b>Born:</b> {person.birthYear || "Unknown"}
            {person.birthPlace && ` — ${person.birthPlace}`}
          </p>

          <p>
            <b>Died:</b> {person.deathYear || "—"}
            {person.deathPlace && ` — ${person.deathPlace}`}
          </p>

          {person.occupation && (
            <p><b>Occupation:</b> {person.occupation}</p>
          )}

          {/* SUMMARY */}

          <div style={{ marginTop: "20px" }}>
            <h3>Summary</h3>

            <p>

              {person.firstName} {person.lastName}

              {person.birthYear && ` was born in ${person.birthYear}`}
              {person.birthPlace && ` in ${person.birthPlace}`}

              {(father || mother) && " to "}

              {father && <PersonLink p={father} />}

              {father && mother && " and "}

              {mother && <PersonLink p={mother} />}

              {spouses.length > 0 && (
                <>
                  {`. `}
                  {person.firstName} married{" "}

                  {spouses.map((s, i) => (
                    <span key={s.id}>
                      <PersonLink p={s} />
                      {i < spouses.length - 1 && ", "}
                    </span>
                  ))}
                </>
              )}

              {person.deathYear && (
                <>
                  {`. `}
                  {person.firstName} died in {person.deathYear}
                  {person.deathPlace && ` in ${person.deathPlace}`}.
                </>
              )}

            </p>

          </div>

        </div>

      </div>

      {/* RELATIONSHIPS */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: "30px",
        marginTop: "50px"
      }}>

        {/* PARENTS */}

        <div>
          <h3>Parents</h3>

          {father && <p><PersonLink p={father} /></p>}
          {mother && <p><PersonLink p={mother} /></p>}

          {!father && !mother && <p>Unknown</p>}
        </div>

        {/* SPOUSES */}

        <div>
          <h3>Spouses</h3>

          {spouses.length === 0 && <p>None listed</p>}

          {spouses.map(s => (
            <p key={s.id}><PersonLink p={s} /></p>
          ))}
        </div>

        {/* CHILDREN */}

        <div>
          <h3>Children</h3>

          {children.length === 0 && <p>None listed</p>}

          {children.map(c => (
            <p key={c.id}><PersonLink p={c} /></p>
          ))}
        </div>

        {/* SIBLINGS */}

        <div>
          <h3>Siblings</h3>

          {siblings.length === 0 && <p>None listed</p>}

          {siblings.map(s => (
            <p key={s.id}><PersonLink p={s} /></p>
          ))}
        </div>

      </div>

      {/* DOCUMENTS */}

      <div style={{ marginTop: "60px" }}>

        <h3>Documents</h3>

        {personDocs.length === 0 && <p>No documents listed.</p>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,140px)",
          gap: "20px",
          marginTop: "15px"
        }}>

          {personDocs.map(doc => (

            <div key={doc.id} style={{ textAlign: "center" }}>

              <img
                src={`/documents/${doc.fileName}`}
                style={{
                  width: "140px",
                  borderRadius: "6px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.25)"
                }}
              />

              <div style={{
                fontSize: "12px",
                marginTop: "6px",
                color: "#555"
              }}>
                {doc.description}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* NOTES */}

      <div style={{ marginTop: "50px" }}>
        <h3>Notes</h3>
        <p>{person.notes || "No notes listed."}</p>
      </div>

    {/* CONTACT CALLOUT */}

    <div
    style={{
        marginTop: "60px",
        padding: "20px",
        background: "#f7f7f7",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        fontSize: "16px"
    }}
    >
    <b>Think you're related?</b>{" "}
    If you believe you may be connected to this person or have additional
    information, photographs, or documents to share, please{" "}
    <Link href="/contact" style={{ color: "#0077cc", fontWeight: "bold" }}>
        reach out
    </Link>.
    </div>

      {/* SOURCES */}

      <div style={{ marginTop: "40px" }}>
        <h3>Sources</h3>

        {person.sources?.length ? (
          <ul>
            {person.sources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p>No sources listed.</p>
        )}

      </div>

    </main>
  );
}