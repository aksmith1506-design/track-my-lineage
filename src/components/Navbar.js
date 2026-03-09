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

      {/* Hamburger Button */}
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Nav Links */}
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

        /* Hamburger Styles */
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
          z-index: 1100;
        }

        .hamburger span {
          display: block;
          height: 3px;
          width: 100%;
          background-color: white;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        /* Hamburger animation to X */
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Desktop Links */
        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-links a:hover {
          color: #f0a500;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-links {
            flex-direction: column;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }

          .nav-links.open {
            max-height: 500px; /* large enough to show all links */
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