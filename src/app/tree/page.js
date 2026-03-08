"use client";

import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { people } from "@/data/people";
import PersonNode from "@/components/PersonNode";

const nodeTypes = { person: PersonNode };
const horizontalSpacing = 180;
const verticalSpacing = 150;

export default function TreePage() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const centerId = "1"; // root person

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Compute subtree width recursively
  const computeSubtreeWidth = (personId) => {
    const person = people[personId];
    if (!person) return 0;
    if (!expandedNodes.has(personId)) return 1;

    const parentWidth =
      (person.fatherId ? computeSubtreeWidth(person.fatherId) : 0) +
      (person.motherId ? computeSubtreeWidth(person.motherId) : 0);

    return Math.max(parentWidth, 1);
  };

  useEffect(() => {
    const newNodes = [];
    const newEdges = [];
    const visited = new Set();

    // Recursive function to place node and children
    const placeNode = (personId, generation = 0, xStart = 0) => {
      const person = people[personId];
      if (!person || visited.has(personId)) return xStart;
      visited.add(personId);

      let x = xStart;

      // 1️⃣ Place parents first if expanded
      if (expandedNodes.has(personId)) {
        const parents = [];
        if (person.fatherId) parents.push(person.fatherId);
        if (person.motherId) parents.push(person.motherId);

        const widths = parents.map((pid) => computeSubtreeWidth(pid));
        const totalWidth = widths.reduce((a, b) => a + b, 0);
        let parentX = x - ((totalWidth - 1) * horizontalSpacing) / 2;

        parents.forEach((pid, index) => {
          const w = widths[index];
          const childCenterX = placeNode(pid, generation - 1, parentX);
          parentX += w * horizontalSpacing;

          newEdges.push({
            id: `edge-${pid}-${person.id}`,
            source: pid,
            target: person.id,
            type: "smoothstep",
            style: { stroke: "#888", strokeWidth: 2 },
          });
        });
      }

      // 2️⃣ Place this node
      newNodes.push({
        id: person.id,
        type: "person",
        position: { x, y: generation * verticalSpacing },
        data: { person, onToggleExpand: toggleExpand, isExpanded: expandedNodes.has(person.id) },
      });

      // 3️⃣ Place spouses to the right
      if (person.spouseIds && person.spouseIds.length > 0) {
        person.spouseIds.forEach((spouseId, index) => {
          const spouse = people[spouseId];
          if (!spouse || visited.has(spouse.id)) return;

          newNodes.push({
            id: spouse.id,
            type: "person",
            position: { x: x + (index + 1) * horizontalSpacing, y: generation * verticalSpacing },
            data: { person: spouse, onToggleExpand: toggleExpand, isExpanded: expandedNodes.has(spouse.id) },
          });

          newEdges.push({
            id: `spouse-${person.id}-${spouse.id}`,
            source: person.id,
            target: spouse.id,
            type: "smoothstep",
            style: { stroke: "#888", strokeWidth: 2 },
          });
        });
      }

      // 4️⃣ Place children centered under the parent
      const children = Object.values(people).filter(
        (p) => p.fatherId === person.id || p.motherId === person.id
      );

      if (children.length > 0) {
        const totalChildrenWidth = children.length * horizontalSpacing;
        let childX = x - totalChildrenWidth / 2 + horizontalSpacing / 2;

        children.forEach((child) => {
          placeNode(child.id, generation + 1, childX);

          newEdges.push({
            id: `edge-${person.id}-${child.id}`,
            source: person.id,
            target: child.id,
            type: "smoothstep",
            style: { stroke: "#888", strokeWidth: 2 },
          });

          childX += horizontalSpacing;
        });
      }

      return x;
    };

    placeNode(centerId, 0, 0);

    setNodes(newNodes);
    setEdges(newEdges);
  }, [expandedNodes]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", zIndex: 10, padding: "10px" }}>
        <a href="/" style={{ color: "#008cffff", fontWeight: "bold" }}>
          Home
        </a>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
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