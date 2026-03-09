import Link from "next/link";
import { createSlug } from "@/lib/slug";
import { documents } from "@/data/documents";

function getBestPhoto(personId) {
  const photos = documents
    .filter(d => d.type === "photo" && d.personIds.includes(personId))
    .sort((a, b) => b.relevance - a.relevance);

  return photos[0] || null;
}

export default function PersonNode({ data }) {
  const { person, onToggleExpand, isExpanded } = data;

  if (!person) return null;

  const slug = createSlug(person);
  const photo = getBestPhoto(person.id);

  const imageSrc = photo
    ? `/documents/${photo.fileName}`
    : "/images/default-person.png";

  return (
    <div
      style={{
        width: "170px",
        background: "white",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e2e2e2",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontFamily: "system-ui, sans-serif",
        transition: "transform 0.15s ease"
      }}
    >

      <Link href={`/person/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>

        <div
          style={{
            width: "100%",
            height: "120px",
            overflow: "hidden",
            background: "#f2f2f2"
          }}
        >
          <img
            src={imageSrc}
            alt={person.firstName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>

        <div style={{ padding: "10px" }}>

          <div
            style={{
              fontWeight: 600,
              fontSize: "14px",
              textAlign: "center"
            }}
          >
            {person.firstName} {person.lastName}
          </div>

          {(person.birthYear || person.deathYear) && (
            <div
              style={{
                fontSize: "12px",
                opacity: 0.7,
                textAlign: "center",
                marginTop: "2px"
              }}
            >
              {person.birthYear || "?"} – {person.deathYear || ""}
            </div>
          )}

        </div>

      </Link>

      <div style={{ padding: "0 10px 10px 10px", textAlign: "center" }}>
        <button
          onClick={() => onToggleExpand(person.id)}
          style={{
            fontSize: "11px",
            padding: "3px 8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#fafafa",
            cursor: "pointer"
          }}
        >
          {isExpanded ? "Hide Parents" : "Show Parents"}
        </button>
      </div>

    </div>
  );
}