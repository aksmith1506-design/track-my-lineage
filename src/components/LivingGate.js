"use client";

import { useState, useEffect } from "react";

export default function LivingGate({ children, isLiving }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");

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
    } else {
      alert("Incorrect password");
    }
  }

  if (!isLiving) return children;

  if (!unlocked) {
    return (
      <main style={{ maxWidth: "800px", margin: "auto", padding: "40px" }}>
        <h1>Private Profile</h1>

        <p>
          This individual may still be living. Enter the family password to
          view the profile.
        </p>

        <form onSubmit={handleUnlock} style={{ marginTop: "20px" }}>
          <input
            type="password"
            placeholder="Family password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginRight: "10px"
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
            View Profile
          </button>
        </form>
      </main>
    );
  }

  return children;
}