"use client";

import { useState, useEffect } from "react";

export default function LivingGate({ children, isLiving }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
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

  if (!isLiving) return children;

  if (!unlocked) {
    return (
      <div
        style={{
          maxWidth: "500px",
          margin: "60px auto",
          padding: "30px",
          textAlign: "center",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#fafafa"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Private Content</h2>

        <p style={{ color: "#555", fontSize: "15px" }}>
          This content may contain information about living individuals.
          <br />
          Enter the family password to continue.
        </p>

        <form
          onSubmit={handleUnlock}
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px"
          }}
        >
          <input
            type="password"
            placeholder="Family password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              flex: "1",
              minWidth: "160px"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 18px",
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
          <div
            style={{
              color: "red",
              marginTop: "10px",
              fontSize: "14px"
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  }

  return children;
}