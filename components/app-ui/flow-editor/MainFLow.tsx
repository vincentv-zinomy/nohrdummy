import Dagre from "@dagrejs/dagre";
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Panel,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
import ConnectionLine from "./ConnectionLine";
import { defineNodesTypes } from "./NodeTypes";
import { v4 as uuidv4 } from 'uuid'
import ButtonEdge from "./CustomEdges/ButtonEdge";



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

const edgeType = {
  buttonedge:ButtonEdge
}





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

  const onNodesDelete = useCallback(
    (deleted:  any) => {
      setEdges(
        deleted.reduce((acc: any, node: any ) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
  
          const remainingEdges = acc.filter((edge:Edge) => !connectedEdges.includes(edge));
  
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );
  
          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );
  

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

        console.log(type, 'type')

        if(type==='subNode'){
          
        }

        const temp_id = `${uuidv4()}-${type}`;
        const newNode = {
          id: type === 'usecase' ? `use_case_0` : temp_id,
          type,
          position,
          data: { label: `${type} node` },
        };

      

        setNodes((nds) => nds.concat(newNode));
  


        if (['agents','conversation_agent','payment_agent'].includes(type)){
          
          setEdges((eds) => eds.concat({
            id: `${uuidv4()}-edge__`,
            source: `use_case_0`,
            target: newNode.id,
            sourceHandle: 'usecase-agent',
            targetHandle: 'a',
          }));
        }else if (type === 'crm_node'){
          setEdges((eds) => eds.concat({
            id: `${uuidv4()}-edge__`,
            source: `use_case_0`,
            target: newNode.id,
            sourceHandle: 'usecase-store',
            targetHandle: 'a',
          }));
        }else if(type=== 'converstionAgent'){
          const child_node = {
            id: `dndNode_${Math.floor(Math.random() * 10 ** 10)}`,
            type: 'childCSNode', 
            position: { x:  10 , y: 100 },
            data: { label: "Parent Node", level: 1, column: 1 },
            parentNode: newNode.id,
            extent: "parent",
            draggable: true,
            zIndex: 2000,
          }
          setNodes((nds:any) => nds.concat(child_node))
        }

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
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeType}
          fitView
          // connectionLineComponent={ConnectionLine}
          deleteKeyCode={"Delete"}
          proOptions={{ hideAttribution: true }}
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
