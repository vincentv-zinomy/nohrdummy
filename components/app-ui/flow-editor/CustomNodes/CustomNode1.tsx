import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  DocumentMagnifyingGlassIcon,
  RocketLaunchIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {  useRef,  useContext, useEffect } from "react";
import {
  Handle,
  NodeToolbar,
  Position,
  useReactFlow,
} from "reactflow";
import { CustomValuesContext } from "../ReactFlowComponent";

 

 

export default function CustomNode1(props: any) {
  
  const {openTextModal, setOpenTextModal, openEditModal, setOpenEditModal} = useContext(CustomValuesContext)
  const { setNodes, getNodes } = useReactFlow();
  const divRef = useRef<HTMLDivElement>(null);


  useEffect(()=>{

    console.log(getNodes())
  },[])

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
        <button className="p-1.5" onClick={()=>setOpenEditModal(!openEditModal)} >
          <AdjustmentsHorizontalIcon className="h-5 w-5  " />
        </button>
      </NodeToolbar>
      <div
        className={` border ${
          props.selected && "border-slate-500"
        }    rounded-md bg-white`}
        ref={divRef}
      >
        <div
          className={` node w-96 bg-slate-50 border-b p-5 rounded-t-md flex items-center gap-2`}
        >
          <RocketLaunchIcon className="w-7 h-7" /> JsonAgent
        </div>
        <div className="p-5 text-sm text-slate-400">
          Construct a json agent from an LLM and tools
        </div>
        <div className="space-y-1 pb-6 relative">
          <div className=" bg-slate-50 py-2 px-6 flex items-center gap-2 relative">
            <Handle
              type="target"
              position={Position.Left}
              className="w-2.5 h-2.5  absolute -left-[5px] border-2 bg-white border-red-500"
              id="a"
            />
            <p>
              LLM <span className="text-red-500 ">*</span>
            </p>
          </div>
          <div className=" bg-slate-50 py-2 px-6 flex items-center gap-2 relative">
            <Handle
              type="target"
              position={Position.Left}
              className="w-2.5 h-2.5  absolute -left-[5px] border-2 bg-white border-red-500"
              id="b"
            />
            <p>
              LLM <span className="text-red-500 ">*</span>
            </p>
          </div>
          <div className=" bg-slate-50 py-2 px-6 flex items-center gap-2 relative">
            <Handle
              type="source"
              position={Position.Right}
              id="a"
              className="w-2.5 h-2.5  absolute  -right-[5px] border-2 bg-white border-red-500"
            />
            <p>
              LLM <span className="text-red-500 ">*</span>
            </p>
          </div>

         

          {/* <CustomSelelct/> */}
          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
              <label
                htmlFor="name"
                className="block    text-black text-left"
              >
                Text
              </label>
              <div>
                <input type="text" className="block  w-full px-2 py-1.5 mt-2 rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />

              </div>
          </div>
          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
              <label
                htmlFor="name"
                className="block    text-black text-left"
              >
                Text Area
              </label>
              <div className="mt-2 flex item-center gap-2">
                <textarea rows={1} className="block resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />
                <button onClick={()=>setOpenTextModal(!openTextModal)}>
                  <ArrowTopRightOnSquareIcon className="h-7 w-7 text-gray-700" />
                </button>


              </div>
          </div>

          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
              <label
                htmlFor="name"
                className="block    text-black text-left"
              >
                Password
              </label>
              <div>
                <input type="password" className="block resize-none	 w-full px-2 py-1.5 mt-2 rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />

              </div>
          </div>

          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
              <label
                htmlFor="name"
                className="block    text-black text-left"
              >
                File
              </label>
              <div className="flex items-center gap-2 mt-2">
                <label htmlFor="file-input" className="block resize-none	 w-full px-2 py-2   rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-500">
                  No File
                </label>
                <label htmlFor="file-input" className="cursor-pointer">
                  <DocumentMagnifyingGlassIcon className="h-8 w-8 text-gray-500" />
                </label>
                <input type="file" id="file-input" className="hidden resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />

              </div>
          </div>
        </div>
      </div>
    </>
  );
}
