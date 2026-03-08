"use client";

import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

import { people } from "@/data/people";
import PersonNode from "@/components/PersonNode";

const nodeTypes = { person: PersonNode };

const horizontalSpacing = 220;
const verticalSpacing = 160;

const centerId = "1";

function isLiving(person) {
  const currentYear = new Date().getFullYear();

  return (
    !person.deathYear &&
    person.birthYear &&
    currentYear - person.birthYear < 120
  );
}

export default function TreePage() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expanded, setExpanded] = useState(new Set());

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  useEffect(() => {
    const nodes = [];
    const edges = [];
    const visited = new Set();

    function addNode(person, x, y) {
      nodes.push({
        id: person.id,
        type: "person",
        position: { x, y },
        data: {
          person,
          isExpanded: expanded.has(person.id),
          onToggleExpand: toggleExpand,
        },
      });
    }

    function buildTree(personId, x, y) {
      const person = people[personId];
      if (!person || visited.has(personId)) return;

      visited.add(personId);

      addNode(person, x, y);

      if (!expanded.has(personId)) return;

      /* -------- Parents -------- */

      const parents = [person.fatherId, person.motherId].filter(Boolean);

      parents.forEach((pid, i) => {
        const parent = people[pid];
        if (!parent) return;

        const px = x + (i === 0 ? -horizontalSpacing : horizontalSpacing);
        const py = y - verticalSpacing;

        buildTree(pid, px, py);

        edges.push({
          id: `${pid}-${personId}`,
          source: pid,
          target: personId,
          type: "smoothstep",
        });
      });

      /* -------- Spouses -------- */

      if (person.spouseIds) {
        person.spouseIds.forEach((sid, i) => {
          const spouse = people[sid];
          if (!spouse) return;

          const sx = x + (i + 1) * horizontalSpacing;
          const sy = y;

          addNode(spouse, sx, sy);

          edges.push({
            id: `${personId}-${sid}`,
            source: personId,
            target: sid,
            type: "smoothstep",
          });
        });
      }

      /* -------- Children -------- */

      const children = Object.values(people).filter(
        (p) => p.fatherId === personId || p.motherId === personId
      );

      const startX =
        x - ((children.length - 1) * horizontalSpacing) / 2;

      children.forEach((child, i) => {
        const cx = startX + i * horizontalSpacing;
        const cy = y + verticalSpacing;

        if (isLiving(child)) {
          nodes.push({
            id: `private-${child.id}`,
            type: "person",
            position: { x: cx, y: cy },
            data: {
              person: { firstName: "Private", lastName: "Individual" },
              isPrivate: true,
            },
          });

          edges.push({
            id: `${personId}-private-${child.id}`,
            source: personId,
            target: `private-${child.id}`,
          });

          return;
        }

        buildTree(child.id, cx, cy);

        edges.push({
          id: `${personId}-${child.id}`,
          source: personId,
          target: child.id,
          type: "smoothstep",
        });
      });
    }

    buildTree(centerId, 0, 0);

    setNodes(nodes);
    setEdges(edges);
  }, [expanded]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", zIndex: 10, padding: "10px" }}>
        <a href="/" style={{ color: "#0077cc", fontWeight: "bold" }}>
          Home
        </a>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        panOnScroll
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}