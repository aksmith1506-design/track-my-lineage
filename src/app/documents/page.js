"use client";

import { useState } from "react";
import { documents } from "@/data/documents";
import { people } from "@/data/people";
import Link from "next/link";
import { createSlug } from "@/lib/slug";
import LivingGate from "@/components/LivingGate";

export default function DocumentsPage() {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const docs = [...documents].sort((a, b) => b.relevance - a.relevance);

  // Automatically detect document types
  const docTypes = [...new Set(documents.map(doc => doc.type))];

  function isLiving(person) {
    return (
      !person.deathYear &&
      person.birthYear &&
      new Date().getFullYear() - person.birthYear < 120
    );
  }

  const filteredDocs = docs.filter(doc => {

    const matchesSearch =
      doc.description.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      !typeFilter || doc.type === typeFilter;

    return matchesSearch && matchesType;

  });

  return (
    <main style={{ maxWidth: "1100px", margin: "auto", padding: "30px 20px" }}>

      <Link href="/" style={{ color: "#0077cc" }}>← Home</Link>

      <h1 style={{ marginTop: "20px" }}>Documents</h1>

      <p style={{ color: "#555", marginBottom: "25px", maxWidth: "700px" }}>
        A collection of photographs, records, and archival documents related to
        individuals in this genealogy archive.
      </p>

      {/* SEARCH + FILTER */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "30px"
        }}
      >

        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "180px"
          }}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >

          <option value="">All Types</option>

          {docTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}

        </select>

      </div>

      {/* DOCUMENT GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "25px"
        }}
      >

        {filteredDocs.map(doc => {

          const linkedPeople = (doc.personIds || [])
            .map(id => people[id])
            .filter(Boolean);

          const hasLivingPerson = linkedPeople.some(p => isLiving(p));

          return (

            <LivingGate key={doc.id} isLiving={hasLivingPerson}>

              <div style={{ textAlign: "center" }}>

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

                {/* Document description */}

                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "8px",
                    fontWeight: "500"
                  }}
                >
                  {doc.description}
                </div>

                {/* Document type */}

                <div
                  style={{
                    fontSize: "11px",
                    color: "#777",
                    marginTop: "3px"
                  }}
                >
                  {doc.type}
                </div>

                {/* Linked people */}

                {linkedPeople.length > 0 && (
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "12px",
                      color: "#555"
                    }}
                  >

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

            </LivingGate>

          );

        })}

      </div>

    </main>
  );
}