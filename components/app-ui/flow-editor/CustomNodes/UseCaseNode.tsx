import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRef, useContext, useEffect, useState } from "react";
import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";
import { CustomValuesContext } from "../ReactFlowComponent";
import CustomSelelct from "../CustomSelelct";

export default function UseCaseNode(props: any) {
  const { openTextModal, setOpenTextModal, openEditModal, setOpenEditModal } =
    useContext(CustomValuesContext);
  const { setNodes, getNodes } = useReactFlow();
  const divRef = useRef<HTMLDivElement>(null);

  const [organization, setOrganization] = useState<any>({
    id: 0,
    label: "Select Option",
    value: null,
  });
  const [nodeData, setNodeData] = useState({
    name: "" || props.data?.values?.name,
    organization: "" || props.data?.values?.organization,
    qualification_requirement_check:
      "" || props.data?.values?.qualification_requirement_check,
    default_followup_message:
      "" || props.data?.values?.default_followup_message,
    default_not_interested_message:
      "" || props.data?.values?.default_not_interested_message,
    default_not_qualified_message:
      "" || props.data?.values?.default_not_qualified_message,
  });

  console.log(getNodes());

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

  // const deleteNodes = () => {
  //   const nodesleft = getNodes().filter((x) => x.id !== props.id);
  //   setNodes(nodesleft);
  // };

  // const addNodesHandler = () => {
  //   const nodes = getNodes().map((x: any) => {
  //     delete x.zIndex;
  //     return { ...x };
  //   });
  //   setNodes([
  //     ...nodes,
  //     {
  //       id: `dndNode_${Math.floor(Math.random() * 10 ** 10)}`,
  //       type: props.type,
  //       data: props.data,
  //       position: { x: Number(props.xPos + 10), y: Number(props.yPos + 10) },
  //       zIndex: 1000,
  //     },
  //   ]);
  // };

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
        id="a"
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
          <TrashIcon className="w-7 h-7" /> Use Case
        </div>
        <div className="p-5 text-sm text-slate-400">Create Use Case</div>

        <div className="space-y-1 pb-6 relative">
          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
            <label htmlFor="name" className="block    text-black text-left">
              Use Case Name
            </label>
            <div>
              <input
                type="text"
                className="block  w-full px-2 py-1.5 mt-2 rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                name="name"
                value={nodeData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <CustomSelelct
            selected={organization}
            setSelected={setOrganization}
            label="Organization"
            list={[
              {
                id: 1,
                value: "zigment_staging",
                label: "Zigment Staging",
              },
              {
                id: 2,
                value: "Lazy Aardvark Organization",
                label: "Lazy Aardvark Organization",
              },
            ]}
          />

          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
            <label htmlFor="name" className="block    text-black text-left">
              Qualification Requirement Check
            </label>
            <div className="mt-2 flex item-center gap-2">
              <textarea
                rows={1}
                className="block resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                name="qualification_requirement_check"
                value={nodeData.qualification_requirement_check}
                onChange={handleChange}
              />
              <button onClick={() => setOpenTextModal(!openTextModal)}>
                <ArrowTopRightOnSquareIcon className="h-7 w-7 text-gray-700" />
              </button>
            </div>
          </div>

          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
            <label htmlFor="name" className="block    text-black text-left">
              Default Followup Message
            </label>
            <div className="mt-2 flex item-center gap-2">
              <textarea
                rows={1}
                className="block resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                name="default_followup_message"
                onChange={handleChange}
                value={nodeData.default_followup_message}
              />
              <button onClick={() => setOpenTextModal(!openTextModal)}>
                <ArrowTopRightOnSquareIcon className="h-7 w-7 text-gray-700" />
              </button>
            </div>
          </div>

          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
            <label htmlFor="name" className="block    text-black text-left">
              Default Not Interested Message
            </label>
            <div className="mt-2 flex item-center gap-2">
              <textarea
                rows={1}
                className="block resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                name="default_not_interested_message"
                onChange={handleChange}
                value={nodeData.default_not_interested_message}
              />
              <button onClick={() => setOpenTextModal(!openTextModal)}>
                <ArrowTopRightOnSquareIcon className="h-7 w-7 text-gray-700" />
              </button>
            </div>
          </div>

          <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
            <label htmlFor="name" className="block    text-black text-left">
              Default Not Qualified Message
            </label>
            <div className="mt-2 flex item-center gap-2">
              <textarea
                rows={1}
                className="block resize-none	 w-full px-2 py-1.5  rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                name="default_not_qualified_message"
                onChange={handleChange}
                value={nodeData.default_not_qualified_message}
              />
              <button onClick={() => setOpenTextModal(!openTextModal)}>
                <ArrowTopRightOnSquareIcon className="h-7 w-7 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
