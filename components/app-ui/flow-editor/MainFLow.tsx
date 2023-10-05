import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Dagre from "@dagrejs/dagre";

import {
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import ConnectionLine from "./ConnectionLine";
import { defineNodesTypes } from "./NodeTypes";



const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: any[], edges: any[], options: any) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const initialNodes: any[] = [

];

let id = 0;
const getId = () => `dndnode_${id++}`;






const MainFLow = () => {
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const nodeTypes = useMemo(
    () => (defineNodesTypes),
    []
  );

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      if (reactFlowWrapper && reactFlowWrapper.current && reactFlowInstance) {
        event.preventDefault();

        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance]
  );

  const onLayout = useCallback(
    (direction: any) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );
  return (
    <main className="w-full h-full  ">
      <div className="reactflow-wrapper h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          proOptions={{
            hideAttribution: true,
          }}
          nodeTypes={nodeTypes}
          fitView
          connectionLineComponent={ConnectionLine}
          deleteKeyCode={"Delete"}
          // onNodeClick={}
          minZoom={0.001}
        >
          <Background color="gray" variant={BackgroundVariant.Dots} />
          <Controls className="bg-white" />
          <Panel position="top-right" className="space-x-3">
            <button
              onClick={() => onLayout("TB")}
              className="drop-shadow-md bg-white border px-2 py-1   rounded-md"
            >
              Vertical layout
            </button>
            <button
              onClick={() => onLayout("LR")}
              className="drop-shadow-md bg-white border px-2 py-1   rounded-md"
            >
              horizontal layout
            </button>
          </Panel>
          <Panel position="bottom-right" className="space-y-2 flex flex-col">

            <button className="drop-shadow-md hover:drop-shadow-lg bg-white border p-2.5 rounded-full hover:bg-slate-100   ">
              {" "}
              <BoltIcon className="h-8 w-8 text-orange-400 fill-orange-400" />
            </button>

            <button className="drop-shadow-md hover:drop-shadow-lg bg-white border p-2.5 rounded-full hover:bg-slate-100   ">
              {" "}
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-orange-400 fill-orange-400" />
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </main>
  );
};

export default MainFLow;
