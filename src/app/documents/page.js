"use client";

import { useState, useEffect } from "react";
import { documents } from "@/data/documents";
import { people } from "@/data/people";
import Link from "next/link";
import { createSlug } from "@/lib/slug";

export default function DocumentsPage() {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const correctPassword =
    process.env.NEXT_PUBLIC_LIVING_PASSWORD || "family";

  useEffect(() => {
    const saved = localStorage.getItem("livingUnlocked");
    if (saved === "true") setUnlocked(true);
  }, []);

  function handleUnlock(e) {
    e.preventDefault();

    if (password === correctPassword) {
      localStorage.setItem("livingUnlocked", "true");
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  function isLiving(person) {
    return (
      !person.deathYear &&
      person.birthYear &&
      new Date().getFullYear() - person.birthYear < 120
    );
  }

  const docs = [...documents].sort((a, b) => b.relevance - a.relevance);

  const docTypes = [...new Set(documents.map(doc => doc.type))];

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

      {/* PASSWORD BOX */}

      {!unlocked && (
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa"
          }}
        >

          <h3 style={{ marginBottom: "5px" }}>Family Access</h3>

          <p style={{ fontSize: "14px", color: "#555" }}>
            Some documents may include living individuals.
            Enter the family password to view them.
          </p>

          <form
            onSubmit={handleUnlock}
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >

            <input
              type="password"
              placeholder="Family password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                flex: "1",
                minWidth: "160px"
              }}
            />

            <button
              type="submit"
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#0077cc",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Unlock
            </button>

          </form>

          {error && (
            <div style={{ color: "red", marginTop: "8px", fontSize: "13px" }}>
              {error}
            </div>
          )}

        </div>
      )}

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

          if (hasLivingPerson && !unlocked) {
            return (
              <div
                key={doc.id}
                style={{
                  textAlign: "center",
                  opacity: 0.4
                }}
              >

                <img
                  src={`/documents/${doc.fileName}`}
                  style={{
                    width: "100%",
                    borderRadius: "6px",
                    filter: "blur(6px)"
                  }}
                />

                <div style={{ fontSize: "12px", marginTop: "8px" }}>
                  🔒 Locked (Living Individual)
                </div>

              </div>
            );
          }

          return (
            <div key={doc.id} style={{ textAlign: "center" }}>

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
                  fontSize: "13px",
                  marginTop: "8px",
                  fontWeight: "500"
                }}
              >
                {doc.description}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#777",
                  marginTop: "3px"
                }}
              >
                {doc.type}
              </div>

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
          );

        })}

      </div>

    </main>
  );
}