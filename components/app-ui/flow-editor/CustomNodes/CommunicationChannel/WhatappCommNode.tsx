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
import { handleStyle, modalStateDataI } from "../../NodeTypes";
import EditModal from "../../EditModal";
import AddContactModal from "../../AddContactModal";
import ButtonComp from "../../InputComponents/ButtonComp";
import CustomSelelct from "../../CustomSelelct";

const modalStateData:modalStateDataI[] = [
  { id: 1, name: 'waba_id', type: 'text', label: 'Weba Id' },
  { id: 2, name: 'waba_number_id', type: 'text', label: 'Weba Number Id' },
  { id: 3, name: 'waba_display_number', type: 'number', label: 'Weba Display Number' },
  { id: 4, name: 'waba_number_name', type: 'text', label: 'Weba Number Name' },
  { id: 5, name: 'waba_quality_rating', type: 'text', label: 'Weba Quality Rating' },
  { id: 6, name: 'waba_verification_status', type: 'text', label: 'Weba Verification Status' }
]


export default function WhatappCommNode(props: any) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddmodal] = useState(false)

  const { setNodes, getNodes } = useReactFlow();
  const divRef = useRef<HTMLDivElement>(null);

  const [nodeData, setNodeData] = useState({
    select_number: "" || props.data?.values?.select_number,
  });

  useEffect(() => {
    //   console.log(getNodes())
  }, []);

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

  const handleClick = () => {
    setOpenAddmodal(!openAddModal)
  };

  return (
    <>
      <NodeToolbar
        isVisible={props.data.toolbarVisible}
        position={props.data.toolbarPosition}
        className="border bg-white divide-x text-gray-800  rounded-md flex items-center   justify-center drop-shadow-sm"
      >
        {/* <button
          onClick={() => deleteNodes()}
          className="p-1.5 flex items-center justify-center"
        >
          <TrashIcon className="w-5 h-5  " />
        </button>
        <button onClick={() => addNodesHandler()} className="p-1.5">
          <DocumentDuplicateIcon className="h-5 w-5 " />
        </button> */}
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
        id="whatsapp-source"
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
          <PhoneIcon className="w-7 h-7" /> Whatsapp Channel
        </div>
        <div className="p-5 text-sm text-slate-400">
          Connect Communication Channel
        </div>
        <div className="space-y-1 pb-6 relative">
        <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="select_number"
            label="Select Number"
            list={[
              {
                id: 1,
                value: "0",
                label: "Select Number",
              },
              {
                id: 2,
                value: "function",
                label: "900000000",
              },
            ]}
          />
        <ButtonComp handleClick={handleClick}>Add Number</ButtonComp>

        </div>
      </div>
      {/* Modals */}
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />

   
      <AddContactModal 
        open={openAddModal} 
        setOpen={setOpenAddmodal}
        data={modalStateData} 
        label='Add Whatsapp Number'
      />
    </>
  );
}
