"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { people } from "@/data/people";
import { documents } from "@/data/documents";
import { createSlug } from "@/lib/slug";

const icons = {
people: "👤",
tree: "🌳",
documents: "📄",
about: "ℹ️",
contact: "✉️",
};

export default function Home() {
const peopleArray = Object.values(people);
const totalPeople = peopleArray.length;
const totalDocuments = documents.length;

const [featuredPerson, setFeaturedPerson] = useState(null);

function pickRandomPerson() {
const random =
peopleArray[Math.floor(Math.random() * peopleArray.length)];
setFeaturedPerson(random);
}

useEffect(() => {
pickRandomPerson();
}, []);

const navCards = [
{
title: "People Index",
desc: "Browse all individuals in the genealogy archive.",
href: "/people",
icon: icons.people,
},
{
title: "Family Tree",
desc: "Explore relationships through the interactive tree.",
href: "/tree",
icon: icons.tree,
},
{
title: "Documents",
desc: "View scanned historical documents.",
href: "/documents",
icon: icons.documents,
},
{
title: "About This Project",
desc: "Learn about the purpose and sources of this archive.",
href: "/about",
icon: icons.about,
},
{
title: "Contact Us",
desc: "Get in touch with the research team.",
href: "/contact",
icon: icons.contact,
},
];

return ( <main className="container">

```
  <section className="hero">
    <h1>TrackMyLineage.com</h1>
    <p>
      A public genealogy research archive documenting the history
      of the Smith family and related families across generations.
    </p>
  </section>

  <section className="stats">

    <Link href="/people" className="stat-card">
      <div className="stat-icon">👤</div>
      <div className="stat-number">{totalPeople}</div>
      <div className="stat-label">People</div>
    </Link>

    <Link href="/documents" className="stat-card">
      <div className="stat-icon">📄</div>
      <div className="stat-number">{totalDocuments}</div>
      <div className="stat-label">Documents</div>
    </Link>

  </section>

  <section className="cards">
    {navCards.map((card) => (
      <Link key={card.title} href={card.href}>
        <div className="card">
          <div className="icon-circle">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      </Link>
    ))}
  </section>

  <section className="featured">

    <h2>Featured Person</h2>

    {featuredPerson && (
      <div className="featured-card">

        <div className="featured-name">
          {featuredPerson.firstName} {featuredPerson.lastName}
        </div>

        <div className="featured-dates">
          {featuredPerson.birthYear || "?"} – {featuredPerson.deathYear || ""}
        </div>

        <Link
          href={`/person/${createSlug(featuredPerson)}`}
          className="featured-link"
        >
          View profile →
        </Link>

        <button
          className="refresh-btn"
          onClick={pickRandomPerson}
        >
          🔄 Random Person
        </button>

      </div>
    )}

  </section>

  <style jsx>{`

    .container {
      max-width: 1000px;
      margin: auto;
      padding: 20px;
      font-family: system-ui, sans-serif;
      color: #1f2a35;
    }

    .hero h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .hero p {
      font-size: 1rem;
      color: #555;
    }

    .stats {
      display: flex;
      gap: 15px;
      margin: 25px 0;
    }

    .stat-card {
      flex: 1;
      background: linear-gradient(135deg,#e0f3ff,#fafafa);
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      min-height: 120px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      text-decoration: none;
      color: #1f2a35;

      transition: transform .2s ease, box-shadow .2s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 18px rgba(0,0,0,0.12);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 6px;
    }

    .stat-number {
      font-weight: bold;
      font-size: 1.6rem;
    }

    .stat-label {
      font-size: .95rem;
      color: #555;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;

      background: #fff;
      border: 1px solid #ddd;
      border-radius: 12px;

      padding: 20px;
      min-height: 180px;

      text-decoration: none;
      color: #1f2a35;

      box-shadow: 0 4px 10px rgba(0,0,0,0.08);

      transition: transform .25s ease, box-shadow .25s ease;
    }

    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.12);
    }

    .icon-circle {
      width: 50px;
      height: 50px;

      border-radius: 50%;

      background: #f0f4f8;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    .card h3 {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 6px;
      text-align: center;
    }

    .card p {
      font-size: .9rem;
      color: #555;
      text-align: center;
    }

    .featured {
      margin-top: 40px;
    }

    .featured h2 {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .featured-card {
      border: 1px solid #ddd;
      border-radius: 10px;
      background: #fafafa;
      padding: 20px;
      max-width: 320px;
      text-align: center;
    }

    .featured-name {
      font-weight: bold;
      font-size: 1.1rem;
    }

    .featured-dates {
      color: #555;
      margin-top: 4px;
    }

    .featured-link {
      display: block;
      margin-top: 8px;
      color: #008cff;
      text-decoration: none;
      font-weight: 500;
    }

    .featured-link:hover {
      text-decoration: underline;
    }

    .refresh-btn {
      margin-top: 12px;
      border: none;
      background: #f0f4f8;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: .9rem;
    }

    .refresh-btn:hover {
      background: #e6edf5;
    }

    @media (max-width:500px) {
      .stats {
        flex-direction: column;
      }
      .cards {
        grid-template-columns: 1fr;
      }
    }

  `}</style>

</main>


);
}
