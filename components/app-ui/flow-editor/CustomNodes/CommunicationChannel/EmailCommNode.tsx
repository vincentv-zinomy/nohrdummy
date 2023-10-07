import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  RocketLaunchIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRef, useContext, useEffect, useState } from "react";
import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";
import { handleStyle, modalStateDataI } from "../../NodeTypes";
import EditModal from "../../EditModal";
import TextInputComp from "../../InputComponents/TextInputComp";
import PasswordInputComp from "../../InputComponents/PasswordInputComp";
import CustomSelelct from "../../CustomSelelct";
import ButtonComp from "../../InputComponents/ButtonComp";
import AddContactModal from "../../AddContactModal";



const modalStateData: modalStateDataI[] = [
  { id: 1, name: 'user', label: 'User', type: 'text' },
  { id: 2, name: 'password', label: 'Password', type: 'password' },
  { id: 3, name: 'imap_host', label: 'Imap host', type: 'text' },
  { id: 4, name: 'smtp_host', label: 'Smtp host', type: 'text' },
  { id: 5, name: 'imap_port', label: 'Imap port', type: 'text' },
  { id: 6, name: 'smtp_port', label: 'Smtp port', type: 'text' },
  { id: 7, name: 'tls', label: 'Tls', type: 'text' }
]



export default function EmailCommNode(props: any) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddmodal] = useState(false)
  const { setNodes, getNodes } = useReactFlow();
  const divRef = useRef<HTMLDivElement>(null);

  const [nodeData, setNodeData] = useState({
    select_contact: "" || props.data?.values?.select_contact,
  });


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

  const handleChange = (e: any) => {
    setNodeData({ ...nodeData, [e.target.name]: e.target.value });
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
        id="email-source"
        style={handleStyle}
      />

      <div
        className={` border ${props.selected && "border-slate-500"
          }    rounded-md bg-white`}
        ref={divRef}
      >
        <div
          className={` node w-96 bg-slate-50 border-b p-5 rounded-t-md flex items-center gap-2`}
        >
          <div className="w-7 h-7">
            <EnvelopeIcon className="w-full h-full" />
          </div>
          Email Channel
        </div>
        <div className="p-5 text-sm text-slate-400">
          Connect Communication Channel
        </div>
        <div className="space-y-1 pb-6 relative">
          <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="select_contact"
            label="Select Email"
            list={[
              {
                id: 1,
                value: "0",
                label: "Select Email",
              },
              {
                id: 2,
                value: "function",
                label: "admin@mambefit.com",
              },
            ]}
          />
          <ButtonComp handleClick={handleClick}>Add Email</ButtonComp>

        </div>
      </div>
      {/* Modals */}
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <AddContactModal
        open={openAddModal}
        setOpen={setOpenAddmodal}
        data={modalStateData}
        label='Add Email'
      />
    </>
  );
}
