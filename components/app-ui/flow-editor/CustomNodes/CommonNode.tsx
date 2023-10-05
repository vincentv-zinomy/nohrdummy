import {
    AdjustmentsHorizontalIcon,
    ArrowTopRightOnSquareIcon,
    DocumentDuplicateIcon,
    RocketLaunchIcon,
    TrashIcon,
  } from "@heroicons/react/24/outline";
  import { useRef, useEffect, useState } from "react";
  import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";
  import CustomSelelct from "../CustomSelelct";
  import { InputType, handleStyle } from "../NodeTypes";
  import EditTextModal from "../EditTextModal";
  
  
  const arrToObj = (array:InputType[]) => {
      const obj:any = {}
      for (let index = 0; index < array.length; index++) {
          const element = array[index];
          obj[element.name] = element.value
      }
      return obj
  }
  
  export default function CommonNode(props: any) {
    
    const { setNodes, getNodes } = useReactFlow();
  
    const [openTextModal, setOpenTextModal] = useState(false)
    const [textModalContent, setTextModalContent] = useState<any>()
  
    const divRef = useRef<HTMLDivElement>(null);
  
   
  
    const [nodeData, setNodeData] = useState( props.data?.values || arrToObj(props.inputs));
  
  
    useEffect(() => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            node.data.values = nodeData;
          }
          return node;
        })
      );
    }, [nodeData]);
  
    const handleChange = (e: any) => {
      // console.log(e.target.value)
      setNodeData({ ...nodeData, [e.target.name]: e.target.value });
    };
  
    const deleteNodes = () => {
      const nodesleft = getNodes().filter((x) => x.id !== props.id);
      setNodes(nodesleft);
    };
  
    const addNodesHandler = () => {
      const nodes = getNodes().map((x: any) => {
        delete x.zIndex;
        return { ...x };
      });
      setNodes([
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
  
    return (
      <>
        <NodeToolbar
          isVisible={props.data.toolbarVisible}
          position={props.data.toolbarPosition}
          className="border bg-white divide-x text-gray-800  rounded-md flex items-center   justify-center drop-shadow-sm"
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
            onClick={() =>  {}}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5  " />
          </button>
        </NodeToolbar>
  
        <Handle
          type="source"
          position={Position.Right}
          className="w-2.5 h-2.5 border-2 z-10 bg-white border-red-500"
          style={handleStyle}
          id="a"
        />
        <Handle
          type="target"
          position={Position.Left}
          className="w-2.5 h-2.5     border-2 z-10 bg-white border-red-500"
          id="b"
          style={handleStyle}
        />
        <div
          className={` border ${
            props.selected && "border-slate-500"
          }    rounded-md bg-white`}
          ref={divRef}
        >
          <div
            className={` node w-96 bg-slate-50 border-b p-5 rounded-t-md flex items-center gap-2`}
          >
            <RocketLaunchIcon className="w-7 h-7" /> Agent
          </div>
          <div className="p-5 text-sm text-slate-400">Create Agent</div>
  
          <div className="space-y-1 pb-6 relative">
            {/* Text */}
            {props.inputs &&
              props.inputs.map((input: InputType) => {
                return (
                  <div key={`agent_input_key_${input.name}`}>
                    <>
                      {input.type === "text" && (
                        <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
                          <label
                            htmlFor="name"
                            className="block    text-black text-left"
                          >
                            {input.label}
                          </label>
                          <div>
                            <input
                              type="text"
                              className="block  w-full px-2 py-1.5 mt-2 rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                              name={input.name}
                              value={nodeData[input.name]}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}
  
                      {input.type === "number" && (
                        <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
                          <label
                            htmlFor="name"
                            className="block    text-black text-left"
                          >
                            {input.label}
                          </label>
                          <div>
                            <input
                              type="number"
                              className="block  w-full px-2 py-1.5 mt-2 rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                              name={input.name}
                              min={input.min}
                              max={input.max}
                              value={nodeData[input.name]}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}
  
                      {input.type === "select" && (
                        <CustomSelelct
                          state={nodeData}
                          setState={setNodeData}
                          label={input.label}
                          list={input.options}
                          name={input.name}
                        />
                      )}
  
                      {input.type === "textarea" && (
                        <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
                          <label
                            htmlFor="name"
                            className="block    text-black text-left"
                          >
                            {input.label}
                          </label>
                          <div className="mt-2 flex item-center gap-2">
                            <textarea
                              rows={1}
                              className="block resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                              name={input.name}
                              value={nodeData[input.name]}
                              onChange={handleChange}
                            />
                            <button
                              onClick={() => {
                                  setOpenTextModal(!openTextModal);
                                  setTextModalContent(input.name) 
                                }}
                            >
                              <ArrowTopRightOnSquareIcon className="h-7 w-7 text-gray-700" />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                );
              })}
  
           
          </div>
        </div>
        <EditTextModal 
          open={openTextModal} 
          setOpen={setOpenTextModal} 
          name={textModalContent}
          state={nodeData} 
          setState={setNodeData}   
        />
      </>
    );
  }
  