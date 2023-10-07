import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  PhoneIcon,
  RocketLaunchIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRef, useContext, useEffect, useState } from "react";
import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";
import CustomSelelct from "../../CustomSelelct";
import EditTextModal from "../../EditTextModal";
import { handleStyle } from "../../NodeTypes";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import TextInputComp from "../../InputComponents/TextInputComp";
import TextAreaInputComp from "../../InputComponents/TextAreaInputComp";
import NumberInputComp from "../../InputComponents/NumberInputCompt";
import EditModal from "../../EditModal";



export default function UseCaseNode(props: any) {

  const [openEditModal, setOpenEditModal] = useState(false)

  // console.log(commChannel)
  const { setNodes, getNodes, addNodes, addEdges, deleteElements } = useReactFlow();

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

  const deleteNodes = () => {

    deleteElements({ nodes: [{ id: props.id }] })
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
        style={handleStyle}
      />
      <div
        className={` border ${props.selected && "border-slate-500"
          }    rounded-md bg-white`}
      >
        <div
          className={` node w-96 bg-slate-50 border-b p-5 rounded-t-md flex items-center gap-2`}
        >
          <RocketLaunchIcon className="w-7 h-7" /> Agent
        </div>
        <div className="p-5 text-sm text-slate-400">Create Agent</div>

        <div className="space-y-1 pb-6 relative">
          <TextInputComp
            name={'name'}
            value={nodeData.name}
            label={'Agent Name'}
            handleChange={handleChange}
          />


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
          <TextAreaInputComp
            label='Description'
            value={nodeData.description}
            handleChange={handleChange}
            name={'description'}
          />

          <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="provider"
            label="Provider"
            list={[
              {
                id: 'provider_id_0',
                label: 'Open AI',
                value: 'open_ai'
              },
              {
                id: 'provider_id_1',
                label: 'Claude',
                value: 'claude'
              },
              {
                id: 'provider_id_2',
                label: 'Llama',
                value: 'llama'
              },
              {
                id: 'provider_id_3',
                label: 'Falcon',
                value: 'falcon'
              },
              {
                id: 'provider_id_4',
                label: 'Bard',
                value: 'bard'
              },
            ]}
          />
          <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="model"
            label="Model"
            list={[
              {
                id: 'model_id_0',
                label: 'GPT 4',
                value: 'gpt-4'
              },
              {
                id: 'model_id_1',
                label: 'GPT 3.5 (turbo)',
                value: 'gpt_3.5'
              },

            ]}
          />

          <NumberInputComp
            label={'Temprature'}
            name={'temprature'}
            value={nodeData.temperature}
            handleChange={handleChange}
            min={0}
            max={1}
          />
          <NumberInputComp
            label={'Max Tokens'}
            name={'max_tokens'}
            value={nodeData.max_tokens}
            handleChange={handleChange}
            min={0}
            max={4096}
          />
          <NumberInputComp
            label={'Top P'}
            name={'top_p'}
            value={nodeData.top_p}
            handleChange={handleChange}
            min={0}
            max={1}
          />
          <TextAreaInputComp
            label='Instructions'
            value={nodeData.prompt}
            handleChange={handleChange}
            name={'prompt'}
          />
          <TextAreaInputComp
            label='Requirements'
            value={nodeData.requirements}
            handleChange={handleChange}
            name={'requirements'}
          />
          <TextAreaInputComp
            label='Parameters'
            value={nodeData.parameters}
            handleChange={handleChange}
            name={'parameters'}
          />







        </div>
      </div>
      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
      />
    </>
  );
}
