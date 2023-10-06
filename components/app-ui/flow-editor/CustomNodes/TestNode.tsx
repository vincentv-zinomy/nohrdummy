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
import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";
import { handleStyle } from "../NodeTypes";

export default function TestNode(props: any) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddmodal] = useState(false);
  const { setNodes, getNodes, addNodes, deleteElements } = useReactFlow();

  const [nodeData, setNodeData] = useState({
    select_contact: "" || props.data?.values?.select_contact,
  });

  const deleteNodes = () => {
    const childNodes = getNodes().filter((x)=>x.parentNode===props.id)
     if(childNodes.length > 0){
      deleteElements({nodes:[...childNodes, {id:props.id}]})
     }else{
      deleteElements({nodes:[{id:props.id}]})
     }
  };

  // console.log(props, 'props')

  useEffect(()=>{
    AddSubNode()
  },[])

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
        position: { x: Number(props.xPos + 10), y: Number(props.yPos + 10) },
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
    const id = String(Math.floor(Math.random()*100**2))
     
    addNodes(

      {
        id,
        data: { label: 'Node B.1' },
        position: { x: 15, y: 65 },
        parentNode: props.id,
        extent: 'parent',
        type:'childNode',
        draggable:true,
        zIndex:2000
      }
    )
  }

  return (
    <div className="border w-[600px] h-[600px] bg-white" >
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
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5     border-2 z-10 bg-white border-red-500"
        id="email-source"
        style={handleStyle}
      />

        <button onClick={()=>AddSubNode()}>Add Node</button>
    </div>
  );
}
