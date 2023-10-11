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
import { v4 as uuidv4 } from 'uuid'
import SubNodeAddModal from "../modals/SubNodeAddModal";
import CustomSelelct from "../CustomSelelct";
import AppSelect from "./SubFlow/components/AppSelect";
import TextInputComp from "../InputComponents/TextInputComp";
import NumberInputComp from "../InputComponents/NumberInputCompt";

 
  const inputs = [
      {
          "type": "array",
          "exampleValue": [],
          "label": "calendar_events",
          "input_type": "DATA_DISPLAY"
      },
      {
          "type": "string",
          "exampleValue": "Asia/Kolkata",
          "label": "time_zone",
          "input_type": "DROPDOWN",
          "choices": ["Asia/Kolkata", "Asia/Singapore", "Europe/London", "America/New_York"]
      },
      {
          "type": "number",
          "exampleValue": 9,
          "label": "schedule_from_time",
          "input_type": "NUMBER_INPUT"
      },
      {
          "type": "number",
          "exampleValue": 17,
          "label": "schedule_to_time",
          "input_type": "NUMBER_INPUT"
      },
      {
          "type": "array",
          "exampleValue": ["Monday", "Tuesday"],
          "label": "schedule_days",
          "input_type": "MULTI_SELECT_DROPDOWN",
          "choices": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      {
          "type": "number",
          "exampleValue": 7,
          "label": "schedule_interval",
          "input_type": "NUMBER_INPUT"
      },
      {
          "type": "number",
          "exampleValue": 30,
          "label": "interview_timeslot_minutes",
          "input_type": "NUMBER_INPUT"
      }
  ]
 
 


const ChildNode = (props: NodeProps) => {
  const [show, setShow] = useState(true);
  const { getNode, getNodes, deleteElements, addNodes, addEdges, getEdges, setNodes } = useReactFlow();
  const [openModal, setOpenModal] = useState(false)
  

  const [nodeData, setNodeData] = useState({
    agent_type: "" || props.data?.values?.agent_type,
    parameters: "" || props.data?.values?.parameters,
    app:"" || props.data.values?.app,
    function:"" || props.data.values?.function,
    name:"" || props.data.values?.name,
    number:""|| props.data.values?.number
  });

  console.log(nodeData.function, 'function')
  const deleteNodes = (id: string) => {
    const childNodes = getNodes().filter((x) => x.data.parentNode === id);
    if (childNodes.length > 0) {
      childNodes.forEach((node) => {
        deleteNodes(node.id);
      });
    }
    deleteElements({ nodes: [{ id }] });
  };
  
  
  const handleChange = (e: any) => {
    setNodeData({ ...nodeData, [e.target.name]: e.target.value });
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
    console.log(level, 'level')

    if (getNode(props.id)) {
      const node: any = getNode(props.id);
      const parentNode = getNode(node.parentNode);

      const xPos = props.xPos - (parentNode?.position.x as number);
      const yPos = props.yPos - (parentNode?.position.y as number) + 600;

      addEdges({
        id: `${id}_${parent_id}`,
        source: props.id,
        target: id,
        sourceHandle: "a",
        targetHandle: "b",
        zIndex: 2000,
        type: "buttonedge",
      });

      setNodes((nodes)=>nodes.map((node)=>{
        if(node.id===parent_id){
          node.data.max_level = level
        }
        return node
      }))

      addNodes({
        id,
        data: { label: "Node B.1", level, parentNode:props.id,column:props.data.column  },
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
 
      {props.data.level !== 1 &&
        <Handle
          type="target"
          position={Position.Top}
          className="w-2.5 h-2.5     border-2 z-10 bg-white border-red-500"
          id="b"
          style={handleStyle}
        />
      }

    
      <div
        className={` border ${props.selected && "border-slate-500"
          }    rounded-md bg-white`}
      >
        <div
          className={` node w-[300px] bg-slate-50 border-b p-4 rounded-t-md flex items-center gap-2`}
        >
           
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
                value: "APP/Integration",
                label: "APP/Integration",
              },
              {
                id: 2,
                value: "Custom Function",
                label: "Custom Function",
              },
              {
                id: 3,
                value: "LLM",
                label: "LLM",
              },
              {
                id: 4,
                value: "Response Channel",
                label: "Response Channel",
              },
            ]}
          />
          <AppSelect/>
          
        
          <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="function"
            label="Action"
            list={[
              {
                id: 1,
                value: "llm",
                label: "Create Google Calendar Event",
              },
              {
                id: 2,
                value: "function",
                label: "Function",
              },
            ]}
          />
          

           
            {nodeData.function === 'function' && 

              <>
                {inputs.map((input:any)=>{
                  return (
                    <>
                      {input.type === 'string'
                      &&
                        <TextInputComp
                        name={'name'}
                        value={nodeData.name}
                        label={'Agent Name'}
                        handleChange={handleChange}
                      />
                      }
                       {input.type === "number" && (
                            <NumberInputComp
                              label={input.label}
                              name={'number'}
                              handleChange={handleChange}
                              value={nodeData.number}
                            />
                          )}

                    </>
                  )
                })}
              </>
            }



        </div>
      </div>
      {
        props.selected && 
        <button
        onClick={() => deleteNodes(props.id)}
        className="p-0.5 flex items-center bg-slate-400 hover:bg-slate-600 rounded-full absolute text-white font-bold justify-center right-2 top-2"
      >
        <XMarkIcon className="w-4 h-4  " />
      </button>
      }
      {show ? (
        <div className={`flex flex-col ${show ? 'opacity-1' : 'opacity-0'} gap-1 items-center justify-center`}>
          <div className="w-[1px] h-6 bg-black"></div>
          <button
            className="hover:bg-slate-300 text-black rounded-full border border-slate-600 bg-slate-100 h-fit flex flex-col"
            onClick={handleClick}
          >
            <PlusIcon className="w-5 h-5 text-black" />
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
