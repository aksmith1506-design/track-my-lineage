"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">TrackMyLineage.com</Link>
      </div>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link href="/">Home</Link>
        <Link href="/tree">Tree</Link>
        <Link href="/people">People</Link>
        <Link href="/documents">Documents</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/privacy">Privacy</Link>
      </div>

      <style jsx>{`
        nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: #1f2a35;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          flex-wrap: wrap;
          color: white;
        }

        .logo a {
          font-weight: bold;
          font-size: 18px;
          color: white;
          text-decoration: none;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 25px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hamburger span {
          display: block;
          height: 3px;
          width: 100%;
          background-color: white;
          border-radius: 2px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-links {
            flex-direction: column;
            width: 100%;
            display: none;
            margin-top: 10px;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-links a {
            padding: 10px 0;
            border-top: 1px solid #2f3a45;
          }
        }
      `}</style>
    </nav>
  );
}