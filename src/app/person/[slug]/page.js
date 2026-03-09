import { people } from "@/data/people";
import { documents } from "@/data/documents";
import Link from "next/link";
import { createSlug } from "@/lib/slug";
import LivingGate from "@/components/LivingGate";

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

  const siblings = peopleArray.filter(
    p =>
      p.id !== id &&
      ((person.fatherId && p.fatherId === person.fatherId) ||
        (person.motherId && p.motherId === person.motherId))
  );

  const isLiving =
    !person.deathYear &&
    person.birthYear &&
    new Date().getFullYear() - person.birthYear < 120;

  /* UPDATED DOCUMENT FILTER */

  const personDocs = documents
    .filter(doc => doc.personIds && doc.personIds.includes(id))
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
    <LivingGate isLiving={isLiving}>

      <main
        style={{
          maxWidth: "1000px",
          margin: "auto",
          padding: "30px 20px"
        }}
      >

        <Link href="/" style={{ color: "#0077cc" }}>← Home</Link>

        <h1 style={{ marginTop: "25px", marginBottom: "20px" }}>
          {person.firstName} {person.lastName}
        </h1>

        {/* HEADER */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "30px",
            alignItems: "start"
          }}
        >

          {mainPortrait && (
            <img
              src={`/documents/${mainPortrait.fileName}`}
              alt={`${person.firstName} ${person.lastName}`}
              style={{
                width: "100%",
                maxWidth: "260px",
                borderRadius: "10px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)"
              }}
            />
          )}

          <div>

            <p>
              <b>Born:</b> {person.birthYear || "Unknown"}
              {person.birthPlace && ` — ${person.birthPlace}`}
            </p>

            <p>
              <b>Died:</b> {person.deathYear || "—"}
              {person.deathPlace && ` — ${person.deathPlace}`}
            </p>

            {person.occupation && (
              <p>
                <b>Occupation:</b> {person.occupation}
              </p>
            )}

            <div style={{ marginTop: "20px" }}>

              <b>Summary</b>

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

            {person.notes && (
            <div style={{ marginTop: "30px" }}>

                <b>Notes</b>

                <p style={{ whiteSpace: "pre-line" }}>
                {person.notes}
                </p>

            </div>
            )}

        </div>

        {/* RELATIONSHIPS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "30px",
            marginTop: "50px"
          }}
        >

          <div>
            <h3>Parents</h3>

            {father && <p><PersonLink p={father} /></p>}
            {mother && <p><PersonLink p={mother} /></p>}
            {!father && !mother && <p>Unknown</p>}

          </div>

          <div>
            <h3>Spouses</h3>

            {spouses.length === 0 && <p>None listed</p>}

            {spouses.map(s => (
              <p key={s.id}>
                <PersonLink p={s} />
              </p>
            ))}

          </div>

          <div>
            <h3>Children</h3>

            {children.length === 0 && <p>None listed</p>}

            {children.map(c => (
              <p key={c.id}>
                <PersonLink p={c} />
              </p>
            ))}

          </div>

          <div>
            <h3>Siblings</h3>

            {siblings.length === 0 && <p>None listed</p>}

            {siblings.map(s => (
              <p key={s.id}>
                <PersonLink p={s} />
              </p>
            ))}

          </div>

        </div>

        {/* DOCUMENTS */}
        <div style={{ marginTop: "60px" }}>
        <h3>Documents</h3>

        {personDocs.length === 0 && <p>No documents listed.</p>}

        <div
            style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))",
            gap: "20px",
            marginTop: "15px"
            }}
        >
            {personDocs.map(doc => (
            <div key={doc.id} style={{ textAlign: "center" }}>
                {/* Link image to document page */}
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

                <div
                style={{
                    fontSize: "12px",
                    marginTop: "6px",
                    color: "#555"
                }}
                >
                {doc.description}
                </div>

            </div>
            ))}
        </div>
        </div>

      </main>

    </LivingGate>
  );
}