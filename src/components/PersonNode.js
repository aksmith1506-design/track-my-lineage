import React from "react";
import Link from "next/link";
import { createSlug } from "@/lib/slug";

export default function PersonNode({ data }) {
  const { person, onToggleExpand, isExpanded } = data;

  return (
    <div
      style={{
        padding: "10px",
        border: "2px solid #008cffff",
        borderRadius: "6px",
        backgroundColor: "white",
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "5px" }}>
        <Link href={`/person/${createSlug(person)}`}>
          <b>{person.firstName} {person.lastName}</b>
        </Link>
        <div style={{ fontSize: "12px" }}>{person.birthYear || "?"}</div>
      </div>

      <button
        onClick={() => onToggleExpand(person.id)}
        style={{
          marginTop: "5px",
          fontSize: "12px",
          padding: "2px 6px",
          cursor: "pointer",
        }}
      >
        {isExpanded ? "− Parents" : "+ Parents"}
      </button>
    </div>
  );
}