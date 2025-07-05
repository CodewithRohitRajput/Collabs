'use client';
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 🔷 Custom Node
function CustomNode({ data }) {
  return (
    <div className="bg-blue-600 text-white rounded p-2 text-center w-40 shadow">
      <Handle type="target" position={Position.Top} />
      <div className="font-semibold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

export default function FlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const handleAddNode = () => {
    const newNode = {
      id: nodeIdCounter.toString(),
      type: 'custom',
      position: { x: 100 + nodeIdCounter * 50, y: 100 },
      data: { label: `Node ${nodeIdCounter}` },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((id) => id + 1);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* 🔘 Add Node Button */}
      <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">🧠 Flow Builder (Level 1)</h1>
        <button
          onClick={handleAddNode}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Add Node
        </button>
      </div>

      {/* 🎯 React Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
