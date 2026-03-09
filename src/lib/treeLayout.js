// src/lib/treeLayout.js

import { hierarchy, tree } from "d3-hierarchy";
import { people } from "@/data/people";

const horizontalSpacing = 300;
const verticalSpacing = 160;

// Build hierarchy recursively using couple nodes
export function buildHierarchy(rootId, people, expandedNodes) {
  if (!(expandedNodes instanceof Set)) expandedNodes = new Set(expandedNodes);

  function buildNode(id) {
    const person = people[id];
    if (!person) return null;

    const children = [];

    // Only include parents if expanded
    if (expandedNodes.has(id)) {
      const parents = [];
      if (person.fatherId && people[person.fatherId]) parents.push(people[person.fatherId]);
      if (person.motherId && people[person.motherId]) parents.push(people[person.motherId]);

      if (parents.length > 0) {
        // Virtual "couple node"
        const coupleNode = {
          id: `couple-${id}`,
          person: null, // invisible
          children: parents.map(p => buildNode(p.id)).filter(Boolean),
          isCouple: true,
          childId: id
        };
        children.push(coupleNode);
      }
    }

    return {
      id: person.id,
      person,
      children
    };
  }

  return hierarchy(buildNode(rootId));
}

// Compute layout for React Flow
export function computeLayout(rootHierarchy, toggleExpand, expandedNodes) {
  const layout = tree().nodeSize([horizontalSpacing, verticalSpacing]);
  const root = layout(rootHierarchy);

  const nodes = [];
  const edges = [];
  const renderedNodeIds = new Set();

  // 1️⃣ First pass: add all real nodes
  root.descendants().forEach(node => {
    if (!node.data.isCouple) {
      nodes.push({
        id: node.data.id,
        type: "person",
        position: { x: node.x, y: -node.y },
        data: {
          person: node.data.person,
          onToggleExpand: toggleExpand,
          isExpanded: expandedNodes.has(node.data.id)
        }
      });
      renderedNodeIds.add(node.data.id);
    }
  });

  // 2️⃣ Second pass: add edges
  root.descendants().forEach(node => {
    if (node.data.isCouple) {
      // Connect each parent to child
      (node.children || []).forEach(parentNode => {
        if (renderedNodeIds.has(parentNode.data.id) && renderedNodeIds.has(node.data.childId)) {
          edges.push({
            id: `edge-${parentNode.data.id}-${node.data.childId}`,
            source: parentNode.data.id,
            target: node.data.childId,
            type: "smoothstep",
            style: { stroke: "#555", strokeWidth: 2 }
          });
        }
      });
    } else {
      // Connect node to children (couple or real)
      (node.children || []).forEach(child => {
        const targetId = child.data.isCouple ? child.data.childId : child.data.id;
        if (renderedNodeIds.has(node.data.id) && renderedNodeIds.has(targetId)) {
          edges.push({
            id: `edge-${node.data.id}-${targetId}`,
            source: node.data.id,
            target: targetId,
            type: "smoothstep",
            style: { stroke: "#555", strokeWidth: 2 }
          });
        }
      });
    }
  });

  return { nodes, edges };
}