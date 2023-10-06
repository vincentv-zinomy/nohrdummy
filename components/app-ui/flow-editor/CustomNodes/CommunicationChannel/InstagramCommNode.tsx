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
    { id: 1, name: 'page_id', type: 'text', label: 'Page Id' },
    { id: 2, name: 'page_name', type: 'text', label: 'Page Name' },
    { id: 3, name: 'page_access_token', type: 'text', label: 'Page Access Token' },
    { id: 4, name: 'instagram_account_id', type: 'text', label: 'Instagram Account Id' },
    { id: 5, name: 'instagram_account_name', type: 'text', label: 'Instagram Account Name' },
    { id: 6, name: 'instagram_account_username', type: 'text', label: 'Instagram Account Username' },
    { id: 7, name: 'instagram_account_profile_picture_url', type: 'text', label: 'Instagram Account Profile Picture Url' },
    { id: 8, name: 'instagram_website', type: 'text', label: 'Instagram Website' },
    { id: 9, name: 'instagram_biography', type: 'text', label: 'Instagram Biography' }
  ]
  
  
  
  export default function InstagramCommNode(props: any) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddmodal] = useState(false)
  
    const { setNodes, getNodes } = useReactFlow();
    const divRef = useRef<HTMLDivElement>(null);
  
    const [nodeData, setNodeData] = useState({
      select_account: "" || props.data?.values?.select_account,
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
          id="instagram-source"
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
            <PhoneIcon className="w-7 h-7" /> Instagram Account
          </div>
          <div className="p-5 text-sm text-slate-400">
            Connect Communication Channel
          </div>
          <div className="space-y-1 pb-6 relative">
          <CustomSelelct
              state={nodeData}
              setState={setNodeData}
              name="select_account"
              label="Select Account"
              list={[
                {
                  id: 1,
                  value: "0",
                  label: "Select Number",
                },
                {
                  id: 2,
                  value: "function",
                  label: "unigage",
                },
              ]}
            />
          <ButtonComp handleClick={handleClick}>Add Account</ButtonComp>
  
          </div>
        </div>
        {/* Modals */}
        <EditModal open={openEditModal} setOpen={setOpenEditModal} />
  
     
        <AddContactModal 
          open={openAddModal} 
          setOpen={setOpenAddmodal}
          data={modalStateData} 
          label='Add Instagram Account'
        />
      </>
    );
  }
  