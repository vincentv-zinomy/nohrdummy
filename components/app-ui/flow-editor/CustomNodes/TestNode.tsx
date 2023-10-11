import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  DocumentMagnifyingGlassIcon,
  PhoneIcon,
  RocketLaunchIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRef, useContext, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeToolbar,
  Position,
  useReactFlow,
  applyNodeChanges,
  NodeResizeControl,
  NodeResizer,
  useNodes,
} from "reactflow";
import { handleStyle } from "../NodeTypes";
import { v4 as uuidv4 } from "uuid";

export default function TestNode(props: NodeProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddmodal] = useState(false);
  const { setNodes, getNodes, addNodes, deleteElements, getEdges } =
    useReactFlow();
  const nodes = useNodes();

  const [nodeSize, setNodeSize] = useState({
    width: 1000,
    height: 1000,
  });

  useEffect(() => {
    (() => {
      let max_level = 0;
      let max_column = 0;
      nodes.forEach((node: any) => {
        if (node.parentNode === props.id) {
          if (node.data?.level > max_level) max_level = node.data?.level;
          if (node.data?.column > max_column) max_column = node.data?.column;
        }
      });

      if (max_level > 1 && max_column > 1) {
        console.log("working");
        setNodeSize({
          width: max_column * 400 -50,
          height: max_level * 600  ,
        });
      } else {
        setNodeSize({
          width: max_column > 1 ? max_column * 400 -50 : nodeSize.width,
          height: max_level > 1 ? max_level * 600   : nodeSize.height,
        });
      }
    })();
  }, [nodes.length]);

  const [nodeData, setNodeData] = useState({
    select_contact: "" || props.data?.values?.select_contact,
  });

  const deleteNodes = () => {
    const childNodes = getNodes().filter((x) => x.parentNode === props.id);
    if (childNodes.length > 0) {
      deleteElements({ nodes: [...childNodes, { id: props.id }] });
    } else {
      deleteElements({ nodes: [{ id: props.id }] });
    }
  };

  const addNodesHandler = () => {
    const nodes = getNodes().map((x: any) => {
      delete x.zIndex;
      return { ...x };
    });
    addNodes([
      ...nodes,
      {
        id: `dndNode_${Math.floor(Math.random() * 10 ** 10)}`,
        type: props.type,
        data: props.data,
        position: { x: Number(props.xPos), y: Number(props.yPos + 10) },
        zIndex: 1000,
      },
    ]);
  };

  const handleChange = (e: any) => {
    setNodeData({ ...nodeData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setOpenAddmodal(!openAddModal);
  };

  const AddSubNode = () => {
    const id = uuidv4();

    addNodes({
      id,
      data: { label: "Parent Node", level: 1, column: 1 },
      position: { x: 10, y: 85 },
      parentNode: props.id,
      extent: "parent",
      type: "childNode",
      draggable: true,
      zIndex: 2000,
    });
  };

  return (
    // <Node
    <>
      <div
        className={`border-8 bg-white   rounded-md border-slate-200  ${
          props.selected && " ring-1 ring-slate-900 "
        }`}
        style={{
          width: `${nodeSize.width}px`,
          height: `${nodeSize.height}px`,
        }}
      >
        <div
          className={` node w-full bg-slate-200 border-b border-r border-slate-200  p-5 rounded-br-md   flex items-center  gap-2 relative`}
        >
          <Handle
            type="source"
            position={Position.Left}
            className="w-2.5 h-2.5   border-2 z-10 bg-white border-red-500"
            id="email-source"
            style={{...handleStyle, position:'absolute', left:'-13px'}}
          />
          <Handle
            type="source"
            position={Position.Right}
            className="w-2.5 h-2.5   border-2 z-10 bg-white border-red-500"
            id="email-source"
            style={{...handleStyle, position:'absolute', right:'-13px'}}
          />
          <RocketLaunchIcon className="w-7 h-7" /> Integrations
        </div>
        <button onClick={() => AddSubNode()}>Add Node</button>

        <NodeToolbar
          isVisible={props.data.toolbarVisible}
          position={props.data.toolbarPosition}
          className="border bg-white divide-x text-gray-800  rounded-md flex items-center   justify-center drop-shadow-sm  "
        >
          <button
            onClick={() => deleteNodes()}
            className="p-1.5 flex items-center justify-center"
          >
            <TrashIcon className="w-5 h-5  " />
          </button>
          <button onClick={() => addNodesHandler()} className="p-1.5">
            <DocumentDuplicateIcon className="h-5 w-5 " />
          </button>
          <button
            className="p-1.5"
            onClick={() => setOpenEditModal(!openEditModal)}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5  " />
          </button>
        </NodeToolbar>
     
      </div>
    </>
  );
}
