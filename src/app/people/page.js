"use client";

import { people } from "@/data/people";
import { documents } from "@/data/documents";
import Link from "next/link";
import { createSlug } from "@/lib/slug";
import { useState } from "react";

export default function PeoplePage() {

  const [search, setSearch] = useState("");

  const peopleArray = Object.values(people);

  // helper to find portrait (handles multiple personIds)
  function getPortrait(personId) {
    const personDocs = documents
      .filter(doc => doc.personIds && doc.personIds.includes(personId)) // updated
      .sort((a, b) => b.relevance - a.relevance);

    return personDocs.find(doc =>
      /\.(jpe?g|png|gif|webp)$/i.test(doc.fileName)
    );
  }

  // filter by search
  const filtered = peopleArray.filter(person => {
    const name = `${person.firstName} ${person.lastName}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  // sort alphabetically
  const sorted = filtered.sort((a, b) => {
    const last = a.lastName.localeCompare(b.lastName);
    if (last !== 0) return last;
    return a.firstName.localeCompare(b.firstName);
  });

  // group by surname
  const grouped = {};

  sorted.forEach(person => {
    const surname = person.lastName || "Unknown";

    if (!grouped[surname]) grouped[surname] = [];
    grouped[surname].push(person);
  });

  const surnames = Object.keys(grouped);

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px" }}>

      <h1>People ({sorted.length})</h1>

      {/* SEARCH */}
      <input
        placeholder="Search people..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* ALPHABET NAV */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "30px"
        }}
      >
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
          <a
            key={letter}
            href={`#${letter}`}
            style={{ fontWeight: "bold", textDecoration: "none" }}
          >
            {letter}
          </a>
        ))}
      </div>

      {/* SURNAME SECTIONS */}
      {surnames.map(surname => {

        const firstLetter = surname[0].toUpperCase();

        return (
          <div key={surname} id={firstLetter} style={{ marginBottom: "40px" }}>
            <h2>{surname}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
                gap: "20px"
              }}
            >
              {grouped[surname].map(person => {

                const portrait = getPortrait(person.id);

                return (
                  <Link
                    key={person.id}
                    href={`/person/${createSlug(person)}`}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "12px",
                      display: "flex",
                      gap: "12px",
                      textDecoration: "none",
                      color: "black",
                      background: "#fafafa"
                    }}
                  >
                    {/* PORTRAIT */}
                    {portrait && (
                      <img
                        src={`/documents/${portrait.fileName}`}
                        alt={portrait.description}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px"
                        }}
                      />
                    )}

                    {/* INFO */}
                    <div>
                      <div style={{ fontWeight: "bold" }}>
                        {person.firstName} {person.lastName}
                      </div>

                      <div style={{ fontSize: "13px", color: "#555" }}>
                        {person.birthYear || "?"} – {person.deathYear || ""}
                      </div>
                    </div>
                  </Link>
                );

              })}
            </div>
          </div>
        );

      })}
    </div>
  );
}