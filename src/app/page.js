import Link from "next/link";
import { people } from "@/data/people";
import { documents } from "@/data/documents";
import { createSlug } from "@/lib/slug";

export default function Home() {

  const peopleArray = Object.values(people);

  const featured = peopleArray[0];

  const totalPeople = peopleArray.length;
  const totalDocuments = documents.length;

  return (
    <main style={{ maxWidth: "1000px", margin: "auto", padding: "40px" }}>

      {/* HERO SECTION */}

      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>
          TrackMyLineage.com
        </div>

        <p style={{ fontSize: "18px", color: "#555" }}>
          A public genealogy research archive documenting the history
          of the Smith family and related families across generations.
        </p>
      </div>


      {/* SITE STATS */}

      <div style={{
        display: "flex",
        gap: "40px",
        marginBottom: "40px",
        fontSize: "18px"
      }}>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "24px" }}>
            {totalPeople}
          </div>
          People
        </div>

        <div>
          <div style={{ fontWeight: "bold", fontSize: "24px" }}>
            {totalDocuments}
          </div>
          Documents
        </div>
      </div>


      {/* NAVIGATION CARDS */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "50px"
      }}>

        <Link href="/people" style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          textDecoration: "none",
          color: "black",
          background: "#fafafa"
        }}>
          <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>
            People Index
          </div>
          Browse all individuals in the genealogy archive.
        </Link>


        <Link href="/tree" style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          textDecoration: "none",
          color: "black",
          background: "#fafafa"
        }}>
          <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>
            Family Tree
          </div>
          Explore relationships through the interactive tree.
        </Link>


        <Link href="/about" style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          textDecoration: "none",
          color: "black",
          background: "#fafafa"
        }}>
          <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>
            About This Project
          </div>
          Learn about the purpose and sources of this archive.
        </Link>

      </div>


      {/* FEATURED PERSON */}

      <div>

        <div style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "10px" }}>
          Featured Person
        </div>

        <div style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          background: "#fafafa"
        }}>

          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {featured.firstName} {featured.lastName}
          </div>

          <div style={{ color: "#555", marginTop: "5px" }}>
            {featured.birthYear || "?"} – {featured.deathYear || ""}
          </div>

          <div style={{ marginTop: "10px" }}>
            <Link
              href={`/person/${createSlug(featured)}`}
              style={{ color: "#008cffff" }}
            >
              View profile →
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}