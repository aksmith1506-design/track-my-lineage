"use client";

import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

import { people } from "@/data/people";
import PersonNode from "@/components/PersonNode";
import { buildHierarchy, computeLayout } from "@/lib/treeLayout";

const nodeTypes = { person: PersonNode };

export default function TreePage() {

  const [nodes,setNodes] = useState([]);
  const [edges,setEdges] = useState([]);
  const [expandedNodes,setExpandedNodes] = useState(new Set(["1"]));

  const toggleExpand = (id) => {

    setExpandedNodes(prev => {

      const newSet = new Set(prev);

      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);

      return newSet;

    });

  };

  useEffect(() => {

    const rootHierarchy = buildHierarchy("1", people, expandedNodes);

    const { nodes, edges } = computeLayout(rootHierarchy, toggleExpand, expandedNodes);

    setNodes(nodes);
    setEdges(edges);

  }, [expandedNodes]);

  return (

    <div style={{width:"100vw",height:"100vh"}}>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

    </div>

  );
}