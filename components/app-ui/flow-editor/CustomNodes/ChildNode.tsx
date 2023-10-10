import { PlusIcon, RocketLaunchIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import {
  Handle,
  Node,
  NodeProps,
  NodeToolbar,
  Position,
  addEdge,
  useReactFlow,
} from "reactflow";
import { handleStyle } from "../NodeTypes";

type Props = {};
import { v4 as uuidv4 } from 'uuid'
import SubNodeAddModal from "../modals/SubNodeAddModal";
import CustomSelelct from "../CustomSelelct";


const ChildNode = (props: NodeProps) => {
  const [show, setShow] = useState(true);
  const { getNode, getNodes, deleteElements, addNodes, addEdges, getEdges, setNodes } = useReactFlow();
  const [openModal, setOpenModal] = useState(false)
  const [nodeData, setNodeData] = useState({
    name: "" || props.data?.values?.name,
    agent_type: "" || props.data?.values?.agent_type,
    description:
      "" || props.data?.values?.description,
    provider:
      "" || props.data?.values?.provider,
    model:
      "" || props.data?.values?.model,
    temperature: "" || props.data?.values?.model,
    max_tokens: 200 || props.data?.values?.max_tokens,
    top_p: "" || props.data?.values?.top_p,
    prompt: "" || props.data?.values?.prompt,
    requirements: "" || props.data?.values?.requirements,
    parameters: "" || props.data?.values?.parameters
  });
  const deleteNodes = (id: string) => {
    const childNodes = getNodes().filter((x) => x.data.parentNode === id);
    if (childNodes.length > 0) {
      childNodes.forEach((node) => {
        deleteNodes(node.id);
      });
    }
    deleteElements({ nodes: [{ id }] });
  };
  
  

  useEffect(()=>{

    if(getNodes().filter((x)=>x.data.parentNode === props.id).length===0){
      setShow(true)
    }else{
      setShow(false)
    }
  },[getEdges(),getNodes(), props])


  const handleClick = () => {
    setShow(false);
    const parent_id = getNode(props.id)?.parentNode;
    const id = uuidv4() 
    const level = props.data.level + 1


    if (getNode(props.id)) {
      const node: any = getNode(props.id);
      const parentNode = getNode(node.parentNode);

      const xPos = props.xPos - (parentNode?.position.x as number);
      const yPos = props.yPos - (parentNode?.position.y as number) + 300;

      addEdges({
        id: `${id}_${parent_id}`,
        source: props.id,
        target: id,
        sourceHandle: "a",
        targetHandle: "b",
        zIndex: 2000,
        type: "buttonedge",
      });


      addNodes({
        id,
        data: { label: "Node B.1", level, parentNode:props.id  },
        position: { x: xPos, y: yPos },
        parentNode: parent_id,
        extent: "parent",
        type: "childNode",
        draggable: true,
        zIndex: 2000,
      });

   
    }
  };

  return (
    <>
    <div className="w-fit  flex   flex-col relative gap-1 items-center">
      <NodeToolbar
        isVisible={props.data.toolbarVisible}
        position={Position.Top}
        className="border bg-white divide-x text-gray-800  rounded-full flex items-center   justify-center drop-shadow-sm "
      >
        <button
          onClick={() => deleteNodes(props.id)}
          className="p-0.5 flex items-center bg-red-500 rounded-full text-white font-bold justify-center"
        >
          <XMarkIcon className="w-4 h-4  " />
        </button>
      </NodeToolbar>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5     border-2 z-10 bg-white border-red-500"
        id="b"
        style={handleStyle}
      />

    
      <div
        className={` border ${props.selected && "border-slate-500"
          }    rounded-md bg-white`}
      >
        <div
          className={` node w-72 bg-slate-50 border-b p-5 rounded-t-md flex items-center gap-2`}
        >
          <RocketLaunchIcon className="w-7 h-7" /> Conversation Agent
        </div>

        <div className="space-y-1 pb-6 relative z-[2000]">
      

          
          <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="agent_type"
            label="Agent Type"
            list={[
              {
                id: 1,
                value: "llm",
                label: "LLM",
              },
              {
                id: 2,
                value: "function",
                label: "Function",
              },
            ]}
          />
          

           




        </div>
      </div>

      {show ? (
        <div className={`flex flex-col ${show ? 'opacity-1' : 'opacity-0'} gap-1 items-center justify-center`}>
          <div className="w-[1px] h-6 bg-black"></div>
          <button
            className="hover:bg-red-100 bg-red-200  h-fit flex flex-col"
            onClick={handleClick}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      ) : 
        <Handle
          type="source"
          position={Position.Bottom}
          className={`w-2.5 h-2.5 ${show ? 'opacity-0' : 'opacity-1'}    border-2 z-10 bg-white border-red-500`}
          id="a"
          style={handleStyle}
        />
      }  
      
    </div>
    <SubNodeAddModal open={openModal} setOpen={setOpenModal}/>
    </>
  );
};

export default ChildNode;
