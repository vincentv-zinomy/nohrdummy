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
import { handleStyle } from "../../NodeTypes";
import EditModal from "../../EditModal";
import ButtonComp from "../../InputComponents/ButtonComp";
import CustomSelelct from "../../CustomSelelct";
import { BsFacebook } from "react-icons/bs";

export default function FacebookCommNode(props: any) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { setNodes, getNodes } = useReactFlow();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //   console.log(getNodes())
  }, []);

  const [nodeData, setNodeData] = useState({
    account: null || Number(props.data?.values?.account),
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

  const handleClick = () => {

  }

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
        id="facebook-source"
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
            <BsFacebook className="w-full h-full" />
          </div> Facebook Channel
        </div>
        <div className="p-5 text-sm text-slate-400">
          Connect Communication Channel
        </div>
        <div className="space-y-1 pb-6 relative">
          <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="account"
            label="Select Account"
            list={[
              {
                id: 1,
                value: "0",
                label: "Select Account",
              },
              {
                id: 2,
                value: "function",
                label: "Mamabe.fit Page",
              },
            ]}
          />
          <ButtonComp handleClick={handleClick}>Add Number</ButtonComp>
        </div>
      </div>
      {/* Modals */}
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
    </>
  );
}
